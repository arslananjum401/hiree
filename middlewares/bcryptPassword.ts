import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const HashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = HashPassword;
        next()
    } catch (error) {
        console.log(`Error occurred while hashing password: ${error}`)
    }
}
export const comparePassword = async (EnteredPassword: string, SavedPassword: string) => {
    try {
        return await bcrypt.compare(EnteredPassword, SavedPassword);
    } catch (error) {
        console.log(`Error occurred while comparing password: ${error}`)
    }
}