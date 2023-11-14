"use client"
import style from './Lotto.module.css';
 
const LottoNums = ({ ns }) => {
    let n ;
    let nsTag = ns.map((item, idx) => {
        n = Math.floor(item / 10); 
        return (
            idx === (ns.length - 1)  
            ? <div key='nsplus' className={style.plus}> + </div>
            : <div key={'ns' + idx} className={style[`lottonum${n + 1}`]}>
                {item}
              </div>
        )
    });

    //배열 at(-1)으로 마지막 요소 가져오기 
    n = Math.floor(ns.at(-1) / 10); 
    nsTag.push(
        <div key={'ns' + (ns.length - 1)} className={style[`lottonum${n + 1}`]}>
                {ns.at(-1)}
        </div>
    );


    return (
        <div className={style.lottobox}>
            {nsTag}
        </div>
    )
}

export default LottoNums;
