import dotenv from 'dotenv';
dotenv.config();

const AuthCheckerBackend = async (req, res, next) => {
    const { key } = req.body;
    if (key === undefined) {
        res.status(404).json({ sucess: false, message: "please provide a key", status: 'check failed' });
    } else if (key == process.env.BACKEND_KEY) {
        console.log("Vaild AuthCheckerBackend");
        next();
    } else {
        res.status(404).json({ sucess: false, message: "Invaild for authatication process => check key", status: 'check failed' });
    }

}


export default AuthCheckerBackend;

