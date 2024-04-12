import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers.cookie;
  if (!cookie) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(
      req.headers.cookie?.split("=")[1]!,
      process.env.JWT_SECRET!
    ) as { userId: string; role: string };
    req.headers.userId = verified.userId;
    req.headers.role = verified.role;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid Token");
  }
};
