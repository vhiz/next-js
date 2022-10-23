import dbConnect from "../../../utils/mongodb"
import User from "../../../models/User"
export default async function handler (req, res){
    const{method, query:{id}} = req
    await dbConnect()

    if( method === "POST"){
        try {
            const user = await User.findById(id)
            if(!user) return res.status(403).json('no user found')
            
            const balance = parseFloat(user.amount)
            const amount = parseFloat(req.body.amount)
            if(user.amount == "NaN"){
                user.amount= 0
                await user.save()
            }
            const deposited = balance + amount
            user.amount = deposited
            const saved = await user.save()
            if(saved){
                const transaction = ({
                    text:`Deposited ₦${amount} at ${new Date().toUTCString()}  Balance: ₦${deposited}`
                })
                const message = await User.findByIdAndUpdate(id,{
                    $push:{transaction:transaction}
                })
                return res.status(200).json(message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}