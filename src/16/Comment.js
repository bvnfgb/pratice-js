// Comment.js

import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import Comment_component from './Comment_component';
import { useLocation, useParams } from 'react-router-dom';

const Comment = () => {
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [comments, setComments] = useState([
    { name: 'comment1', text: 'AAAAAAAAAAA' },
    
  ]);

  const temp = comments.map((comment, index) => (
    <Comment_component key={index} name={comment.name} text={comment.content} />
  ));
    const qqww=useParams()
    console.log(qqww.item)

  const largePicturePath = `/${qqww.item}.jpg`;
  const largePicture = (
    <div className='float-left mr-4 flex-grow'>
      <div className='flex justify-center'>
      <img
        src={largePicturePath}
        alt="Large Picture"
        className='w-72 max-h-52 object-fill '
      /></div>
    </div>
  );
   useEffect(()=>{handleserver2()},[])
  const handleserver2 = async () => {
    // 예시: 서버로 로그인 정보를 보내고 응답을 처리
    try {
      const response = await fetch(`http://10.125.121.205:8080/api/comment/${qqww.item}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        const data = await response.json();
        // 로그인 성공 시 사용자 정보 업데이트
        
        console.log("data",data)
        setComments(data)
        
        // 추가로 필요한 작업 수행 (예: 토큰 저장, 다른 상태 업데이트 등)
      } else {
        // 로그인 실패 시 적절한 처리
        console.error('로그인 실패');
      }
    } catch (error) {
      
      console.error('오류 발생', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleAddComment = 
  
     async () => {console.log(newComment.text)
      // 예시: 서버로 로그인 정보를 보내고 응답을 처리
      try {
        const response = await fetch(`http://10.125.121.205:8080/api/comment/add/${qqww.item}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({content:newComment.text})
          ,
        });
        console.log(newComment.text)
        if (response.ok) {
          
          
          // 로그인 성공 시 사용자 정보 업데이트
          // setUser(data.user);
          
          // 추가로 필요한 작업 수행 (예: 토큰 저장, 다른 상태 업데이트 등)
          
        } else {
          // 로그인 실패 시 적절한 처리
          console.error('코멘트 입력 실패');
        }
      } catch (error) {
        console.error('오류 발생', error);
      }
    setComments((prevComments) => [...prevComments, newComment]);
    handleserver2()
    setNewComment({ name: '', text: '' });
    console.log("comments",comments)
  };
  
  return (
    <div className='flex flex-col items-center'>
      <TopBar />
      <div className='pt-16 max-w-full w-2/3 h-screen'> {/* Add padding at the top */}
        <div className='flex items-center w-full h-full'>
          <div className='flex flex-col w-full h-full'>
            {largePicture}
            
            
            {temp}
            <textarea
              name='text'
              placeholder='Add a comment...'
              value={newComment.text}
              onChange={handleInputChange}
              className='mb-2 p-2'
            />
            <button onClick={handleAddComment} className='bg-blue-500 text-white p-2'>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
