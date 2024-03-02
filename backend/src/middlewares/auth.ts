import { verifyToken } from "../libs/jwt";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const user = verifyToken(token) as IUser;
    req.userId = Number(user.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
