/* eslint-disable @next/next/no-sync-scripts */
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'


const Home = ()=>{
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async ()=>{
    try {
      await axios.post('http://localhost:3000/api/auth', {email, password, name })

      router.push('/login')
    } catch (error) {
      setError(true)
    }
  }

  return(
    <div>
      <nav className='navbar bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand'>Welcome</a>
        </div>
      </nav>
    <div className='mb-3'>
      <h1>Register Page</h1>
      <input placeholder='email' className='form-control' onChange={(e)=> setEmail(e.target.value)} required/>
      <input placeholder='password' className='form-control' onChange={(e)=> setPassword(e.target.value)} required/>
      <input placeholder='name' className='form-control' onChange={(e)=>setName(e.target.value)} required/>
      <button onClick={handleClick} className='btn btn-primary'>
        Submit
      </button>
      {error && <span className='form-text'>wrong credentials</span>}
    </div>
    </div>
  )
}



export default Home