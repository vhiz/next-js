import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"

const User = ({user, params}) => {
  const [amount , setAmount] =useState(null)
  const [error, setError] = useState(false)

  const router = useRouter()
  const handleClick = async()=>{
    try {
      await axios.post(`http://localhost:3000/api/deposit/${user._id}`, {amount})
      router.push(`/user/${user._id}`)
    } catch (error) {
      setError(true)
    }
  } 
 
  return (
    <div>
      <Head>
        <title>{user.name} acount</title>
      </Head>
      <nav className="navbar bg-light">
        <div className="contanier-fluid">
          <a className="navbar-brand">Current Balance: ₦{user.amount}</a>
        </div>
        <div>
        <a class="btn btn-danger" href="/login" role="button">Logout</a>
        </div>
      </nav>
      <br />
      <h3>Account No: {user.phoneno}</h3>
      <br />
      <div className="container text-center">
        <div className="row row-col-2">
        <div className="col">
          <h1>Deposit</h1>
          <div className="col-auto">
            <label htmlFor="exampleInputEmail" className="form-label">Amount</label>
            <input type="text" className="form-control" id="inputNumber" min="1000" onChange={(e)=>{return setAmount(e.target.value)}} required/>
          </div>
          <br />
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Deposit</button>
            {error && <span className="form-text">wrong input</span>}
          </div>
        </div>
        <div className="col">Column</div>
        <div className="col">Column</div>
        <div className="col">Column</div>
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps = async ({params})=>{

  
  const res = await axios.get(`http://localhost:3000/api/user/${params}`)
  return{
    props:{
      user: res.data
    }
  }
}

export default User