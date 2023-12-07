// Notice.js
import TopBar from './TopBar'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


  


const Notice = () => {
  const uri=process.env.REACT_APP_URI
  const navigate = useNavigate();
  const [arr1,setArr1]=useState({})
  console.log("uri",uri)
  const handleserver2 = 
  async () => {
    // 예시: 서버로 get 요청을 보내고rank데이터 수신 대기
    try {
      const response = await fetch(`${uri}/api/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        const data = await response.json();
        // 
        
        console.log(data)
        data.forEach(item => {
          arr1[item.rank] = item.name;
        });//데이터 수신후 랭크데이터와 이름데이터 페어링
        console.log(arr1)
        // 
        navigate('/Notice'); // 화면 강제 재랜더링
      } else {
        // 데이터 수신 실패 시 적절한 처리
        console.error('데이터수신 실패(handleserver2 fail)');
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };
  const handlepost = async () => {
    // 예시: 서버로 post요청 보내고 응답 대기
    try {
      const response = await fetch(`${uri}/api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {//ok응답시 2번째 서버요청 함수 실행
        handleserver2()
        
      } else {
        // 적절한 응답이 없으면 실패판정
        console.log('서버 초기화실패')
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };
  
  
  useEffect(()=>{//웹페이지 시작시 서버 초기화 함수 시작
    handlepost()
  },[])
  

  const handleDivClick = (item) => {//각각의 이미지에 하위 게시판으로 이동하는 클릭이벤트 작성
    navigate(`/Comment/${item}`);
  };

  // 
  const handleMouseEnter = (rank) => {
    const img = document.getElementById(`img-${rank}`);
    if (img) {
      img.style.display = 'block'; // Show the image
      img.style.opacity=1
    }
  };
//위아래는 각각 마우스가 이미지 위에 있는지 인식하는 함수이다. 이미지 위에 있을시 이미지를 흐리게 처리한다
  const handleMouseLeave = (rank) => {
    const img = document.getElementById(`img-${rank}`);
    if (img) {
      img.style.display = 'block'; // Hide the image
      img.style.opacity=0.2
    }
  }
  return (
    <>
       <TopBar/>
      <div  className="grid grid-cols-5 gap-0 h-screen" style={{paddingTop:'3.75rem'}}>
      
      {Object.keys(arr1).length > 0 ? (
       
        Object.entries(arr1).map(([rank]) => (
          <div id='elementToFadeInAndOut' onClick={() => handleDivClick(rank)} key={rank} className="flex flex-col items-center relative bg-black "//작성된 이벤트를 모든 이미지에 달아둔다
          onMouseEnter={() => handleMouseEnter(rank)}
          onMouseLeave={() => handleMouseLeave(rank)}>
          <img id={`img-${rank}`} src={`${rank}.jpg`} alt={`Rank ${rank}`} className=" w-full h-full  opacity-20 absolute" />
          
          </div>
          
        ))
      ) : (
        <p>Loading...</p>//로딩 화면
      )}
    </div>
      
    </>
  );
};

export default Notice;
