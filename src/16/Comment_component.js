import React from 'react'

const Comment_component = ({name,text,key}) => {
    
  return (
    <div key={key} className='flex flex-row justify-between  text-left align-top border-2 border-red-400 border-spacing-16'>
   
   <span className='text-black text-base'>
      {text}
   </span>
   <div key={key*(-1)}> 
      {name} 
   </div>
</div>
  )
}

export default Comment_component
