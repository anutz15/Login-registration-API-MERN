import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();
  const [data, setData] = useState({

    // initial value to display as null
    email: '',
    password: '',
  })

  const loginUser = async (e)=>{
    e.preventDefault()
    // axios.get('/')
    const {email, password } = data
    try {
      const {data} = await axios.post('/login', {
        email,
        password
      });

      if(data.error){
        toast.error(data.error)
      }else{
        setData({})  // set empty object form again
        navigate('/dashboard')
      }


      // after '/login' -> { email, password} is payload
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
     <form onSubmit={loginUser}>
        <label>Email</label>
        <input type='email' placeholder='Enter emailID...' value={data.email} onChange={(e)=> setData({...data, email:e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='Enter password...' value={data.password} onChange={(e)=> setData({...data, password:e.target.value})}/>

        <button type='submit'>Login </button>
     </form>
    </div>
  )
}
