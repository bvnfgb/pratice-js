
import style from './Box.module.css'
import Hh1 from "../comm/Hh1";
import { useRef, useState, useEffect } from "react";
const Box=()=>{
    const dt=useRef()
    const [Boxlist, setBoxlist]=useState()
    
    const [cdt,setCdt]=useState()
    useEffect(()=>{
        dt.current.focus()
        const yesterday =  new Date();
        yesterday.setDate(yesterday.getDate()-1)
        let y=`${yesterday.getFullYear()}`
        let m=yesterday.getMonth()+1<10?`0${yesterday.getMonth()+1}`: `${yesterday.getMonth()+1}`
        let d=yesterday.getDate()+1<10?`0${yesterday.getDate()}`: `${yesterday.getDate()}`
        
        dt.current.value=`${y}-${m}-${d}`
        setCdt(y+m+d)
        ffetch(y+m+d)
    },[])
    const ffetch=((day)=>{
        let url=`https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${day}`
        fetch(url)
    .then(resp=>resp.json())
    .then(data=>
        setBoxlist(data.boxOfficeResult.dailyBoxOfficeList)
        )
    .catch((err) => console.log(err)) 
    console.log(Boxlist)
    })
    const handleChange=(()=>{
        let temp=dt.current.value
        temp=temp.replaceAll('-','')
        console.log(temp)
        setCdt(temp)
        ffetch(temp)
    })
    
    return(
        <main className="container">

            <Hh1 title='박스오피스'/>
            <article>
                <header>
                    <div htmlFor="dt" className={style.dt}>선택날짜:{cdt}</div>
                    <form>
                        
                        <input onChange={handleChange} ref={dt} type="date" id="dt" name="dt"></input>

                    </form>
                </header>
            </article>
        </main>
    )
    
}
export default Box;