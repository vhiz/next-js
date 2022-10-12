import dbConnect from "../../../utils/mongodb"
import * as jwt from 'jsonwebtoken'
import User from "../../../models/User"
export default async function handler (req, res){
    const{method, query:{id}} = req

    await dbConnect()

    if(method === "GET"){
        try {
            const user = await User.findOne({id: id})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
            console.log(error.message)
        }
    }

    
}

export const config = {
    api: {
      externalResolver: true,
    },
  }