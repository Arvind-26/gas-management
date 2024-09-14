import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"]
    },
    age: {
        type: Number,
        required: [true, "age is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "this email already exist"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    phn_no: {
        type: Number,
        required: [true, "phone number is required"],
        unique: [true, "this phone number already exist"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    cylinder: {
        type: Number,
        default: 12
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

mongoose.models = {}
const User = mongoose.model.users || mongoose.model("users", userSchema)

export default User