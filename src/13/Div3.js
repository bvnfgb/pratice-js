import React from 'react'
import ButtonBlue from '../comm/ButtonBlue'

const Div3 = ({setN,n}) => {
  
  const handleDown=()=>{
    setN(n-1)
  }
  const handleUp=()=>{
    setN(n+1)
  }
 
  return (
    <div className='bg-orange-600 text-orange-50 m-2 p-10 w-5/6'>
      <h1 className='text-orange-50'>Div3</h1>
      {/* <h2 className='text-orange-50'>n={n} , n2={n2}</h2> */}
      <div className='grid grid-cols-2 gap-4'>
        <div><ButtonBlue caption="증가" handleClick={handleUp}/></div>
        
        <div><ButtonBlue caption="감소" handleClick={handleDown}/></div>
      </div>
    </div>
  )
}

export default Div3
