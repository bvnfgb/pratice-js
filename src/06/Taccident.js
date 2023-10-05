
import Hh1 from '../comm/Hh1'
import dataTaccident from './dataTaccident.json'
import TaccidentNav from './TaccidentNav.js'
import { useState, useEffect } from 'react'

const Taccident = () => {
    const tdata=dataTaccident['data']//dataTaccident.data

    console.log(dataTaccident)
    let c1=  tdata.map((k)=>{
      return k.사고유형_대분류
    } )
    // c1=new Set(c1)//set으로 변환set={}
    // c1=[...c1]// 배열로 변환 배열=[]
    c1=[...new Set(c1)]//set으로 변환하고 set을 다시 배열로 변환

    const[sel1,setSel1]=useState()//대분류선택
    //중분류

    const[c2,setC2]=useState()

    //중분류선택
    const[sel2,setSel2]=useState()

    const [divTag,setDivTag]=useState()
console.log(c1)
useEffect(()=>{
if(!sel1) return
console.log("sel1=",sel1)
  let temp=tdata.filter((item)=>{
    
    return item.사고유형_대분류===sel1
  })
  temp=temp.map((item)=>item.사고유형_중분류);
  setC2(temp)
  setSel2()
  setDivTag()
},[sel1])


useEffect(()=>{if(!sel1 || !sel2) return
let temp=tdata.filter((item)=>item.사고유형_대분류===sel1&&item.사고유형_중분류===sel2)//temp= array temp[0]=obj
temp=temp[0]
// temp=Object.keys(temp).map((i, idx)=>
// <div key={`d${idx}`}>{i} : {temp[i]}</div>
// )
temp=Object.keys(temp).filter((item)=>
  (item!=='사고유형_중분류' &&item!=='사고유형_대분류' )
).map((i, idx)=>
<div key={`d${idx}`}>{i} : {temp[i]}</div>
)
console.log(temp)
setDivTag(temp)
},[sel2])
    return(
    <main className='container'>
      <article>
        <Hh1 title="유형별 교통사고"></Hh1>
        <TaccidentNav title='교통사고 대분류' c={c1} sel={sel1} setSel={setSel1}/>
        {c2&&<TaccidentNav title='교통사고 중분류' c={c2} sel={sel2} setSel={setSel2}/>}
        <div className='grid'>
          {divTag}
        </div>
      </article>
    </main>
      )
}

export default Taccident
