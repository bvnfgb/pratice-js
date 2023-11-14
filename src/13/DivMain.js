import React, { useEffect, useState } from 'react'
import Div1 from './Div1'

const DivMain = () => {
    const [n,setN]=useState(0)
    const [n2,setN2]=useState()
    useEffect(()=>{
        return setN2(n*2)
    },[n])
  return (
    <main className='container'>
    <div className='bg-orange-900 text-orange-50 m-10 p-10'>
        <h1 className='text-orange-50'>DivMain</h1>
        <h2 className='text-orange-50'>n={n} , n2={n2}</h2>
        <Div1 setN={setN} n={n}/>
    </div>
    </main>
  )
}

export default DivMain
