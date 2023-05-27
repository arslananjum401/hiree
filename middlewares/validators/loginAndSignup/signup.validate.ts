import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatationTemplate } from "../../../template/validation.template";


export const signupValidate = (req: Request, res: Response, next: NextFunction,) => {
    const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const schema = Joi.object()
        .keys({
            email: Joi.string().email().required()
                .messages({
                    "any.required": "Email is required",
                    "string.empty": "Email is required",
                    "string.pattern.base": "Email is invalid",
                    "string.email": "please enter a valid email"
                }),
            password: Joi.string().required()
                .messages({
                    "any.required": "Password is required",
                    "string.empty": "Password is required"
                }),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
                "any.required": "Confirm Password is required",
                "string.empty": "Confirm Password is required",
                "any.only": "Confirm Password must be same as Password"
            }),
        })
        .unknown(false)

    validatationTemplate(req, res, next, schema)

}