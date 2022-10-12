import axios from "axios"
import * as jwt from 'jsonwebtoken'

const User = ({user}) => {
  return (
    <div>{user.name}</div>
  )
}
export const getServerSideProps = async ({params})=>{

  const res = await axios.get(`http://localhost:3000/api/user/${params}`)
  console.log(res)
  return{
    props:{
      user: res.data
    }
  }
}

export default User