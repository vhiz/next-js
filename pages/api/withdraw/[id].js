import User from "../../../models/User"
import dbConnect from "../../../utils/mongodb"

export default async function handler(req, res){
    const {method, query:{id}} = req

    await dbConnect()

    if(method === "POST"){
        try {
            const user = await User.findById(id)
            if(!user) return res.status(404).json('user not found')

            const balance = parseFloat(user.amount)
            if(req.body.amount1 == "") return res.status(403).json('input amount')

            const amount = parseFloat(req.body.amount1)

            if(balance >= amount){
                const withdrawed = balance - amount
                user.amount = withdrawed
                await user.save()

                const transaction = ({
                    text:`Withdrawed ₦${amount} at ${new Date().toUTCString()}  Balance: ₦${withdrawed}`
                })

                const message = await User.findByIdAndUpdate(id, {
                    $push:{transaction:transaction}
                })

                return res.status(200).json(message)
                
            }else if(balance < amount){
                return res.status(403).json('invalid input')
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}