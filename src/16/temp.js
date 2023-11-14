import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

export default function temp() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Signup/>}/>
        <Route path='Login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
