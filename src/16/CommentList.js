import React, { useEffect, useState } from 'react';
import Comment_component from './Comment_component';

const CommentList = ({ comments, itemsPerPage, setCurrentPage, currentPage }) => {
  const [isBold, setIsBold] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);

  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const temp = currentComments.map((comment) => (
    <React.Fragment key={comment.seq}>
      <Comment_component seq={comment.seq} name={comment.memId} text={comment.content} />
      <hr className='mb-2' />
    </React.Fragment>
  ));

  useEffect(() => {
    if (currentPage === -1) {
      setCurrentPage(Math.ceil((comments.length + 1) / itemsPerPage));
      setClickedIndex(Math.ceil((comments.length + 1) / itemsPerPage) - 1);
      setIsBold((prevIsBold) => !prevIsBold);
    }
  }, [currentPage, setCurrentPage, comments.length, itemsPerPage]);

  const handleclick = (index) => {
    setIsBold((prevIsBold) => !prevIsBold);
    setClickedIndex(index);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(comments.length / itemsPerPage);
    const maxButtons = 10;

    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(start + maxButtons - 1, totalPages);

    if (totalPages <= maxButtons) {
      start = 1;
      end = totalPages;
    } else {
      if (currentPage <= Math.floor(maxButtons / 2)) {
        start = 1;
        end = maxButtons;
      } else if (currentPage + Math.floor(maxButtons / 2) >= totalPages) {
        start = totalPages - maxButtons + 1;
        end = totalPages;
      }
    }

    const buttons = [];

    // First page button
    if (currentPage > Math.floor(maxButtons / 2) + 1) {
      buttons.push(
        <a
          key={1}
          className={`m-3 cursor-pointer ${clickedIndex === 0 ? 'font-bold' : ''}`}
          onClick={() => {
            paginate(1);
            handleclick(0);
          }}
        >
          1
        </a>
      );
      if (currentPage > Math.floor(maxButtons / 2) + 2) {
        buttons.push(<span key="ellipsis-start">...</span>);
      }
    }

    // Main buttons
    buttons.push(
      ...Array.from({ length: end - start + 1 }, (_, i) => (
        <a
          key={start + i}
          className={`m-3 cursor-pointer ${clickedIndex === start + i - 1 ? 'font-bold' : ''}`}
          onClick={() => {
            paginate(start + i);
            handleclick(start + i - 1);
          }}
        >
          {start + i}
        </a>
      ))
    );

    // Last page button
    if (currentPage + Math.floor(maxButtons / 2) < totalPages) {
      if (currentPage + Math.floor(maxButtons / 2) < totalPages - 1) {
        buttons.push(<span key="ellipsis-end">...</span>);
      }
      buttons.push(
        <a
          key={totalPages}
          className={`m-3 cursor-pointer ${clickedIndex === totalPages - 1 ? 'font-bold' : ''}`}
          onClick={() => {
            paginate(totalPages);
            handleclick(totalPages - 1);
          }}
        >
          {totalPages}
        </a>
      );
    }

    return buttons;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='h-1/3'>
      {temp}
      {/* Pagination */}
      <div className='flex justify-center'>{renderPaginationButtons()}</div>
    </div>
  );
};

export default CommentList;
