
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    otpHash: {
        type: String,
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true,
        expires: 0,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

        verifiedAt: {
        type: Date,
        default: null,
    },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;