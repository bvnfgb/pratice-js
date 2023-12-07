import React, { useEffect, useState } from 'react';
import Comment_component from './Comment_component';

const CommentList = ({ comments, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isBold, setIsBold] = useState(false);
  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const temp = currentComments.map((comment) => (
    <React.Fragment key={comment.seq}>
      <Comment_component
        seq={comment.seq}
        name={comment.memId}
        text={comment.content}
      />
      <hr className='mb-2' />
    </React.Fragment>
  ));

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  

  
  const [clickedIndex, setClickedIndex] = useState(0);

  const handleclick = (index) => {
    // Toggle the boldness state
    setIsBold((prevIsBold) => !prevIsBold);

    // Log the clicked index
    console.log('Clicked index:', index);
    
    // Set the clicked index to state
    setClickedIndex(index);
  };
  useEffect(()=>{console.log(isBold)},[isBold])
  return (
    <div className='h-1/3'>
      {temp}
      {/* Pagination */}
      <div className='flex justify-center'>
      {Array.from({ length: Math.ceil(comments.length / itemsPerPage) }, (_, i) => (
        <a
          key={i + 1}
          className={`m-3 cursor-pointer ${  clickedIndex === i ? 'font-bold' : ''}`}
          onClick={() => {
            paginate(i + 1);
            handleclick(i);
          }}
        >
          {i + 1}
        </a>
      ))}
    </div>
    </div>
  );
};

export default CommentList;
