import React from 'react'
import Div3 from './Div3'
const Div2 = ({setN,n}) => {
  return (
    <div className='bg-orange-700 text-orange-50 m-2 p-10 w-5/6'>
      <h1 className='text-orange-50'>Div2</h1>
      <Div3 setN={setN} n={n}/>
    </div>
  )
}

export default Div2
