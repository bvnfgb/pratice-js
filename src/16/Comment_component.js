import React, { useState, useRef, useEffect } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";

const Comment_component = ({ name, text, seq,  setIsNameClicked,isNameClicked}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const commentInputRef = useRef(null);
  const [thetext, setthetext] = useState(text);
  const [isclicked,setisclick]=useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  
  const uri=process.env.REACT_APP_URI
 const divclicked=()=>{
    setisclick(!isclicked)

 }

 const handleUsernameClick = (seq, e) => {
  
  if (e) {
      setSelectedUser(seq);
      // setUserDetailPosition({ x: e.clientX, y: e.clientY });
      console.log(seq,"seq")
      console.log(selectedUser,"selectedUser")
    }
    
};
  const noteRef = useRef(null);
  
  const handleUpdateClick = () => {
    setIsUpdate(true);
  };
  

  const handleNameClick = () => {
    setIsNameClicked(isNameClicked+1);
    setisclick(!isclicked)
    console.log("isnameclicked",isNameClicked)
    console.log("isclicked",isclicked)
  };
useEffect(()=>{
  console.log(selectedUser,"selecteduser")
},[selectedUser])
  
  const handledelete=async()=>{
   {
      console.log(seq,"seq")
      try {
        const response = await fetch(`${uri}/api/comment/delete/${seq}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            
            'Authorization':localStorage.getItem('token')
          },
        });
  
        if (response.ok) {
         window.location.reload()
          setIsUpdate(false);
         //  setthetext(commentInputRef.current.value);
        } else if(response.status==400){
          alert('외부인')
        }
        else {
          console.error('서버 응답 실패');
        }
      } catch (error) {
        console.error('오류 발생', error);
      }
    };
  }
  const handleserver = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${uri}/api/comment/update/${seq}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
          'Authorization':localStorage.getItem('token')
        },
        body: JSON.stringify({
          content: commentInputRef.current.value,
          name: name,
        }),
      });

      if (response.ok) {
        setIsUpdate(false);
        setthetext(commentInputRef.current.value);
        console.log('내부인')

      } else if(response.status==400){
        console.log('외부인')
        setIsUpdate(false);
          alert('외부인')
      }
      else {
        console.error('서버 응답 실패');
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };
  

 

  

    

    
  useEffect(() => {
    setthetext(text);
  }, [text]);
  
  return (
    <div key={seq} className='flex flex-row justify-between text-left align-top   border-spacing-16 mb-2'>
      {isUpdate ? (
        <div className="flex justify-between w-full">
          <input
            ref={commentInputRef}
            className='h-8'
            style={{ marginBottom: '0px', padding: '0px ', height: '30px' }}
          />
          <div className='flex'>
            <button className='w-12' onClick={handleserver}>
              확인
            </button>
            <button className='w-12' onClick={() => setIsUpdate(false)}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className='w-full flex justify-between'>
          <span className='text-black text-base'>{thetext}</span>
          <div key={seq * -1} className='flex' >
          <div className='mr-2' key={`name-${seq}`} id={`name-${seq}`} onClick={(e) => handleUsernameClick(seq,e)}>
        {name}
      </div>
      {selectedUser && (
        <div className='nameDiv' onClick={divclicked} style={{ position: 'absolute', width: '100px', height: '100px', backgroundColor:'red'}}>
          {/* name에 대한 내용을 보여주는 부분 */}
          {/* 예: <p>{name}에 대한 내용</p> */}

        </div>
      )}
          
     
            
            <button className="edit-button border-none mr-1" onClick={handleUpdateClick}>
            <MdModeEditOutline />
            </button>
            <button className="delete-button border-none" onClick={handledelete}><FaDeleteLeft/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment_component;
