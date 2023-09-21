import { useState } from "react";
import { useEffect } from "react";

const ClockTime=()=>{
// let dt=    new Date().toLocaleTimeString()//일반 변수로 처리> 재랜더링 되지않음
// setInterval(() => {
//     dt=    new Date().toLocaleTimeString()
//     console.log(dt)
// }, 1000);
    const [dt, setDt]=useState(new Date().toLocaleTimeString());
//useeffect 1번만 실행/[]
    useEffect(()=>{
        const t= setInterval(() => {
                setDt(new Date().toLocaleTimeString()) 
            }, 1000);

            return ()=>{clearInterval(t)}
    },[]);
    // useeffect 특정변수가 바뀔때 실행/[값]
    useEffect(()=>{
        console.log(dt)
    },[dt])
    return( <>
            <p>Hello React</p>
            <div>{dt}</div>
            </>
    );
}
export default ClockTime;