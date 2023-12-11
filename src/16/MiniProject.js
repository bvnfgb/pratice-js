import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MiniProject = () => {
  const navi= useNavigate()
  useEffect(()=>{
    navi('/Notice')
  },[])
    return (
    <>
      
    </>
  )}
export default MiniProject
