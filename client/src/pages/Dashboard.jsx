import React from 'react'
import { useContext } from 'react'
import {UserContext} from '../../context/userContext'


export default function Dashboard() {
  // if you want to access the user on any page 
  const {user} = useContext(UserContext)
  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && (<h2>Hi {user.name}! </h2>) }
    </div>
  )
}
