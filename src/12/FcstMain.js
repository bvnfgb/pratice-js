import TailH1 from "../comm/TailH1";
import TailSelect from "../comm/TailSelect";
import ButtonBlue from "../comm/ButtonBlue" ;

import getxy from "./getxy.json" ;
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FcstMain = () => {
  //상태변수
  const [dt, setDt] = useState();
  const [area, setArea] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();

  //ref변수
  const inDt = useRef() ;

  //select option
  const opItem = getxy.map((item) => 
      [item["격자 X"]+'-'+item["격자 Y"]+'-'+item["1단계"], item["1단계"]]) ;

  //이벤트 처리
  const handleDtChange = (e) => {
    setDt(e.target.value.replaceAll('-', ''));
  }

  const handleSelChange = (e) => {
    console.log("handleSelChange", e.target.value)
    let temp = e.target.value.split('-');
    setX(temp[0]);
    setY(temp[1]);
    setArea(temp[2]) ;
  }

  const handleBtClick = (e) => {
    e.preventDefault() ;
  }

  //컴포넌트 생성시 한번만
  useEffect(() => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    // let day = ('0' + today.getDate()).slice(-2);
    let day = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
    setDt(year+month+day) ;
    
    //오늘날짜를 input=>date의 초기값으로 설정
    inDt.current.value = year + '-' + month + '-' + day ;

  }, []);

  //컴포넌트 업데이트
  useEffect(() => {
    console.log("dt", dt)
    console.log("x", x)
    console.log("y", y)
    console.log("area", area)
  }, [dt, x, y, area]);

  return (
    <section className="p-5">
      <form>
        <TailH1 title='기상청 예보 정보입력' />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-5 my-10">
          <div>
            <input ref={inDt} type="date" id="dt" name="dt" onChange={handleDtChange} />
          </div>
          <div>
            <TailSelect id={'sel'}  opItem={opItem}  handleChange={handleSelChange}/>
          </div>
          <div>
            { x ? 
              <Link to={`/fetch/${dt}/${area}/${x}/${y}/1`} >
              <ButtonBlue caption={"초단기예보"} />
              </Link>
              :<ButtonBlue caption={"초단기예보"} handleClick={handleBtClick}/>
            }
          </div>
          <div>
          { x ? 
              <Link to={`/fetch/${dt}/${area}/${x}/${y}/2`} >
              <ButtonBlue caption={"단기예보"} />
              </Link>
              :<ButtonBlue caption={"단기예보"}  handleClick={handleBtClick}/>
            }
          </div>
        </div>
      </form>
    </section>
  )
}

export default FcstMain
