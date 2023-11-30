import React from 'react'

export default function Bigmodal({content,send,setbigModalOpen, srstate,setstate}) {
  function closeModal(){
    setbigModalOpen(false)
  }
  
  return (
    <div className="bg-white w-96 h-80 fixed z-40  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <button
        className="absolute w-4 right-0 top-0 text-cyan-300"
        onClick={closeModal}
      >
        X
      </button>
      <ul className="flex " >
      
      <li className="list-none flex-1" >{content}</li>
      <li className="list-none ">{send}</li>
      <button>회신</button><button>삭제</button>
    </ul>
    </div>
  )
}
