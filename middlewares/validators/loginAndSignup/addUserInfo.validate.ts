import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { validatationTemplate } from "../../../template/validation.template";
import { userSchema } from "../../../db/schema/user";


export const userinfoValidate = (req: Request, res: Response, next: NextFunction,) => {
    const schema = Joi.object()
        .keys({
            userId: Joi.string().guid({ version: ["uuidv4"] }).required()
                .messages({
                    "any.required": "userId is required",
                    "string.empty": "userId is required",
                    "string.guid": "Invalid userId uuid"
                }),
            firstName: Joi.string().required()
                .messages({
                    "any.required": "FirstName is required",
                    "string.empty": "FirstName is required"
                }),
            lastName: Joi.string().required()
                .messages({
                    "any.required": "LastName is required",
                    "string.empty": "LastName is required"
                }),
            username: Joi.string().required()
                .messages({
                    "any.required": "Username is required",
                    "string.empty": "Username is required"
                }),
            countryCode: Joi.string().required().messages({
                "any.required": "Code is required",
                "string.empty": "Code is required"
            }),
            phoneNumber: Joi.string().required().messages({
                "any.required": "Phone Number is required",
                "string.empty": "Phone Number is required"
            }),
            gender: Joi.string().required().messages({
                "any.required": "Gender is required",
                "string.empty": "gender is required"
            }),
            DOB: Joi.date().required().messages({
                "any.required": "Gender is required",
                "string.empty": "gender is required"
            }),
        })
        .unknown(false)

    validatationTemplate(req, res, next, schema)

}