import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const uri=process.env.REACT_APP_URI
  useEffect(() => {
    // localStorage.setItem('user', 'user@pusan.ac.kr');
    // localStorage.setItem('pwd', 'test');
    setUser(localStorage.getItem('token'));
  }, []);
  
  const handleLogin = async (username, password) => {
    // 예시: 서버로 로그인 정보를 보내고 응답을 처리
    setLoading(true);
    try {
      const response = await fetch(`${uri}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id:username, pwd:password }),
      });

      if (response.ok) {
        const token = response.headers.get('Authorization')
        
        // response.headers.forEach(console.log)
        // console.log('json',response.json())
    // 로그인 성공 시 사용자 정보 업데이트
    // setUser(data.user);
    // console.log('토큰:', token);
        // const data = await response.json();
        // 로그인 성공 시 사용자 정보 업데이트
        setUser(token);
        // console.log(data.token,'data.token')
        localStorage.setItem('token', token);
        // const token = response.headers.get('Authorization');
        // console.log('토큰:', token);
        // console.log("헤더",response.headers)
        // 추가로 필요한 작업 수행 (예: 토큰 저장, 다른 상태 업데이트 등)
        navigate('/Notice'); // 로그인 성공 후 이동할 페이지
      } else {
        // 로그인 실패 시 적절한 처리
        console.error('로그인 실패');
        localStorage.clear()
        setUser(null)
        
      }
    } catch (error) {
      console.error('오류 발생', error);
      localStorage.clear()
      setUser(null)
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <main className='container'>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        navigate('/Notice')
      ) : (
        <LoginForm onLogin={handleLogin} setUser={setUser}  />
      )}
    </main>
  );
};

export default Login;
