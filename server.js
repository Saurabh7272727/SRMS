import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthCheckerBackend from './Cyber/AuthChecker.backend.js';
import AdminAuth from './Router/Admin.auth.js';
import { mongoDBconnect } from './DB/mongo.database.js';
import morgan from 'morgan';
import ImgHandler from './Controller/ImgHandler.users.js';
import { upload } from './Middleware/multer.upload.js';
import bodyParser from 'body-parser';

dotenv.config();
mongoDBconnect();


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173', methods: 'GET, POST,PUT,DELETE', credentials: true }));
app.use(express.json());
app.set('./uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

// middlewares
app.use('/api/admin', AdminAuth);
app.post('/api/img/:id', upload.single('img'), AuthCheckerBackend, ImgHandler);








app.get('/', (req, res) => {
    res.send({ message: 'Welcome', status: "OK", description: "Backend of student result mangement system." });
});
app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT + " " + 'http://localhost:8080');
});
