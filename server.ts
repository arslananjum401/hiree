import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/config/config.env' });


import express, { NextFunction, Request, Response } from "express";
import "./db/connection/conn";
import commonRouter from "./routes/common.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();
const port = process.env.PORT || 4000;

//Middlewares
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(express.json({ limit: "5mb" }))
app.use(cookieParser());


app.use((req: Request, res: Response, next: NextFunction) => {
    next();
}, cors({
    origin: ["http://localhost:5173","https://7f91-2400-adc7-1907-4e00-6c06-9358-f6c4-cdb.ngrok-free.app"],
    credentials: true
}));

app.use("/api", commonRouter)



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});