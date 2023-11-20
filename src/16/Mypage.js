import React, { useEffect, useState } from 'react'
import TopBar from './TopBar';
import {  useNavigate } from 'react-router-dom';

const Mypage = () => {
        const [inputValue,setInputValue]=useState("")
   
        const navigate = useNavigate();
        const handleGoBack = (event) => {
            event.preventDefault()
            navigate(-1);
          };
          const handleback = 
          
          async (e) => {
            e.preventDefault()
            // 예시: 서버로 로그인 정보를 보내고 응답을 처리
            try {
              const response = await fetch(`http://10.125.121.205:8080/api/user/delete`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id:localStorage.getItem('user'),
                pwd:inputValue
            }),
              });
          
              if (response.ok) {
                
                                localStorage.clear()
                                navigate('/Notice')
                // 성공 시 사용자 정보 업데이트 등의 작업 수행
              } else {
                // 실패 시 적절한 처리
                console.error('코멘트 입력 실패');
              }
            } catch (error) {
              console.error('오류 발생', error);
            }
          
            // State updates and additional logic
            
          };
    
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const handlechangeps = (event) => {
        event.preventDefault()
        setShowPasswordForm(!showPasswordForm);
      };
    const  temp1=()=>{
        return(
            <div className='flex flex-col'>
                            <div className='flex flex-row'>
                            <label>현재 비밀번호</label>
                            <input onChange={(event) => {
                                setInputValue(event.target.value)}} type='password' />
                            </div>
                        </div>
                        )
          }
    
    const temp=()=> {
        return(
        <div className='flex flex-col'>
                        <div className='flex flex-row'>
                        <label>현재 비밀번호</label>
                        <input type='password' />
                        </div>
                        <div className='flex flex-row'>
                        <label>새로운 비밀번호</label>
                        <input type='password' />
                        </div>
                        <div className='flex flex-row'>
                        <label>새로운 비밀번호 확인</label>
                        <input type='password' />
                        </div>
                    </div>
                    )
      }
      useEffect(()=>{

      },[showPasswordForm])
  return (
    <div>
      <TopBar/>
      <div className='pt-16 flex max-w-full w-full h-screen justify-center'>
        <div className='w-52 h-52 '>
        <img className='rounded-full w-52 h-52' src='1.jpg'/></div>
      <div className=' w-1/3 justify-center flex mx-8'>
        <form className='w-full'>
            <div className='flex flex-row'><label>닉네임</label><input type='text'></input></div>
            <button onClick={handlechangeps} className='mb-7 w-auto'>{showPasswordForm ? '취소' : '비밀번호변경'}</button>
            {showPasswordForm ?temp():temp1()}
            <div className='flex flex-row'><label>이메일</label><input type='text'></input></div>
            <div className='flex flex-row'>
                <button>수정</button>
                <button onClick={handleGoBack}>취소</button>
                <button onClick={handleback}>탈퇴</button>
            </div>
        </form>
      </div>
      </div>
      
    </div>
  )
  }

export default Mypage
