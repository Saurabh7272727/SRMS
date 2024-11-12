import mongoose from "mongoose";
import { Schema } from 'mongoose';

const adminSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    university: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/020/765/399/large_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    adminkey: {
        type: String,
        required: true,
        default: '00000000'
    },
    ip: {
        type: String,
        required: true,
        default: "000-0000-000"
    },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    login: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const AdminModel = mongoose.model('admin', adminSchema);
export default AdminModel;