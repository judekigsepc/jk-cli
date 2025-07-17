import express from 'express'
import { loginUser, registerUser, updateSelf } from './auth.controller'
import { authenticateUser } from './auth.middleware'

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.put('/update', authenticateUser, updateSelf)

export default authRouter