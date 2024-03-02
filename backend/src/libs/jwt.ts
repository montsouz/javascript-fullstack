import jwt from "jsonwebtoken";
import { type IUser } from "../models/user";

const secretKey = "mysecretkey";

export function generateToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secretKey);
}
