import React, { useEffect, useState } from 'react'
import TopBar from './TopBar';
import {  useNavigate } from 'react-router-dom';

const Mypage = () => {
  const uri=process.env.REACT_APP_URI
        const [inputValue,setInputValue]=useState("")
        const [inputValue2,setInputValue2]=useState("")
        const [inputName,setInputName]=useState("")
        const [inputEmail,setInputEmail]=useState("")
        const navigate = useNavigate();
        useEffect(()=>{
          initServer()
        },[])
        const handleGoBack = (event) => {
            event.preventDefault()
            navigate(-1);
          };
          const handleback = 
          
          async (e) => {
            e.preventDefault()
            // 예시: 서버로 로그인 정보를 보내고 응답을 처리
            try {
              const response = await fetch(`${uri}/api/user/delete`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization':localStorage.getItem('token')
                },
                body: JSON.stringify({ id:localStorage.getItem('token'),
                pwd:inputValue
            }),
              });
          
              if (response.ok) {
                
                                localStorage.clear()
                                navigate('/Notice')
                // 성공 시 사용자 정보 업데이트 등의 작업 수행
              } else {
                // 실패 시 적절한 처리
                console.error('탈퇴 실패');
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
                            <input onInput={(event) => {
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
                        <input onInput={(e)=>setInputValue(e.target.value)} type='password' />
                        </div>
                        <div className='flex flex-row'>
                        <label>새로운 비밀번호 확인</label>
                        <input onInput={(e)=>setInputValue2(e.target.value) } type='password' />
                        </div>
                    </div>
                    )
      }
      useEffect(()=>{

      },[showPasswordForm])
    const onSubmit=(e)=>{
      e.preventDefault()
      const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if(!passwordRegExp.test(inputValue)){
        alert("비밀번호 형식준수요구")
        return
      }
      handleGoGo();
      if(showPasswordForm&&(inputValue==inputValue2))
        handleGoGo();
      else if(!showPasswordForm&&inputValue)
        handleGoGo();
      // alert("다시 시도 하십시오")
    }
    
    const initServer=
    async()=>{
      try {
        const response=await fetch(`${uri}/api/user/get`,{
          method:'get',
          headers:{
            'Content-Type': 'application/json',
            "Authorization":localStorage.getItem('token'),
            // 'Access-Control-Allow-Origin': '*'
          },
          
        })
        if(response.ok){
          
          const data=await response.json()
          console.log(data,'data')
          // console.log("data.email",data.email,"data.name",data.name)
          setInputEmail(data.email)
          setInputName(data.name)
        }
      } catch (error) {
        
      }
    }
    const  handleGoGo=
    async()=>{
      
      console.log(localStorage.getItem('token'))
      try {
        const response = await fetch(`${uri}/api/user/update`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization':localStorage.getItem('token')
                },
                body: JSON.stringify({ id:localStorage.getItem('token'),
                pwd:inputValue,
                email:inputEmail,
                name:inputName
            }),
              });
          
              if (response.ok) {
                
                                
                                navigate('/Notice')
                // 성공 시 사용자 정보 업데이트 등의 작업 수행
              } else {
                // 실패 시 적절한 처리
                console.error('회원정보수정 실패');
              }
      } catch (error) {
        console.error('1회원정보수정 실패1');
      }
    }
  return (
    <div>
      <TopBar/>
      <div className='pt-16 flex max-w-full w-full h-screen justify-center'>
        <div className='w-52 h-52 '>
        <img className='rounded-full w-52 h-52' src='1.jpg'/></div>
      <div className=' w-1/3 justify-center flex mx-8'>
        <form className='w-full'>
            <div className='flex flex-row'><label>닉네임</label><input onInput={(e)=>setInputName(e.target.value)} type='text' value={inputName}></input></div>
            <button onClick={handlechangeps} className='mb-7 w-auto'>{showPasswordForm ? '취소' : '비밀번호변경'}</button>
            {showPasswordForm ?temp():temp1()}
            <div className='flex flex-row'><label>이메일</label><input onInput={(e)=>setInputEmail(e.target.value)} type='text' value={inputEmail}></input></div>
            <div className='flex flex-row'>
                <button onClick={onSubmit}>수정</button>
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
