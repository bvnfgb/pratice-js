import React, { useEffect, useRef, useState } from 'react';

// ... (other imports and components)

// ... (other imports and components)
import { jwtDecode } from "jwt-decode";
const TempBoard = ({ onClose, selectedPost, current_state1, setCurrent_state1 }) => {
  const uri=process.env.REACT_APP_URI
  const [postContent, setPostContent] = useState(selectedPost?.content || '');
  const [imageUrl, setImageUrl] = useState(selectedPost?.title || '');
  const [selectedCategory, setSelectedCategory] = useState(selectedPost?.category || '');
  const [seq,setSeq]=useState(selectedPost?.seq||'')
// current_state로  동일한 컴포넌트에 대해 다른역할을 맡긴다. 1= 포스트등록. 2=포스트 수정 1. 3=포스트 수정 2
  useEffect(() => {
    setSelectedCategory(selectedPost?.category || '');
    setPostContent(selectedPost?.content || '');
    setImageUrl(selectedPost?.title || '');
    setSeq(selectedPost?.seq||'')
  }, [selectedPost]);

  const selected_op = useRef();

  const handleserver = async () => {
    try {
      const response = await fetch(`${uri}/api/party/add`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.getItem('token')
        },
        body: JSON.stringify({
          memId: jwtDecode(localStorage.getItem('token')).username,
          content: postContent,
          title: imageUrl,
          category: selected_op.current.value,
        }),
      });
      if (response.ok) {
        const data=await response.json()
        console.log(data,"adddata")
        window.location.reload();

      } else {
        console.error(' 실패2');
      }
    } catch (error) {
      console.error('오류 발생2', error);
    }
  };
  const handleserver2 = async () => {
    if(localStorage.getItem('token')==null)
     {
      alert('외부인')
      onClose()
     } 
    try {
      const response = await fetch(`${uri}/api/party/update/${seq}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
            'Authorization':localStorage.getItem('token')
        },
        body: JSON.stringify({
          memId: jwtDecode(localStorage.getItem('token')).username,
          content: postContent,
          title: imageUrl,
          category: selected_op.current.value,
        }),
      });
      if (response.ok) {
        
        window.location.reload();

      }else if(response.status==400){
        alert('외부인')
        setCurrent_state1(1)
        onClose()
      }
       else {
        console.error(' 실패3');
      }
    } catch (error) {
      console.error('오류 발생3', error);
    }
  };

  const handleModify = (e) => {
    e.preventDefault()
    setCurrent_state1(3);
  };

  const handleDelete = async() => {
    // Reset state or perform any other cancel logic
    try {
        
      const response = await fetch(`${uri}/api/party/delete/${seq}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          
            'Authorization':localStorage.getItem('token')
        },
        
        body: JSON.stringify({
          // content:newComment.text,
        memId:localStorage.getItem('user'),
          
    })
        ,
      });

      
      if (response.ok) {
        
        // 로그인 성공 시 사용자 정보 업데이트
        // setUser(data.user);
        window.location.reload()
        // 추가로 필요한 작업 수행 (예: 토큰 저장, 다른 상태 업데이트 등)
        
      }else if(response.status==400||403){
        alert('외부인')
        onClose()
      } 
      else {
        // 로그인 실패 시 적절한 처리

        console.error('코멘트 입력 실패');
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
    // window.location.reload()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(localStorage.getItem('token')==null){
      alert('외부인')
      onClose()
      return
    }

    handleserver();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
            제목
          </label>
          {current_state1 === 1 ? (
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onInput={(e) => setImageUrl(e.target.value)}
              className="w-full border p-2"
            />
          ) : current_state1 === 2 ? (
            <div className="w-full border p-2 ">{imageUrl}</div>
          ) : (
            /* Handle state 3 specific content or display nothing for other states */
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onInput={(e) => setImageUrl(e.target.value)}
              className="w-full border p-2"
            />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">
            내용
          </label>
          {current_state1 === 1 ? (
            <textarea
              id="postContent"
              name="postContent"
              value={postContent}
              onInput={(e) => setPostContent(e.target.value)}
              className="w-full h-32 border p-2"
              required
            />
          ) : current_state1 === 2 ? (
            <div className="w-full h-32 border p-2">{postContent}</div>
          ) : (
            /* Handle state 3 specific content or display nothing for other states */
            <textarea
              id="postContent"
              name="postContent"
              value={postContent}
              onInput={(e) => setPostContent(e.target.value)}
              className="w-full h-32 border p-2"

              required
            />
            
          )}
        </div>

        

        <div className="">
          <label htmlFor="cat" className='text-gray-700 text-sm font-bold'>카테고리</label>
          {current_state1 === 1 ? (
            <select
              ref={selected_op}
              name="cat"
              id="cat"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border p-2"
            >
              {[
                '롤',
                'FC온라인',
                '발로란트',
                '로아',
                '서든어택',
                '오버워치',
                '메이플',
                '배그',
                '스타',
                '던파',
              ].map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : current_state1 === 2 ? (
            <div className="w-full border p-2">{selectedCategory}</div>
          ) : (
            /* Handle state 3 specific content or display nothing for other states */
            
            <select
              ref={selected_op}
              name="cat"
              id="cat"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border p-2"
              selected={selectedCategory}
            >
              {[
                '롤',
                'FC온라인',
                '발로란트',
                '로아',
                '서든어택',
                '오버워치',
                '메이플',
                '배그',
                '스타',
                '던파',
              ].map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-between items-center">
          {current_state1 === 1 ? (
            <>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                입력
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                닫기
              </button>
              
            </>
          ) : current_state1 === 2 ? (
            <>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
                onClick={handleModify}
              >
                수정
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                닫기
              </button>
            </>
          ) : current_state1 === 3 ? (
            /* Handle state 3 specific buttons or display nothing for other states */
            <>
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
                onClick={()=>handleserver2()}
              >
                확인
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow"
              >
                삭제
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                닫기
              </button>
            </>
          ) :( <></>)
        }
        </div>
      </form>
    </div>
  );
};

export default TempBoard;
