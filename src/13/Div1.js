import React from 'react'
import Div2 from './Div2'
const Div1 = ({setN, n}) => {
  return (
    <div className='bg-orange-800 text-orange-50 m-2 p-2'>
      <h1 className='text-orange-50'>Div1</h1>
      <Div2 setN={setN} n={n}></Div2>
    </div>
  )
}

export default Div1
