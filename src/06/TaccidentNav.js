import './Taccident.css'
const TaccidentNav = ({title,c,sel,setSel}) => {
  console.log("sel",sel)
    const handleItemClick = (item) => {
        // 클릭된 항목을 setSel 함수를 사용하여 저장합니다.
        setSel(item);
      };
    const liTag=c.map((item,idx)=>
        <li key={`li${idx}`}><button className={item===sel?"bt1":"bt2"}
         onClick={()=>handleItemClick(item)}>{item}</button></li>
    )
  return (
    <nav>
  <ul>
    <li><strong>{title}</strong></li>
  </ul>
  <ul>
    {liTag}
  </ul>
</nav>
  )
}

export default TaccidentNav
