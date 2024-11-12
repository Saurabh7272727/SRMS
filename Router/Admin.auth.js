import express from 'express';
import AuthCheckerBackend from '../Cyber/AuthChecker.backend.js';
import { emailVerify, VerifyOTP, CreateAccountAdmin, adminProfileHandler, adminLoginHandler, adminProfileUpdateHandler, teacherAccountByAdmin, craetedByAdminTeachersList } from '../Controller/Admin/AdminController.js';
const router = express.Router();


router
    .post('/signup/email', AuthCheckerBackend, emailVerify)
    .post('/signup/create', AuthCheckerBackend, VerifyOTP, CreateAccountAdmin)
    .get('/profile/:id', adminProfileHandler)
    .post('/login', adminLoginHandler)
    .post('/profileUpdate', adminProfileUpdateHandler)
    .post('/teacher/createAccount', teacherAccountByAdmin)
    .get('/teachersList/:id', craetedByAdminTeachersList)
export default router;