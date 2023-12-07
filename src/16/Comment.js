// Comment.js

import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import Comment_component from './Comment_component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const Comment = () => {
  const uri=process.env.REACT_APP_URI
  const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set the number of items per page here
  const [gameinfo,setGameinfo]=useState()
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [comments, setComments] = useState([]);
  const [displayedParty,setDisplayedparty]=useState(null)
  // const handleSetComment = (text) => {
  //   setComments(text)
  // } 
  const handlePartyM=()=>{
    navigate('/TempBoard2')
  }
  
  const [isNameClicked, setIsNameClicked] = useState(0);
  const temp = comments.map((comment) => {
    console.log(comment.seq);
    return <><Comment_component seq={comment.seq} name={comment.memId} text={comment.content}   isNameClicked={isNameClicked} setIsNameClicked={setIsNameClicked}/><hr className='mb-2'></hr></>;
  });
    const qqww=useParams()
    console.log(qqww.item)

  const largePicturePath = `/${qqww.item}.jpg`;
  
  const largePicture = (
    
      <div className=' col-span-2 gap-0  text text-center grid-rows-1'>
        
      <img
        src={largePicturePath}
        alt="Large Picture"
        className=' inline-flex'
        
        
      />
    </div>
  );
   useEffect(()=>{handleserver2()
  getgameinfo()
  },[])
  const handleserver2 = async () => {
    // 예시: 서버로 로그인 정보를 보내고 응답을 처리
    try {
      const response = await fetch(`${uri}/api/comment/get/${qqww.item}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        
        const data = await response.json();
        // 로그인 성공 시 사용자 정보 업데이트
        
        console.log("comment",data)
        if (data!=null)
          setComments(data)
        
        // 추가로 필요한 작업 수행 (예: 토큰 저장, 다른 상태 업데이트 등)
      } else {
        // 로그인 실패 시 적절한 처리
        console.error('코멘트 불러오기 실패');
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
  const category={1:'lol',2:'fifa',3:'valo',4:'lostark'
,5:'sudden',6:'over',7:'maple',8:'battle',9:'starc',10:'dungeon'}
  const maxLengthToShow = 4; //party = ['data1111111111111111111111111111111', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];

  const party=async () => {
    try {
      const response = await fetch(`${uri}/api/party/`);
      if (response.ok) {
        const data = await response.json();
        console.log(data,'data')

        setDisplayedparty((prevDisplayedParty) => {
          const filteredData = data.filter((item) => item.category === category[qqww.item]);
          const truncatedData = filteredData.slice(0, maxLengthToShow);
          return truncatedData;
        });
        
        
        
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error while fetching posts', error);
    }
  };
  useEffect(() => {
    if (displayedParty !== null) {
      setSection(
        displayedParty.map((item, idx) => {
           {
            return (
              <tr key={idx}>
                <td>{idx}</td>
                <td>{item.content.length > 20 ? item.content.slice(0, 20) + '...' : item.content}</td>
              </tr>
            );
          }
          return null; // You might want to handle the case where the category doesn't match
        })
      );
      
      
    } else {
      // Handle the case where displayedParty is null
      setSection(
        <tr>
          <td>정보없음</td>
        </tr>
      );
    }
  }, [displayedParty]);
  
  useEffect(()=>{
    party()
  },[])
  // const displayedParty = party.slice(0, maxLengthToShow);
  const [section, setSection] = useState(
    displayedParty
      ? displayedParty.map((item, idx) => (
          <tr key={idx}>
            <td>{idx}</td>
            <td>{item.length > 20 ? item.slice(0, 20) + '...' : item}</td>
          </tr>
        ))
      : null
  );
       
  


const isDataTruncated = party.length > maxLengthToShow;
  
const getgameinfo=
async()=>{
  try {
    const response=await fetch(`${uri}/api/game/detail`,{
      method:'get',
      headers:{
        'Content-Type': 'application/json',
      },
      
    })
    if(response.ok){
      const data= await response.json()
      console.log("data",data)
      setGameinfo(data)
      console.log('Game Info:', gameinfo);
      console.log('Item ID:', qqww.item);
    }

  } catch (error) {
    console.log(error)
  }
}
const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${uri}/api/news/`);
        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
        } else {
          console.error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error occurred', error);
      }
    };

    fetchData();
  }, []);



  const handleAddComment = 
  
     async () => {console.log(newComment.text,"add_on_comment")
      // 예시: 서버로 로그인 정보를 보내고 응답을 처리
      try {
        
        const response = await fetch(`${uri}/api/comment/add/${qqww.item}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':localStorage.getItem('token')
          },
          
          body: JSON.stringify({content:newComment.text,
          memId:jwtDecode(localStorage.getItem('token')).username,
        boardId:qqww.item})
          ,
        });

        console.log('요청 페이로드:', JSON.stringify({ content: newComment.text }));
        console.log('응답 상태:', response.status);
        console.log(newComment.text)
        if (response.ok) {
          
          // 로그인 성공 시 사용자 정보 업데이트
          // setUser(data.user);
          // window.location.reload()
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
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNewsData = newsData.slice(startIndex, endIndex);
  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <TopBar />
      <div className='pt-16 max-w-full w-2/3 h-screen'> {/* Add padding at the top */}
        <div className='grid grid-cols-4 gap-0 items-center w-full h-full'>
         
            <div className='col-span-3  max-h-full h-full pt-0 grid gap-0 grid-cols-2 grid-rows-6'>
            {largePicture}
            <div className=' col-span-2 h-full max-h-full row-span-6 m-0 p-0'>
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
        <div className='grid grid-rows-2 gap-0'>
            <div className='     '>
  <section className='bg-green-300 h-auto p-0 m-0 '>
    <table className='m-0'>
      <thead>
        <tr>
          <th>
            게임정보
          </th>
        </tr>
      </thead>
      <tbody>
      
      {gameinfo &&
            gameinfo.map((game, index) => (
              game.seq == qqww.item && (
                <><tr key={index}>

                  <td>이름: {game.name}</td>
                  </tr>
                  <tr>
                  <td>제작사: {game.producer}</td></tr>
                  <tr>
                  <td>배급사: {game.distributor}</td></tr>
                  <tr>
                  <td>출시일: {game.openDate}</td></tr>
                  {/* Add more columns as needed */}
                  <tr>
                    <td>장르: {game.genre}</td>
                  </tr>
                </>
              )
            ))}
      </tbody>
    </table>
  </section>
  <section className='bg-blue-400 h-auto p-0 m-0'>
    <table className='border-solid m-0'>
      <thead>
        <tr>
          <th colSpan='2'><div className='flex justify-between w-full items-center'><div className=''>파티모집</div><div className='text-xs '><button onClick={handlePartyM} className='border-none'>MORE</button></div></div></th>
          
        </tr>
      </thead>
      <tbody>
        {section === null ? 'loading' : section}
      </tbody>
    </table>
    {isDataTruncated}
  </section>
  <section>
      <table className='m-0 p-0'>
        <thead>
          
            <tr>
            
            <th colSpan='2'>
              <div className='flex w-full justify-between items-center'>
              뉴스
              <div className='flex flex-'>
        <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}>
        {'<'}
        </button>
        
        <button onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}>
          {'>'}
        </button>
      </div></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentNewsData.map((item, index) => (
            <tr key={index} >
              <td className='m-0 p-0'>
                <div className='m-0 pr-2'><img src={item.imgUrl} alt={item.title} referrerPolicy="no-referrer" /></div>
              </td>
              <td className='m-0 p-0'>
                
                <div className='font-bold'><a href={item.hyperLink}>{item.title}</a></div>
                <div>{item.summary.slice(0, 20)+"..."}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </section>
</div></div>
          </div>
        
      </div>
    </div>
  );
}

export default Comment;
