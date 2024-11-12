import mongoose, { Schema } from "mongoose";
const teachers = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    college: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    login: {
        type: Boolean,
        default: false,
    },
    adminId: {
        type: String,
        required: true,
    }
})


const TeacherModel = mongoose.model("Teacher", teachers);
export default TeacherModel;