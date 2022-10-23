import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async()=>{
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {email, password})
      router.push(`/user/${res.data._id}`)
    } catch (error) {
      setError(true)
    }
  }
  return (
    <div>
      <nav className="navbar bg-light">
        <div className="contanier-fluid">
          <a className="btn btn-primary" href="/">Signup</a>
        </div>
      </nav>
      <div className="mb-3">
        <h1>Login Page</h1>
        <div className="mb-3">
        <input placeholder="Email" className="form-control" type='email' id='exampleInputEmail' onChange={(e)=> {
          return setEmail(e.target.value)
        }} required/>
        </div>
        <div className="mb-3">
        <input placeholder="Password" type='password' className="form-control" id='exampleInputPassword' onChange={(e)=>  {
          return setPassword(e.target.value)
        }} required/>
        </div>
        <button onClick={handleClick} className ="btn btn-primary">Submit</button>
        {error && <span className="form-text">wrong input</span>}
      </div>
    </div>
  )
}

export default login