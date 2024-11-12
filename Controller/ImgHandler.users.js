import { UploadPic } from '../Utils/Upload.pic.js';
import mongoose from 'mongoose';
import AdminModel from '../Models/admin.model.js';
const ImgHandler = async (req, res) => {
    const { id } = req?.params;
    const PostChecker = await AdminModel.findOne({ _id: id });
    if (!mongoose.Types.ObjectId.isValid(id) || !PostChecker) {
        return res.status(404).json({ message: 'Invalid user id.' });
    }
    const responce = await UploadPic(req.file?.path);
    const adminData = await AdminModel.findByIdAndUpdate(id, { img: responce?.url });

    if (adminData) {
        return res.redirect(`${process.env.FRONTEND_URL}/admin/${id}/Home`);
    } else {
        res.status(503).json({ sucess: false, message: "Internal server error", info: "try again please???" });
    }
}


export default ImgHandler;