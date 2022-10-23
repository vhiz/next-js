import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default:false},
    transaction:[{text:{type:String}}],
    amount:{type: Number, },
    phoneno:{type:Number, required: true}
}, {timestamps: true})



export default mongoose.models.User || mongoose.model('User', userSchema)