import { useState,useEffect } from "react";
const Box=()=>{
    
    const [Boxlist, setBoxlist]=useState()
    const [listTag, setListTag]=useState()
    
    const [detailTag, setdetailTag]=useState()
    const handleClick=(item)=>{
        console.log(item.movieCd)
        setdetailTag(<div><span>[{item.movieCd}]</span><span> 신규:{item.rankOldAndNew}</span><span> 개봉일:{item.openDt}</span></div>)
        
    }
    
    useEffect(()=>{
        let url="https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20230918"
    fetch(url)
    .then(resp=>resp.json())
    .then(data=>
        setBoxlist(data.boxOfficeResult.dailyBoxOfficeList)
        )
    .catch((err) => console.log(err))
    },[])
    useEffect(()=>{
        console.log(Boxlist)
    if(Boxlist){
        setListTag(Boxlist.map((item,idx)=>
        <tr key={idx} onClick={()=>handleClick(item)}>
            <td >{item.rank}</td>
            <td >{item.movieNm}</td>
            <td >{item.salesAcc}</td>
            <td >{
            item.rankInten==0?"-":item.rankInten>0?"▲"+ item.rankInten:"▼"+Math.abs(item.rankInten)
            }</td>
            </tr>
        ))
    }
    }

    
    ,[Boxlist])
    return(
        <main className="container">
            <article>
                <header><h1>일일 박스오피스</h1></header>
                <table><thead>
                    <tr>
                        <th scope="col">순위</th>
                        <th scope="col">영화명</th>
                        <th scope="col">매출액</th>
                        <th scope="col">증감</th>
                    </tr>{listTag}</thead>
                </table>
                <footer>
                    
                        {detailTag}
                    
                </footer>
            </article>
        </main>
    );
}
export default Box;