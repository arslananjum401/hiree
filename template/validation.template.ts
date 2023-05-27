import { ValidationErrorItem, ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";




export const validatationTemplate = (req: Request, res: Response, next: NextFunction, schema: ObjectSchema<any>, log?: any) => {
    try {

        let { error } = schema.validate(req.body, { abortEarly: false })
        if (error?.details) {
            let Errs: { [key: string]: any } = {};

            error?.details.forEach((err: ValidationErrorItem) => {
                if (log)
                    console.log(err)

                if (err?.context)
                    Errs[err.context.key as string] = err.message
            })

            return res.status(400).json({ Errors: Errs })
        }

        next()
    } catch (error) {
        res.status(500).json(error)
        console.log(`error occurred while validating schema: ${error}`)
    }
}