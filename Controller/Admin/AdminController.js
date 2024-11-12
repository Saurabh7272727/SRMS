import AdminModel from '../../Models/admin.model.js';
import TeacherModel from '../../Models/teachers.model.js';
import emailSender from '../../Utils/Email.sender.js';
import crypto from 'crypto';
import { keyadmin } from '../../Key/key.admin.js';
import bcrypt from 'bcryptjs';
import ip from 'ip';
import mongoose from 'mongoose';
const OTPR = crypto.randomInt(100000, 999999);
console.log(OTPR);



export const emailVerify = async (req, res) => {
    const admin = req.body;
    const adminData = await AdminModel.findOne({ email: admin.email });

    if (!req.body.email) {
        return res.json({ message: 'Please filed your email' });
    }
    if (adminData) {
        return res.status(404).json({ sucess: false, message: "Your email address is already in use", status: "New email address" });
    } else {
        const email = await emailSender(admin.email, "OTP", OTPR, "admin");
        if (email.person == 'admin') {
            res.status(200).json({ sucess: true, message: "otp are send in your email box", status: "OK", email: admin.email });
        } else {
            res.status(501).json({ sucess: false, message: "Internal server error" });
        }
    }
}

export const VerifyOTP = async (req, res, next) => {
    const adminData = req.body;
    if (Number(adminData.otp) === OTPR) {
        next();
    } else {
        res.status(404).json({ sucess: false, message: "Otp are wrong => check your email box", status: "NO", email: adminData.email });
    }
}

export const CreateAccountAdmin = async (req, res) => {
    const adminData = req.body;

    if (!adminData?.email || !adminData?.password || !adminData?.otp) {
        return res.status(404).json({ sucess: false, message: "filled all fields", status: "NO" });
    }

    const checkDataBase = await AdminModel.findOne({ email: adminData.email });
    const checkIpAddress = await AdminModel.findOne({ ip: adminData.ip });
    if (checkDataBase) {
        return res.status(200).json({ sucess: false, message: "Your email are already in use &", status: "NO" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    adminData.password = hashedPassword;

    const hashedOtp = await bcrypt.hash(req.body.otp, 10);
    adminData.otp = hashedOtp;

    adminData.ip = ip.address();
    adminData.adminkey = await keyadmin;
    adminData.university = await (req.body.university).toUpperCase();
    adminData.login = true;
    Object.freeze(adminData);
    if (adminData.otp) {
        const data = new AdminModel(adminData);
        await data.save();
        const resgisterAdminData = await AdminModel.findOne({ email: adminData.email, login: true });
        res.status(200).json({ sucess: true, message: "Sucessfully create a admin account in SRMS", status: "OK", data: resgisterAdminData });
    }
}



// admin profile controller;

export const adminProfileHandler = async (req, res) => {
    const { id } = req?.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ sucess: false, message: "Invalid Admin Id", status: "NO" });
    }
    try {
        const fetchAdmin = await AdminModel.findById(id);
        if (!fetchAdmin) {
            return res.status(404).json({ sucess: false, message: "Your are not exist", status: "No" });
        }
        res.status(200).json({ sucess: true, message: `${fetchAdmin?.email}`, data: fetchAdmin });
    } catch (error) {
        if (error) {
            res.status(200).json({ sucess: false, message: `Internal server error`, status: "No" });
        }
    }

}



export const adminLoginHandler = async (req, res) => {
    const { email, password } = req.body;

    const adminData = await AdminModel.findOne({ email: email });
    if (!adminData) {
        return res.status(404).json({ sucess: false, message: "Email not found", status: "No" });
    }

    const comparePassword = await bcrypt.compare(password, adminData.password);
    if (!comparePassword) {
        return res.status(404).json({ sucess: false, message: "Password is incorrect", status: "No" });
    }

    res.status(203).json({ sucess: true, message: "Login successful", status: "Yes", data: adminData?._id });
}

export const adminProfileUpdateHandler = async (req, res) => {
    const { fullName, position, phoneNumber, id } = req.body;
    if (!fullName || !position || !phoneNumber || !id) {
        return res.status(404).json({ sucess: false, message: "Please update All info", status: "No" });
    }
    const adminData = await AdminModel.findByIdAndUpdate(id, { fullName, position, phoneNumber });
    if (!adminData) {
        return res.status(503).json({ sucess: false, message: "Internal Server Error", status: "No" });
    }
    return res.status(200).json({ sucess: true, message: "successfully update", status: "Yes" });
}



export const teacherAccountByAdmin = async (req, res) => {
    const teacherDataByFrontend = req.body;
    const { fullName, email, college, branch, course, year, adminId } = teacherDataByFrontend;

    if (!fullName || !email || !college || !branch || !course || !year || !adminId) {
        return res.status(404).json({ sucess: false, message: "All field are required", status: "No" });
    }

    const adminChecker = await AdminModel.findOne({ email: email });
    const teacherChecker = await TeacherModel.findOne({ email: email });

    if (adminChecker) {
        return res.status(404).json({ sucess: false, message: "This email are not valid", status: "No" });
    }
    if (teacherChecker) {
        return res.status(404).json({ sucess: false, message: "This email id are already used", status: "No" });
    }
    try {
        const teacherAccount = new TeacherModel(teacherDataByFrontend);
        const completeDataAccount = await teacherAccount.save();
        if (!completeDataAccount) {
            return res.status(404).json({ sucess: false, message: "Account are not created / try again", status: "No" });
        }
        return res.status(203).json({ sucess: true, message: "successfully created account", status: "Yes" })
    } catch (error) {
        return res.status(502).json({ sucess: false, message: "InterServerError", status: error })
    }

}


export const craetedByAdminTeachersList = async (req, res) => {
    const { id } = req?.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ sucess: false, message: "Invalid admin Id", status: "No" });
    }

    const FindAllTeachersByAdminId = await TeacherModel.find({ adminId: id });
    if (!FindAllTeachersByAdminId) {
        return res.status(204).json({ sucess: false, message: "Not found", status: "No" });
    }

    return res.status(200).json({ sucess: true, message: "list of all teachers", status: "Yes", data: FindAllTeachersByAdminId });
}