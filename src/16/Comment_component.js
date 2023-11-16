import React from 'react'

const Comment_component = ({name,text,key}) => {
    
  return (
    <div key={key} className='inline-block text-left align-top border-2 border-red-400 border-spacing-16'>
   <div key={key*(-1)}> 
      {name} 
   </div>
   <span className='text-black text-base'>
      {text}
   </span>
</div>
  )
}

export default Comment_component
