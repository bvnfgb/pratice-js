import React, { useEffect, useRef, useState } from 'react';

// ... (other imports and components)

// ... (other imports and components)

const TempBoard = ({ onClose, selectedPost, current_state1, setCurrent_state1 }) => {
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
      const response = await fetch('http://10.125.121.205:8080/api/party/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memId: localStorage.getItem('user'),
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
    try {
      const response = await fetch(`http://10.125.121.205:8080/api/party/update/${seq}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memId: localStorage.getItem('user'),
          content: postContent,
          title: imageUrl,
          category: selected_op.current.value,
        }),
      });
      if (response.ok) {
        
        window.location.reload();

      } else {
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
        
      const response = await fetch(`http://10.125.121.205:8080/api/party/delete/${seq}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
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
        
      } else {
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

    handleserver();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">
            Post Content
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

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
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
            <div className="w-full border p-2">{imageUrl}</div>
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

        <div className="">
          <label htmlFor="cat">Category</label>
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
                'lol',
                'fifa',
                'valo',
                'lostark',
                'sudden',
                'over',
                'maple',
                'battle',
                'starc',
                'dungeon',
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
                'lol',
                'fifa',
                'valo',
                'lostark',
                'sudden',
                'over',
                'maple',
                'battle',
                'starc',
                'dungeon',
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
                Submit
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Close
              </button>
              
            </>
          ) : current_state1 === 2 ? (
            <>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
                onClick={handleModify}
              >
                modify
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Close
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
                Submit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow"
              >
                delete
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Close
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
