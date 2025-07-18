import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    fullName:string,
    email: string,
    password: string,
}

const UserSchema = new mongoose.Schema<IUser>({
    fullName: {
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