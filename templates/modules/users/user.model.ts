import mongoose, { Document } from "mongoose";
import { UserRoles } from "./types";

interface IUser extends Document {
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    role: UserRoles
}

const UserSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},{timestamps: true})

const User = mongoose.model<IUser>("User", UserSchema)

export default User