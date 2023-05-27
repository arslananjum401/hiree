import Jwt from "jsonwebtoken";

export const GenerateToken = (UserID: string) => Jwt.sign(UserID, process.env.SECRET_KEY as string);