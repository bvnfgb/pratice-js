import MyComN from "./MyComN";
const MyCom=()=>{
    let n=undefined
    // let m;
    // if(n===undefined)
    //     m=<div>값 없</div>
    // else
    //     m=<MyComN n={n} n1={n*2}/>
    return(
        <main className="container">
            <article>
            <header>MyCom</header>
            {//삼항연산
                // n===undefined ?<div>값 없</div>:<MyComN n={n} n1={n*2}/>
                //변수처리
                // m
                //falsy 연산
                n&&<MyComN n={n} n1={n*2}/>
            }
            </article>
        </main>
    );
}

export default MyCom;