import React from 'react'

const Comment_component = ({name,text,key}) => {
    
  return (
    <div key={key} className='inline-block ml-16 text-left align-top'>
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
