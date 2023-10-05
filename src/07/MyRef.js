import Hh1 from '../comm/Hh1'
import { useState, useEffect, useRef } from 'react';
const MyRef = () => {
    const title="useRef Hook변수제어"
    // let cnt1=0;
    const [cnt1,setCnt1]=useState(0);

    const cnt2=useRef(0)
    const txt1=useRef()
    const handleClick=()=>{
        setCnt1(cnt1+1)
        console.log("handleClick",cnt1)
    }
    const handleClickRef=()=>{
        cnt2.current++
        console.log("handleClickRef", cnt2.current)
    }
    const handleChange=(()=>{
        console.log("handleChange",txt1.current.value)
        setCnt1(txt1.current.value)
        setCnt1(parseInt(txt1.current.value))
    })
    useEffect(()=>{
        setCnt1(100)
        txt1.current.focus()
    },[])//컴포넌트 생성 1회용 호출
    useEffect(()=>{//컴포넌트 업데이트 반복호출
        console.log("useEffect", cnt1)
    },[cnt1])
  return (
    <main className='container'>
        <article>
            <Hh1 title={title}/>
            <div className='grid'><div>state변수 :{cnt1}</div>
            <div>ref변수 :{cnt2.current}</div>
            </div>
            <footer><div className='grid'>
            <button onClick={handleClick} >state 변수 증가</button>
            <button onClick={handleClickRef} >ref 변수 증가</button></div>
            </footer>
            
        </article>
        <article>
            <Hh1 title='Form 제어: useRef'></Hh1>
            <form>
                <input onChange={handleChange} ref={txt1} type='number' id='txt1' name='txt1' placeholder='숫자입력'/>
            </form>
        </article>
    </main>
  )
}

export default MyRef
