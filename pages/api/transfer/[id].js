import User from "../../../models/User"
import dbConnect from "../../../utils/mongodb"

export default async function handler(req, res){
    const {method, query:{id}} = req

    await dbConnect()

    if(method === 'POST'){
        try {
            const user  = await User.findById(id)
            if(!user) return res.status(404).send('user does not exist')

            const balance = parseFloat(user.amount)
            // if(req.body.amount2 = "") return res.status(403).json('Invalid details')

            const amount = parseFloat(req.body.amount2)
            const receiver = await User.findOne({phoneno: req.body.receiver})
            if(!receiver) return res.status(404).json('Not found')
            return res.status(200).send(receiver)
        } catch (error) {
            console.log(error.message)
        }
    }
}