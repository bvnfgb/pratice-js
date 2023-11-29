import React, { useState, useRef, useEffect } from 'react';

const Comment_component = ({ name, text, seq }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const commentInputRef = useRef(null);
  const [thetext, setthetext] = useState(text);

  const handleUpdateClick = () => {
    setIsUpdate(true);
  };
  const handledelete=async()=>{
   {
      console.log(seq,"seq")
      try {
        const response = await fetch(`http://10.125.121.205:8080/api/comment/delete/${seq}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
         window.location.reload()
          setIsUpdate(false);
         //  setthetext(commentInputRef.current.value);
        } else {
          console.error('서버 응답 실패');
        }
      } catch (error) {
        console.error('오류 발생', error);
      }
    };
  }
  const handleserver = async () => {
    try {
      const response = await fetch(`http://10.125.121.205:8080/api/comment/update/${seq}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentInputRef.current.value,
          name: name,
        }),
      });

      if (response.ok) {
        setIsUpdate(false);
        setthetext(commentInputRef.current.value);
      } else {
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
    <div key={seq} className='flex flex-row justify-between text-left align-top border-2 border-red-400 border-spacing-16'>
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
            {name}
            <button className="edit-button" onClick={handleUpdateClick}>
              수정
            </button>
            <button className="delete-button" onClick={handledelete}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment_component;
