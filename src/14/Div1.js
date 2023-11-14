import React from 'react'
import Div2 from './Div2'
import { DivAtom, DivAtom3 } from './DivAtom'
import { useRecoilValue } from 'recoil'
const Div1 = () => {
  const n=useRecoilValue(DivAtom )    
  const n3=useRecoilValue(DivAtom3)
  return (
    <div className='bg-orange-800 text-orange-50 m-2 p-2'>
      <h1 className='text-orange-50'>Div1</h1>
      <h2 className='text-orange-50'>n={n}, n3={n3}</h2>
      <Div2 ></Div2>
    </div>
  )
}

export default Div1
