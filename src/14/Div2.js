import React from 'react'
import Div3 from './Div3'
import { DivAtom, DivAtom4 } from './DivAtom'
import { useRecoilValue } from 'recoil'
const Div2 = () => {
  const n=useRecoilValue(DivAtom)    
  const n4=useRecoilValue(DivAtom4)
  return (
    <div className='bg-orange-700 text-orange-50 m-2 p-10 w-5/6'>
      <h1 className='text-orange-50'>Div2</h1>
      <h2 className='text-orange-50'>n={n}, n4={n4}</h2>
      <Div3 />
    </div>
  )
}

export default Div2
