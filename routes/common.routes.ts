import express from 'express';
import { login, signup } from '../controllers/loginSignupControllers/loginControllers';

const commonRouter = express.Router();

commonRouter.post("/login", login)

commonRouter.post("/signup", signup)



export default commonRouter