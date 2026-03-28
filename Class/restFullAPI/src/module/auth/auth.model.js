import { boolean } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 2,
        minLength: 50,
        required:[true, "Name is required"]
    },

    email: {
        type: String,
        trim: true,
        required:[true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
        select: false
    },
    role:{
        type: String,
        enum: ['customer', 'seller', 'admin'],
        default: "customer"
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        select: false
    },
    refreshToken: {
        type: String,
        select: false
    },
    resetPassowordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    }
},  {timestamps: true})

const user = mongoose.model("User", userSchema)
export default user