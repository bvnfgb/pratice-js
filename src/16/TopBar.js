// TopBar.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalBasic from './ModalBasic';


const TopBar = () => {
  const navigate=useNavigate();
  const handleMap=()=>{
    navigate('/MapKakao',{
      state:{
        addr:'부산대학로63번길 2'
      }
    })
  }
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, []);
  
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
      console.log("클릭")
  };
  
  
  
  const handlelogout=()=>{
    setUser(null)
    localStorage.clear ()
  }
 
  return (
    <div className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/Notice" className="text-xl font-semibold">Your Logo</Link>
        <label className="cursor-pointer font-semibold m-0" onClick={handleMap}>지도 바로가기</label>

        <div className="flex space-x-4 font-semibold">
        {user ? (
  <>
    <label className='font-semibold m-0'>{user}님 반갑습니다</label>
    <a onClick={handlelogout} className='font-semibold'>Logout</a>
    <Link to="/mypage">mypage</Link>
    <a onClick={showModal} className='font-semibold'>쪽지</a>
    {modalOpen &&<ModalBasic setModalOpen={setModalOpen} />}

  </>
) : (
  <>
    <Link to="/login"  className="hover:text-gray-400 font-semibold">Login</Link>
    <Link to="/signup" className="hover:text-gray-400 font-semibold">Sign Up</Link>
  </>
)}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
