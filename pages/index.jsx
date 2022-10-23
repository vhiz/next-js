/* eslint-disable @next/next/no-sync-scripts */
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'


const Home = ()=>{
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)
  const [phoneno, setPhoneno] = useState(null)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async ()=>{
    try {
      await axios.post('http://localhost:3000/api/auth', {email, password, name,phoneno })

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
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
        <a class="btn btn-primary" href="/login" role="button">Login</a>
        </div>
      </nav>
    <div className='mb-3'>
      <h1>Register Page</h1>
      <div className='mb-3'>
      <input placeholder='email' className='form-control' type='email' id='exampleInputEmail' onChange={(e)=> setEmail(e.target.value)} required/>

      </div>
      <div className='mb-3'>
      <input placeholder='password' className='form-control' type='password' id='exampleInputPassword' onChange={(e)=> setPassword(e.target.value)} required/>
      </div>
      <div className='mb-3'>
      <input placeholder='name' className='form-control' type='name' id='exampleInputName' onChange={(e)=>setName(e.target.value)} required/>
      </div>
      <div className='mb-3'>
        <input type="tel" className='form-control' id='exampleInputName' placeholder='phoneno' onChange={(e)=>setPhoneno(e.target.value)} required/>
      </div>
      <button onClick={handleClick} className='btn btn-primary'>
        Submit
      </button>
      {error && <span className='form-text'>wrong credentials</span>}
    </div>
    </div>
  )
}



export default Home