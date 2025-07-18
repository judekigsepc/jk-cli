import {Request, Response} from 'express'
import { validateRequestBody } from '@utils/validation/validateRequest'
import { sendError } from '@utils/sendError'
import bcrypt from 'bcrypt'
import User from '../users/user.model'
import { sendSuccess } from '@utils/sendSuccess'
import jwt from 'jsonwebtoken'

export const registerUser = async (req:Request, res: Response) => {
    try {

      validateRequestBody('creation','user',req)

      const password = await bcrypt.hash(req.body.password, 10)

      // Checking if user already exists
      const existingUser = await User.findOne({email: req.body.email}).lean()
      if(existingUser) {
        throw new Error("User with the same email already exists")
      }

      const registeredUser = await User.create({...req.body, password})
      
      sendSuccess(201,'User registration successful',registeredUser,res)

    }
    catch (err: unknown) {
    sendError(500,'User registration failed',err, res)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        validateRequestBody('creation','user-login',req)

        const user = await User.findOne({email: req.body.email}).lean()

        if(!user) {
            return sendError(400,"User login failed","User with email not found",res)
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) {
            throw new Error("Wrong password provided")
        }

        const jwtToken = jwt.sign({userId: user._id},process.env.JWT_SECRET as string,{expiresIn: '12h'})

        res.cookie('token', jwtToken, {
            httpOnly: true,
            sameSite: true,
            secure: false // SHOULD SET THIS TO TRUE IN PROD
        })

        sendSuccess(200,"User login successful",{},res)
    }catch (err) {
         sendError(500,'User login failed',err, res)

    }
}

export const updateSelf = async (req: Request, res:Response) => {
    try {
         validateRequestBody('update','user',req)

         const userToUpdate = await User.findById(req.user._id)

         if (!userToUpdate) {
            throw new Error("User not found")
         }

         const updatedUser = await User.findByIdAndUpdate(req.user._id,{...req.body},{new: true})

         sendSuccess(200,"User update successful",updatedUser,res)

    }catch (err) {
        sendError(500,"User update failed",err,res)
    }
}