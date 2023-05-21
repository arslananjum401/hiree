import db from "../../db/connection/conn"
import { Request, Response } from "express";
const { user } = db
export const login = async (req: Request, res: Response) => {
    try {
        const GetUser = await user.findOne({
            where: { email: req.body.email }
        })
        if (!GetUser)
            return res.status(401).json({ error: { email: "user does not exist" } });


        res.status(200).json(GetUser)
    } catch (error: any) {
        res.status(500).json(`error occurred while logging in user: ${error}`)
    }
}

function checkEmptyKeysofObject(Obj: any) {
    let errs = true
    for (const [key, value] of Object.entries(Obj)) {
        if (value === "" || !value) {
            errs = false
        }
    }
    return errs
}

export const signup = async (req: Request, res: Response) => {
    try {
        const Error = {
            email: "",
            username: "",
            password: ""
        }
        const checkEmail = await user.findOne({
            where: {
                email: req.body.email
            }
        }
        )
        const checkUserName = await user.findOne({
            where: {
                username: req.body.username,
            }
        }
        )

        if (checkEmail)
            Error.email = "Email is already in use."
        if (checkUserName)
            Error.username = "UserName is already in use."
        if (!req.body.password)
            Error.password = "Password is required."


        if (checkEmptyKeysofObject(Error)) {
            return res.status(401).json({ Error })
        }

        const NewUser = await user.create({ ...req.body, DOB: new Date(req.body.DOB) })

        res.status(200).json(NewUser.dataValues)
    } catch (error: any) {
        res.status(500).json(`error occurred while logging in user: ${error}`)
    }
}