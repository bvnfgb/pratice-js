
import { useEffect, useState } from 'react'
import Hh1 from '../comm/Hh1'
import data from './dataFrcst.json'
import style from './Frcst.module.css'
const Frcst=()=> {
    console.log(data)
    const dtkey=["frcstOneDt","frcstTwoDt","frcstThreeDt","frcstFourDt"];
    const cnkey=["frcstOneCn","frcstTwoCn","frcstThreeCn","frcstFourCn"];
    
    const [cnTag,setCnTag]=useState([])
    let dtcn={}
     dtkey.map((item,idx)=>
    dtcn[data[item]]=data[cnkey[idx]]
    )
    let dtTag=Object.keys(dtcn).map((item,idx)=>
      <div key={`dtcn${idx}`} className={style.dtcnkey}onClick={()=>handleClick(item)}>{item}</div>);
    const handleClick=(k)=>{
      let temp=dtcn[k].split(',')
      temp=temp.map((item,idx)=>{
        let spitem=item.split(':')
      return (<div key={`cn`+idx}>
        <span className={style.sp1}>{spitem[0]}</span>
        {spitem[1].trim()==='낮음'
        ?<span className={style.sp21}>{spitem[1]}</span>
        : spitem[1].trim()==='보통'
        ? <span className={style.sp22}>{spitem[1]}</span>
        :<span className={style.sp23}>{spitem[1]}</span>}
        </div>
        )
    })
      setCnTag(temp)
    }
    useEffect(()=>{
      console.log("cnTag",cnTag)
    },[cnTag])
    console.log("temp:",dtcn)
  return (
    <main className='contaner'>
        <article>
        <Hh1 title='미세먼지확인'></Hh1>
        <div className='grid'>
          {dtTag}
        </div>
        <div className='grid'>
          {cnTag}
        </div>
        </article>
    </main>
  )
}

export default Frcst
