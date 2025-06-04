import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please enter username"],
        unique: [true, "this username is already taken"]
    },
    email : {
        type: String,
        required: [true, "Please provide email"],
        unique: [true, "this email iscalready in use"]
    },
    password : {
        type: String,
        required: [true, "Passowrd is required"]
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
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;