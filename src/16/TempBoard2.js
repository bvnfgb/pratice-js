import React, { useState, useEffect } from 'react';
import TempBoard from './TempBoard';
import TopBar from './TopBar';



const TempBoard2 = () => {
  const uri=process.env.REACT_APP_URI
  const [current_state1,setCurrent_state1]=useState(1)
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [showWritingBoard, setShowWritingBoard] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
useEffect(()=>{
  if(current_state1==1)
    setSelectedPost(null)
},[current_state1])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${uri}/api/party/`);
        if (response.ok) {
          const data = await response.json();
        //  const data1= data.map((_,idx)=>{
            
        //  })
        
        console.log(data,'tempdata')
          setPosts(data.reverse());

        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error while fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowWritingBoard(true);
  };
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (<>
    <TopBar></TopBar>
    <div className="max-w-2xl mx-auto" style={{marginTop:'76.26px'}}>
      <h2 className="text-2xl font-bold mb-4  pt-2 ">파티모집</h2>

      <ul className="list-none p-0">
      {currentPosts.map((post) => (
  <li
    key={post.id}
    className="mb-4 bg-white p-4 rounded shadow-md cursor-pointer list-none"
    onClick={() => { setCurrent_state1(2);handlePostClick(post,current_state1)}}
  >
            <div className='flex flex-row justify-between'>
            <h3 className="text-lg font-bold mb-2">{'['}{post.category}{']'}{post.title}</h3>
            <h4> {post.memId}</h4>
            <input type='hidden' value={post.seq}/>
            </div>
            <p className="text-gray-700">{post.content}</p>
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
          onClick={() => {setCurrent_state1(1);setShowWritingBoard(!showWritingBoard) }}
          className="bg-green-500 text-white py-2 px-4 rounded mx-1 hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
        >
          {showWritingBoard ? 'Hide Writing Board' : '글쓰기'}
        </button>
      </div>

      {/* Overlay with Writing Board */}
      {showWritingBoard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2" >
            <button
              className="absolute top-0 right-0 p-4 text-gray-700 hover:text-gray-900"
              onClick={() => {
                setSelectedPost(null);
                
                setShowWritingBoard(false);
              }}
            >
              Close
            </button>
            <TempBoard setCurrent_state1={setCurrent_state1} current_state1={current_state1} selectedPost={selectedPost}  onClose={() => setShowWritingBoard(false)} />
          </div>
        </div>
      )}
    </div>
    </>);
};

export default TempBoard2;
