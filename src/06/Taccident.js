
import Hh1 from '../comm/Hh1'
import data from './dataTaccident.json'
const Taccident = () => {
    
    const tdata=data.data
    let c1=tdata.map((item)=>item.사고유형_대분류)
    c1=new Set(c1);
    c1=[...c1]
    console.log(c1)
    
    let c1Tag=c1.map((item,idx)=>
    <li key={`li${idx}`}><button>{item}</button></li>
    )
  return (
    
    <main className='container'>
        <article>
            <Hh1 title='도로교통공단_사고유형별 교통사고 통계'></Hh1>
            <nav>
  <ul>
    <li><strong>대분류</strong></li>
  </ul>
  <ul>
    {c1Tag}
  </ul>
</nav>
        </article>

    </main>
  )
}

export default Taccident
