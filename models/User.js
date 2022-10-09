import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: String, default:false},
    amount:{type: Number, }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default mongoose.models.User || User