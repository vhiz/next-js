import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async(ctx)=>{
    try {
      const res = await axios.post('http://localhost:3000/api/user', {email, password})
      router.push(`/user/${res.data._id}`)
    } catch (error) {
      setError(true)
    }
  }
  return (
    <div>
      <div className="mb-3">
        <h1>Login Page</h1>
        <input placeholder="Email" className="form-control" onChange={(e)=> {
          return setEmail(e.target.value)
        }}/>
        <input placeholder="Password" className="form-control" onChange={(e)=>  {
          return setPassword(e.target.value)
        }} />
        <button onClick={handleClick} className ="btn btn-primary">Submit</button>
        {error && <span className="form-text">wrong input</span>}
      </div>
    </div>
  )
}

export default login