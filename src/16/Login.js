import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import Logout from './Logout'

const Login = () => {
    const [user,setUser]=useState(null)
    useEffect(()=>{
        // localStorage.setItem('user','user@pusan.ac.kr')
        // localStorage.setItem('pwd','test')
        setUser(localStorage.getItem('user'))
    },[])
  return (
    <main className='container'>
      {user?<Logout user={user} serUser={setUser}/>:<LoginForm setUser={setUser} />}
      
      </main>
  )
}

export default Login
