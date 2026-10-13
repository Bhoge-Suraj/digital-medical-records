import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { randomInt, createHash } from "node:crypto";
import OTP from "./models/OTP.js";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import MedicalRecord from "./models/MedicalRecord.js";
import authMiddleware from "./authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const PORT = 5001;

mongoose.connect("mongodb://127.0.0.1:27017/digital_medical_records")
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send OTP

app.post("/send-otp", async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
        return res.status(400).json({
            message: "Email is required.",
        });
    }

    const otp = randomInt(100000, 1000000);

    const otpHash = createHash("sha256")
        .update(String(otp))
        .digest("hex");

    try {
        // Remove any previous OTP for this email
        await OTP.deleteMany({ email });

        // Save the hashed OTP with a 5-minute expiry
        await OTP.create({
            email,
            otpHash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        // Send OTP by email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Digital Medical Records - OTP",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        });

        console.log("OTP email sent successfully.");

        return res.json({
            message: "OTP sent successfully.",
        });
    } catch (error) {
        // Do not keep an OTP if sending or saving fails
        await OTP.deleteMany({ email }).catch(() => { });

        console.error("OTP error:", error.message);

        return res.status(500).json({
            message: "Failed to send OTP. Please try again.",
        });
    }
});


app.post("/verify-otp", async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const otp = String(req.body.otp ?? "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
        return res.status(400).json({
            message: "Valid email and 6-digit OTP are required.",
        });
    }

    const otpHash = createHash("sha256")
        .update(otp)
        .digest("hex");

    try {
        const otpRecord = await OTP.findOne({
            email,
            otpHash,
            expiresAt: { $gt: new Date() },
            verifiedAt: null,
        });

        if (!otpRecord) {
            return res.status(400).json({
                message: "Invalid or expired OTP.",
            });
        }

        otpRecord.verifiedAt = new Date();
        await otpRecord.save();

        return res.json({
            message: "OTP verified successfully.",
        });
    } catch (error) {
        console.error("OTP verification error:", error.message);

        return res.status(500).json({
            message: "Could not verify OTP. Please try again.",
        });
    }
});


app.post("/register", async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!name || !email || typeof password !== "string") {
            return res.status(400).json({
                message: "Name, email and password are required.",
            });
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordPattern.test(password)) {
            return res.status(400).json({
                message: "Password must contain 8 characters, uppercase, lowercase and a number.",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await User.create({
            name,
            email,
            passwordHash,
        });

        return res.status(201).json({
            message: "Account created successfully!",
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered.",
            });
        }

        console.error("Registration error:", error.message);

        return res.status(500).json({
            message: "Failed to create account.",
        });
    }
});


app.post("/login", async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || typeof password !== "string") {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            message: "Login failed. Please try again."
        });
    }
});

// Get only the logged-in user's medical records
app.get("/api/records", authMiddleware, async (req, res) => {
    try {
        const records = await MedicalRecord.find({
            user: req.userId
        }).sort({ createdAt: -1 });

        res.json(
            records.map((record) => ({
                ...record.toObject(),
                id: record._id.toString(),
            }))
        );
    } catch (error) {
        console.error("Fetch records error:", error.message);
        res.status(500).json({ message: "Failed to fetch records." });
    }
});

// Add a medical record for the logged-in user
app.post("/api/records", authMiddleware, async (req, res) => {
    try {
        const { patient, type, doctor, date, status } = req.body;

        if (!patient || !type || !doctor || !date || !status) {
            return res.status(400).json({
                message: "All medical record fields are required."
            });
        }

        const record = await MedicalRecord.create({
            patient,
            type,
            doctor,
            date,
            status,
            user: req.userId
        });

        res.status(201).json({
            ...record.toObject(),
            id: record._id.toString(),
        });
    } catch (error) {
        console.error("Create record error:", error.message);
        res.status(500).json({ message: "Failed to create record." });
    }
});

// Update only a record owned by the logged-in user
app.put("/api/records/:id", authMiddleware, async (req, res) => {
    try {
        const { patient, type, doctor, date, status } = req.body;

        const record = await MedicalRecord.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { patient, type, doctor, date, status },
            { returnDocument: "after", runValidators: true }
        );

        if (!record) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        res.json({
            ...record.toObject(),
            id: record._id.toString(),
        });
    } catch (error) {
        console.error("Update record error:", error.message);
        res.status(500).json({ message: "Failed to update record." });
    }
});

// Delete only a record owned by the logged-in user
app.delete("/api/records/:id", authMiddleware, async (req, res) => {
    try {
        const record = await MedicalRecord.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!record) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        res.json({ message: "Record deleted successfully." });
    } catch (error) {
        console.error("Delete record error:", error.message);
        res.status(500).json({ message: "Failed to delete record." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});