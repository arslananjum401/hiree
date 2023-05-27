import express, { NextFunction, Request, Response } from "express";
import "./db/connection/conn";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + '/config/config.env' });
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
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api", commonRouter)



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});