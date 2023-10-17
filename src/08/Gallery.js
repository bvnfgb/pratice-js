import { BsFillCameraFill } from "react-icons/bs";
import ButtonBlue from "../comm/ButtonBlue";
import { useEffect, useRef, useState } from "react";

import GalleryCard from "../comm/GalleryCard";
const Gallery = () => {
    const txt1=useRef()
    const [kw  , setKw]=useState();
    //목록 상태 변수
    const[item,setItem]=useState();
    const handleOk=(e)=>{
        e.preventDefault()
        console.log("ok")
        if(txt1.current.value==='') return;
        setKw(txt1.current.value)
    }
    const handleCancel=(e)=>{
        e.preventDefault()
        txt1.current.value=""
        setItem([])
        txt1.current.focus()
        console.log("ok")
    }
    const[tags, setTag]=useState();
    useEffect(()=>{
        if(item===undefined) return
        setTag(
        item.map((i,idx)=>{
            return <GalleryCard key={idx} imgsrc={i.galWebImageUrl.replace("http","https")}
            title={i.galTitle}
            content={i.galPhotographyLocation}
            sptag={i.galSearchKeyword.split(',')
            
            }refv={txt1}
            />//<div key={idx}>{i.galTitle}</div>
        })
    )
    },[item])
    
    const getData=(kw)=>{
        let url='https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?'
        const apikey='QC3IqYk7CfC8vM6GqkDj1gYFbZdJbl1vNV8ly8VR7G558o8KIvXJ0vQAzh4G4RtJIxWgcafouF%2BJIejePzKthw%3D%3D'
        const enKw=encodeURI(kw)
        url+=`serviceKey=${apikey}`
        url+=`&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest`
        url+=`&arrange=A`
        url+=`&keyword=${enKw}`
        url+=`&_type=json`

        console.log(url)
        fetch(url)
        .then((resp)=>resp.json())
        .then((data)=>
            setItem(data.response.body.items.item)
        )
        .catch((err) => console.log(err))
        
    }
    useEffect(()=>{
        console.log(item)
    },[item])
    //컴포넌트 생성시
    useEffect(()=>{
        txt1.current.focus()
    },[])
    useEffect(()=>{
        console.log(kw)
        getData(kw)
    },[kw])
  return (
    <main className="container">
    <article>
        <header className="flex justify-between items-center">
            <div className="text-3xl font-bold">한국관광공사 관광사진 정보</div>
            <div>
                <BsFillCameraFill className="text-4xl font-bold"></BsFillCameraFill>
            </div>
        </header>
        <form>
            <div className="grid">
                <div>
                <input type="text" ref={txt1} id="txt1" name="txt1" placeholder="키워드를 입력하세요."/>
            </div>
            <div className="grid"> 
                <ButtonBlue caption={'확인'} handleClick={handleOk}/>
                <ButtonBlue caption={'취소'} handleClick={handleCancel}/>
            </div></div>
        </form>
        
    </article>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-4 gap-4 lg:gap-8">
    
      {tags}
   
    </section>
    </main>
  )
}

export default Gallery
