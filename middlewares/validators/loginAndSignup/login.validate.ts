import * as Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatationTemplate } from "../../../template/validation.template";


export const loginValidate = (req: Request, res: Response, next: NextFunction,) => {
    const schema = Joi.object()
        .keys({
            email: Joi.string().required()
                .messages({
                    "any.required": "Email is required",
                    "string.empty": "Email is required"
                }),
            password: Joi.string().required()
                .messages({
                    "any.required": "Password is required",
                    "string.empty": "Password is required"
                })
        })
        .unknown(false)

    validatationTemplate(req, res, next, schema)

}