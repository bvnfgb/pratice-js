// TopBar.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // localStorage.setItem('user', 'user@pusan.ac.kr');
    // localStorage.setItem('pwd', 'test');
    setUser(localStorage.getItem('user'));
  }, []);
  const handlelogout=()=>{
    setUser(null)
    localStorage.clear ()
  }
  return (
    <div className="bg-gray-800 text-white p-4 fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">Your Logo</Link>

        <div className="flex space-x-4">
        {user ? (
  <>
    <label>{user}님 반갑습니다</label>
    <a onClick={handlelogout}>Logout</a>
    <Link to="/mypage">mypage</Link>
    <Link to="/note">쪽지</Link>
  </>
) : (
  <>
    <Link to="/login" className="hover:text-gray-400">Login</Link>
    <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
  </>
)}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
