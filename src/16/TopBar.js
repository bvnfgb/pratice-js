// TopBar.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalBasic from './ModalBasic';
import { jwtDecode } from "jwt-decode";

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
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      // Assuming the user ID is stored in the 'sub' claim
      // const userId = decodedToken.sub;
      setUser(decodedToken.username)

      // Set the user ID in the state
      // setUser(userId);
    }
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
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/Notice" className="text-xl font-semibold hover:text-gray-400" >Game Top10</Link>
        <a 
        className="cursor-pointer font-semibold m-0  hover:text-gray-400" onClick={handleMap}>주변 PC방 찾기</a>

        <div className="flex space-x-4 font-semibold">
        {user ? (
  <>
    <label className='font-semibold m-0'>{user}님 반갑습니다</label>
    <a onClick={handlelogout} className='font-semibold hover:text-gray-400' >Logout</a>
    <Link to="/mypage" className='hover:text-gray-400'>mypage</Link>
    <a onClick={showModal} className='font-semibold hover:text-gray-400' >쪽지</a>
    {modalOpen &&<ModalBasic setModalOpen={setModalOpen} />}

  </>
) : (
  <>
    <Link to="/login"  className="hover:text-gray-400 font-semibold" >Login</Link>
    <Link to="/signup" className="hover:text-gray-400 font-semibold" >Sign Up</Link>
  </>
)}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
