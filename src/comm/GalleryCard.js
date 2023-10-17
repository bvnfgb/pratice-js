

const GalleryCard = ({imgsrc, title,content,sptag,refv}) => {
    const sptags=sptag.map((item,idx)=>
<span onClick={()=>handleClick(item)} key={idx} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item}</span>
)
const handleClick=(item)=>{
  console.log(item)
  refv.current.value=item
}
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={imgsrc} alt={title}/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{title}</div>
    <p className="text-gray-700 text-base">
      {content}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
    {sptags}
  </div>
</div>
  )
}

export default GalleryCard
