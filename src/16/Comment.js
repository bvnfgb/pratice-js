// Comment.js

import React, { useState } from 'react';
import TopBar from './TopBar';
import Comment_component from './Comment_component';

const Comment = () => {
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [comments, setComments] = useState([
    { name: 'Ha**', text: 'AAAAAAAAAAA' },
    { name: 'Zk**', text: '가나다라' },
    { name: 'bo**', text: 'comment' },
  ]);

  const temp = comments.map((comment, index) => (
    <Comment_component key={index} name={comment.name} text={comment.text} />
  ));

  const largePicturePath = "/test-1.jfif";
  const largePicture = (
    <div className='float-left mr-4 flex-grow'>
      <img
        src={largePicturePath}
        alt="Large Picture"
        className='w-full max-h-52 object-fill'
      />
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleAddComment = () => {
    setComments((prevComments) => [...prevComments, newComment]);
    setNewComment({ name: '', text: '' });
  };

  return (
    <div className='flex flex-col items-center'>
      <TopBar />
      <div className='pt-16 max-w-full w-2/3 '> {/* Add padding at the top */}
        <div className='flex items-center w-full'>
          <div className='flex flex-col w-full'>
            {largePicture}
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
            {temp}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
