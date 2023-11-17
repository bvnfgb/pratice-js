import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.setItem('user', 'user@pusan.ac.kr');
    // localStorage.setItem('pwd', 'test');
    // setUser(localStorage.getItem('user'));
  }, []);

  const handleLogin = async (username, password) => {
    // 예시: 서버로 로그인 정보를 보내고 응답을 처리
    try {
      const response = await fetch('http://10.125.121.205:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id:username, pwd:password }),
      });

      if (response.ok) {
        
        const data = await response.json();
        // 로그인 성공 시 사용자 정보 업데이트
        setUser(data.user);
        console.log(data)
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

  return (
    <main className='container'>
      {user ? (
        <LoginForm onLogin={handleLogin} setUser={setUser}/>
      ) : (
        <LoginForm onLogin={handleLogin} setUser={setUser}/>
      )}
    </main>
  );
};

export default Login;
