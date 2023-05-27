import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import db from "../../db/connection/conn";
const { user } = db;


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res.status(401).json({ message: "Please login" })


        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

        const getUser = await user.findOne({
            attributes: {
                exclude: ['Password']
            },
            where: {
                userId: decoded
            }
        })

        if (!getUser)
            return res.status(401).json({ message: "Please login first" }).redirect("/");
        req.User = getUser.dataValues;
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            // httpOnly: true,
            // sameSite: true,
            // secure: true
        }
        res.cookie("token", token, options)
        next()
    } catch (error) {
        console.log(`Error occurred while authenticating user: ${error}`)
    }
}