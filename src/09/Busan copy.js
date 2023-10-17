import pusandata from "./pusandata.json"
import ButtonBlue from "../comm/ButtonBlue"
import { useRef, useEffect,useState } from "react"
import GalleryCard from "../comm/GalleryCard"

const Busan = () => {
    const sel=useRef()
    const [item,setItem]=useState()
    const [tags,setTags]=useState()
    console.log(pusandata)
    const code=pusandata.map((obj)=>{
        
        return [obj.콘텐츠ID,obj.콘텐츠명.slice(0,obj.콘텐츠명.lastIndexOf('('))]
    })
    let url=""
    const handleOk=(e,msg)=>{
        e.preventDefault ()
        fetch(url)
        .then((resp)=>resp.json())
        .then((data)=>setItem(data.getFestivalKr.item[0])
        )
        .catch((err) => console.log(err))
    }
    const handleCancel=(e,msg)=>{
    e.preventDefault ()
    }
    
    const opTag=code.map((item)=>{
        return <option key={item[0]} value={item[0]}>{item[1]}</option>
    })
    console.log(code)
    const handleChange=()=>{
        console.log(sel.current.value)
        url=""
        url+="https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=QC3IqYk7CfC8vM6GqkDj1gYFbZdJbl1vNV8ly8VR7G558o8KIvXJ0vQAzh4G4RtJIxWgcafouF%2BJIejePzKthw%3D%3D&pageNo=1&numOfRows=10&resultType=json"
        url+=`&UC_SEQ=${sel.current.value}`
        console.log("url",url)
    }
    
    
    useEffect (()=>{
        sel.current.focus();
    }, []);
    useEffect(()=>{
        if (item === undefined) return ;

       setTags(
            <GalleryCard 
            key = {item.UC_SEQ}
            imgsrc={item.MAIN_IMG_THUMB} 
            title={item.TITLE} 
            content={item.ITEMCNTNTS.length < 100 ? item.ITEMCNTNTS : item.ITEMCNTNTS.substring(0, 100) + '...'}  
            // content={item.ITEMCNTNTS}  
            sptag={item.PLACE.indexOf < 0 ?[item.PLACE] :item.PLACE.split(',')}  />
       );  
    }, [item]);
  return (
    <div>
      <main className="container">
        <article>
            <header>
                <h1 className="text-4xl font-bold">부산축제정보</h1>
            </header>
            <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
            <select ref={sel} name="sel" id="sel" onChange={handleChange}>
                <option>축제명을 선택하세요
                </option>
                {opTag}
            </select>
        </div>
        <div> <ButtonBlue caption='축제확인' handleClick={(e)=>handleOk(e,'ok')}/></div>
        <div> <ButtonBlue caption='취소' handleClick={(e)=>handleCancel(e,'cancel')}/></div>
        </div>
        
        </article>
        {item && tags}
      </main>
    </div>
  )
}

export default Busan
