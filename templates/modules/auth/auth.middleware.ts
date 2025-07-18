import { NextFunction, Request, Response } from "express";
import { sendError } from "@utils/sendError";
import jwt from "jsonwebtoken"
import User from "../users/user.model";
import { UserPayload } from "../users/types";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const authToken = req.cookies.token

       if (!authToken) {
          return sendError(401,"User authentication failed","No authentication token provided",res)
       }

       const payload = jwt.verify(authToken,process.env.JWT_SECRET as string) as UserPayload

       const userData = await User.findById(payload.userId)

       if (!userData) {
         throw new Error("User not found")
       }

       req.user = userData

       next()

    }catch (err) {
       sendError(500,'User authentication failed',err,res)
    }
} 