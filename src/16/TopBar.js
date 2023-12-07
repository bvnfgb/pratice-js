// TopBar.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalBasic from './ModalBasic';
import { jwtDecode } from "jwt-decode";

const TopBar = () => {
  const [isuserclick,setisuserclick]=useState(false)
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
    <div className=" bg-black flex text-white p-4 fixed w-full top-0 z-10" style={{height:'76.25px'}}>
      <div className="mt-0 container mx-auto flex justify-between items-center">
        <Link to="/Notice" className="text-xl font-semibold " ><div className=' inline-flex flex-col items-center'><div className='text-2xl'>Commentorium</div> <div className='ml-1 text-xs'>No.1 GameCommunity</div></div></Link>
       
        <a 
        className="cursor-pointer font-semibold m-0  hover:text-gray-400" onClick={handleMap}>주변 PC방 찾기</a>

        <div className="flex space-x-4 font-semibold relative">
        {user  ? (
  <>
    <label onClick={()=>setisuserclick(!isuserclick)} className='font-semibold m-0 cursor-pointer'>{user}님, 반갑습니다</label>
    {isuserclick &&
    (<>
    <div className=' absolute border-solid border-4 flex flex-col mt-1 top-full right-0 px-2'><a onClick={handlelogout} className='font-semibold hover:text-gray-400 mt-1 mb-2' >Logout</a>
    <Link to="/mypage" className='hover:text-gray-400 mb-2'>mypage</Link>
    <a onClick={showModal} className='font-semibold mb-1 hover:text-gray-400' >쪽지</a></div>
    {modalOpen &&<ModalBasic setModalOpen={setModalOpen} />}</>)}

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
