import User from "../../../models/User"
import dbConnect from "../../../utils/mongodb"
import * as bcrypt from 'bcrypt'

export default async function handler(req, res) {
    const {method} = req

    await dbConnect()


    if(method === "POST"){
        try {
            const user = await User.findOne({email: req.body.email})
            if(user) return res.status(403).json('name already exist')
            const name = await User.findOne({name: req.body.name})
            if(name) return res.status(403).json('username already exist')

            const phoneno = await User.findOne({phoneno: req.body.phoneno})
            if(phoneno) return res.status(403).send('phone number already exist')

            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            const {password,amount ,...other} = req.body
            const newUser = await User.create({
                password : hashed,
                amount:"30000",
                ...other
            })
            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}