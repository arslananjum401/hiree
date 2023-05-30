import express from 'express';
import { addUserInfo, login, signup } from '../controllers/loginSignupControllers/loginControllers';
import { loginValidate } from '../middlewares/validators/loginAndSignup/login.validate';
import { signupValidate } from '../middlewares/validators/loginAndSignup/signup.validate';
import { userinfoValidate } from '../middlewares/validators/loginAndSignup/addUserInfo.validate';
import { hashPassword } from '../middlewares/bcryptPassword';
import { authenticate } from '../middlewares/authenticator/authenticate';

const commonRouter = express.Router();

commonRouter.post("/login", loginValidate, login)
commonRouter.post("/signup", signupValidate, hashPassword, signup)
commonRouter.post("/add/userinfo", userinfoValidate, addUserInfo)



export default commonRouter