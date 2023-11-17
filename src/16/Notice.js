// Notice.js
import TopBar from './TopBar'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


  


const Notice = () => {
  const handlepost = async () => {
    // 예시: 서버로 로그인 정보를 보내고 응답을 처리
    try {
      const response = await fetch('http://10.125.121.205:8080/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        handleserver2()
        serverok=true
      } else {
        // 로그인 실패 시 적절한 처리
        serverok=false
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };
  const handleserver2 = async () => {
    // 예시: 서버로 로그인 정보를 보내고 응답을 처리
    try {
      const response = await fetch('http://10.125.121.205:8080/api/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        const data = await response.json();
        // 로그인 성공 시 사용자 정보 업데이트
        
        console.log(data)
        data.forEach(item => {
          arr1[item.rank] = item.name;
        });
        console.log(arr1)
        // 추가로 필요한 작업 수행 (예: 토큰 저장, 다른 상태 업데이트 등)
        navigate('/Notice'); // 로그인 성공 후 이동할 페이지
      } else {
        // 로그인 실패 시 적절한 처리
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };
  var serverok=false
  const [arr1,setArr1]=useState({})
  
  useEffect(()=>{
    handlepost()
  },[])
  const navigate = useNavigate();

  const handleDivClick = (item) => {
    navigate(`/Comment/${item}`);
  };

  // const arr_div = arr1.map((item, index) => {
  //   const bgColorClass = `bg-slate-${Math.floor(Math.random() * 9) * 100}`;
    
  //   return (
  //     <div key={index} className={`p-4 ${bgColorClass}`} onClick={() => handleDivClick(item)}>
  //       {item}
  //     </div>
  //   );
  // });
  const handleMouseEnter = (rank) => {
    const img = document.getElementById(`img-${rank}`);
    if (img) {
      img.style.display = 'block'; // Show the image
      img.style.opacity=1
    }
  };

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
      <div  className="grid grid-cols-5 gap-0 h-screen pt-16">
      
      {Object.keys(arr1).length > 0 ? (
       
        Object.entries(arr1).map(([rank, name]) => (
          <div onClick={() => handleDivClick(rank)} key={rank} className="flex flex-col items-center relative bg-black "
          onMouseEnter={() => handleMouseEnter(rank)}
          onMouseLeave={() => handleMouseLeave(rank)}>
          <img id={`img-${rank}`} src={`${rank}.jpg`} alt={`Rank ${rank}`} className=" w-full h-full  opacity-20 absolute" />
          
          </div>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
      
    </>
  );
};

export default Notice;
