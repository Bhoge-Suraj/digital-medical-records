import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
    {
        patient: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        doctor: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("MedicalRecord", medicalRecordSchema);