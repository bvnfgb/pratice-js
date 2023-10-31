import React from 'react'
import { useParams } from 'react-router-dom'
import Ultra from './Ultra'

const FcstFetch = () => {
    const x=useParams().x
    const y=useParams().y
    const dt=useParams().dt
    const area=useParams().area
    const m=useParams().m
  return (
    <div>
      FcstFetch
      {dt}, {area}, {x}, {y} ,{m}
      <Ultra dt={dt} area={area} m={m}></Ultra>
    </div>
  )
}

export default FcstFetch
