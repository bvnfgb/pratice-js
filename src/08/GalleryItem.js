import GalleryCard from "../comm/GalleryCard"
const GalleryItem = ({item}) => {
    const tags= item.map((i,idx)=>{
        return <GalleryCard key={idx} imgsrc={i.galWebImageUrl.replace("http","https")}
        title={i.galTitle}
        content={i.galPhotographyLocation}
        sptag={i.galSearchKeyword.split(',')
        }
        />//<div key={idx}>{i.galTitle}</div>
    })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-4 gap-4 lg:gap-8">
      {tags}
    </div>
  )
}

export default GalleryItem
