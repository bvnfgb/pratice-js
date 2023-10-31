import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FcstMain from './FcstMain'
import FcstNav from './FcstNav'
import Ultra from './Ultra'
import FcstFetch from './FcstFetch'

const Fcst = () => {
  return (
    <BrowserRouter>
    <main className='container'>
    <FcstNav/>
    <Routes>
        <Route path='/' element={<FcstMain/>} />
        <Route path='/fetch/:dt/:area/:x/:y/:m' element={<FcstFetch></FcstFetch>} />
    </Routes>
    </main>
    </BrowserRouter>
  )
}

export default Fcst
