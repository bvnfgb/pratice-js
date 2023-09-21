import MyDiv1 from "./MyDiv1";
import { useState } from "react";
const MyDiv=()=>{
    // let n=0
    const [n,setn]=useState(0   );
    const handleClick=(check)=>{
        // n=n+1
        if(check)setn(n+1)
        else if(n>=1)setn(n-1)

        console.log(n)
    }
    // const handleClick1=()=>{
    //     // n=n-1
    //     if(n>=1)setn(n-1)
    //     console.log(n)
    // }
    return(
        <main className="container">
            <article>
                <header><h1>probs div</h1></header>
                <MyDiv1 n={n}/>
                <footer>
                    <span onClick={()=>handleClick(true)}>❤</span>
                    <span>{n}</span>
                    <span onClick={()=>handleClick(false)}>✖</span>
                </footer>
            </article>
        </main>
    );
}
export default MyDiv;