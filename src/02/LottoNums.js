import style from './Lotto.module.css'
const LottoNums = ({ns}) => {
// const LottoNums = (probs) => {
    console.log("LottoNums",ns)
    let nsTag=ns.map((item,idx)=>
        // let temp;
        // if(item<10) temp=<div key={'ns'+idx} className={style.lottonum1}>{item}</div>
        // else if(item<20) temp=<div key={'ns'+idx}className={style.lottonum2}>{item}</div>
        // else if(item<30) temp=<div key={'ns'+idx}className={style.lottonum3}>{item}</div>
        // else if(item<40) temp=<div key={'ns'+idx}className={style.lottonum4}>{item}</div>
        // else temp=<div key={'ns'+idx}className={style.lottonum5}>{item}</div>
        // switch (Math.floor (item/10)){
        //     case 0:temp=<div key={'ns'+idx} className={style.lottonum1}>{item}</div>;break;
        //     case 1:temp=<div key={'ns'+idx} className={style.lottonum2}>{item}</div>;break;
        //     case 2:temp=<div key={'ns'+idx} className={style.lottonum3}>{item}</div>;break;
        //     case 3:temp=<div key={'ns'+idx} className={style.lottonum4}>{item}</div>;break;
        //     case 4:temp=<div key={'ns'+idx} className={style.lottonum5}>{item}</div>;break;
        // }
        
        
    {
        // let temp=[]
        return idx===(ns.length-1)?<div>+</div>:<div key={'ns'+idx} className={style[`lottonum${Math.floor (item/10)+1}`]}>{item}</div>}
        // temp=<div key={'ns'+idx} className={style[`lottonum${Math.floor (item/10)+1}`]}>{item}</div>
        // return temp
         



        
    );//배열 at (-1)사용가능
        nsTag.push(
            <div key={'ns'+(ns.length-1)} className={style[`lottonum${Math.floor (ns.at(-1)/10)+1}`]}>{ns.at(-1)}</div>
        )
  return (
    <div className={style.lottobox}>
      {nsTag}
    </div>
  )
}

export default LottoNums
