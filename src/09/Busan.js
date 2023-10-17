import pusandata from "./pusandata.json"
import ButtonBlue from "../comm/ButtonBlue"
import { useRef, useEffect,useState } from "react"
import GalleryCard from "../comm/GalleryCard"

const Busan = () => {
    const items=pusandata.map((obj)=>
        <GalleryCard
        key={obj.콘텐츠ID}
        imgsrc={obj.썸네일이미지URL}
        title={obj.제목}
        content={obj.상세내용.substring(0,100)+'...'}
        sptag={obj.주요장소.indexOf<0?[obj.주요장소]:obj.주요장소.split(',')
        }
        />
    )
  return (
    <div>
      <main className="container">
        <article>
            <header>
                <h1 className="text-4xl font-bold">부산축제정보</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items}</div>
        </article>
       
      </main>
    </div>
  )
}

export default Busan
