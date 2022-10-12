import User from "../../../models/User"
import dbConnect from "../../../utils/mongodb"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import cookie from 'cookie'
export default async function handler(req, res) {
    const {method} = req

    await dbConnect()

    if(method === "POST"){
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user) return res.status(404).json('user does not exist')

            const validpass = await bcrypt.compare(req.body.password, user.password)
            if(!validpass) return res.status(403).send('password wrong')


            const token = jwt.sign({_id:user._id, isAdmin: user.isAdmin}, process.env.TOKEN, {expiresIn:"5h"})
            res.setHeader("Set-Cookie", cookie.serialize('token', token,{
                sameSite:'strict',
                path: '/'
            }))
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}