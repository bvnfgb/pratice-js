"use client"
import { useState, useEffect } from "react";
const ClockTime = () => {
    //useState 변수
    const [dt , setDt] = useState(new Date().toLocaleTimeString()) ;

    //useEffect : 처음 한번만 실행
    useEffect(() => {
        const t = setInterval(() => {
            setDt(new Date().toLocaleTimeString()) ;
        }, 1000) ;

        return () => {clearInterval(t)} ;
    },[]) ;

    //useEffect : 특정변수가 바뀔때 실행
    useEffect(() => {
        console.log(dt);
    } , [dt]);

    return (
        <>
            <p>
                NextJS : Hello React !!
            </p>
            <div>현재시간 : {dt}</div>
        </>
    );
}

export default ClockTime;