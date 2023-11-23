import React, { useState, useEffect } from 'react';
import TempBoard from './TempBoard';

const TempBoard2 = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [showWritingBoard, setShowWritingBoard] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Post List</h2>

      <ul className="list-none p-0">
        {currentPosts.map((post) => (
          <li key={post.id} className="mb-4 bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`bg-blue-500 text-white py-2 px-4 rounded mx-1 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ${
              currentPage === index + 1 ? 'bg-blue-700' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowWritingBoard(!showWritingBoard)}
          className="bg-green-500 text-white py-2 px-4 rounded mx-1 hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
        >
          {showWritingBoard ? 'Hide Writing Board' : 'Show Writing Board'}
        </button>
      </div>

      {/* Overlay with Writing Board */}
      {showWritingBoard && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-lg">
      <button
        className="absolute top-0 right-0 p-4 text-gray-700 hover:text-gray-900"
        onClick={() => setShowWritingBoard(false)}
      >
        Close
      </button>
      <TempBoard onClose={() => setShowWritingBoard(false)} />
    </div>
  </div>
)}
    </div>
  );
};

export default TempBoard2;
