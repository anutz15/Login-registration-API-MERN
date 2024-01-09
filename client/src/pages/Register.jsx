import React from 'react'
import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  // e - event, e.preventDefault() to checkout
  const registerUser = async (e)=>{      
    e.preventDefault()
    // destructure the data first
    const {name,email,password} = data
    try {

      // this info send to backend 
      const {data} = await axios.post('/register',{
        name,email,password
      }) 
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        toast.success("Register successful");
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='Enter name...' value={data.name} onChange={(e)=> setData({...data, name:e.target.value})}/>
        <label>Email</label>
        <input type='email' placeholder='Enter emailID...' value={data.email} onChange={(e)=> setData({...data, email:e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='Enter password...' value={data.password} onChange={(e)=> setData({...data, password:e.target.value})}/>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
