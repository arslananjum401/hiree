import jwt from "jsonwebtoken";
import db from "../../db/connection/conn"
import { Request, Response } from "express";
import { GenerateToken } from "../../helper/generateToken";
import { comparePassword } from "../../middlewares/bcryptPassword";
const { user } = db;
export const login = async (req: Request, res: Response) => {
    try {
        const getUser = await user.findOne({ where: { email: req.body.email } });

        if (!getUser)
            return res.status(401).json({ message: "Invalid email or password" });

        const checkPassword = await comparePassword(req.body.password, getUser.dataValues.password)
        if (!checkPassword)
            return res.status(401).json({ message: "Invalid email or password" })




        const token = GenerateToken(getUser.dataValues.userId)
        const sendUser = await user.findOne({
            where: { email: req.body.email },
            attributes: { exclude: ["password"] }
        });
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            // sameSite: true,
            // secure: true
        }
        res.status(200).cookie("token", token, options).json(sendUser?.dataValues)

    } catch (error: any) {
        res.status(500).json(`error occurred while logging in user: ${error}`)
    }
}

function checkNonEmptyKeysofObject(Obj: any) {
    let errs = true
    for (const [key, value] of Object.entries(Obj)) {
        if (value !== "" || value) {
            errs = false;
            break;
        }

    }
    return errs
}

export const signup = async (req: Request, res: Response) => {
    try {
        let error: { [key: string]: any } = {}
        const checkEmail = await user.findOne({ where: { email: req.body.email } })

        if (checkEmail)
            error["email"] = "Email is already in use."

        if (!checkNonEmptyKeysofObject(error))
            return res.status(401).json({ Error: error })

        const newUser = await user.create({ ...req.body });

        const getUser = await user.findOne({ where: { userId: newUser.dataValues.userId } });

        const token = GenerateToken(getUser?.dataValues.userId as string)
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            // httpOnly: true,
            // sameSite: true,
            // secure: true
        }
        res.status(200).cookie("token", token, options).json(getUser?.dataValues)
    } catch (error: any) {
        res.status(500).json(`error occurred while signing up user: ${error}`)
    }
}
export const addUserInfo = async (req: Request, res: Response) => {
    try {
        let error: LooseObject = {}
        req.body.role = "admin";

        const checkUserInfo = await user.findOne({
            where: {
                userId: req.body.userId
            }
        });
        if (checkUserInfo?.dataValues.firstName) {
            return res.status(409).json({
                userInfo: "User Info already added"
            });
        }

        const checkUserName = await user.findOne({
            where: {
                username: req.body.username
            }
        })
        const checkPhoneNumber = await user.findOne({
            where: {
                countryCode: req.body.countryCode,
                phoneNumber: req.body.phoneNumber
            }
        })

        if (checkUserName)
            error.username = "Username already in use";
        if (checkPhoneNumber)
            error.phoneNumber = "Phone Number already in use";


        if (!checkNonEmptyKeysofObject(error))
            return res.status(409).json(error);

        await user.update(req.body, { where: { userId: req.body.userId } });
        const getUser = await user.findOne({
            where: {
                userId: req.body.userId
            }
        });
        const token = GenerateToken(getUser?.dataValues.userId as string)
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            // httpOnly: true,
            // sameSite: true,
            // secure: true
        }
        res.status(200).cookie("token", token, options).json(getUser)
    } catch (error: any) {
        res.status(500).json(`error occurred while logging in user: ${error}`)
    }
}