import express from "express";
import "./db/connection/conn";
import { Sequelize } from "sequelize";
import commonRouter from "./routes/common.routes";
import cookieParser from "cookie-parser";

export const app = express();
const port = process.env.PORT || 4000;


//Middlewares
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(express.json({ limit: "5mb" }))
app.use(cookieParser());




app.use("/api", commonRouter)



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});