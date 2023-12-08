// Comment.js

import React, { useEffect, useRef, useState } from 'react';
import TopBar from './TopBar';
import Comment_component from './Comment_component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import CommentList from './CommentList';
import TempBoard from './TempBoard';
const Comment = () => {
  const uri=process.env.REACT_APP_URI
  const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set the number of items per page here
  const [gameinfo,setGameinfo]=useState()
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [comments, setComments] = useState([]);
  const [displayedParty,setDisplayedparty]=useState(null)
  const [hide1,sethide1]=useState(true)
  const [current_state1,setCurrent_state1]=useState(1)
  const [selectedPost, setSelectedPost] = useState(null);
  const [showWritingBoard, setShowWritingBoard] = useState(false);
  const [seq,setseq]=useState(null)
  const [currentPage1, setCurrentPage1] = useState(1);
  // const handleSetComment = (text) => {
  //   setComments(text)
  // } 
  const postseq= useRef()
  const handlePartyM=()=>{
    navigate('/TempBoard2')
  }
  useEffect(()=>{
    console.log(current_state1,'스텟')
  },[showWritingBoard])
  const hancleshow=()=>{
    // console.log(postseq.current.value,'showitem')
    // console.log(displayedParty,"hancleshow");
    displayedParty.map((item)=>{
      console.log(showWritingBoard,'쇼',item.seq,seq)
      
        if(item.seq==seq){
          console.log(item,'abc')
          setSelectedPost(item)
          
    setShowWritingBoard(true);
    setCurrent_state1(2)
        }
        // console.log(item,'item1')
          
       
    })
    
  }
  const hancleseq=(se)=>{
    console.log(se,'se')
    setseq(se)
  }
  useEffect(()=>{
    console.log(seq,'123')
    if(displayedParty!=null)
      hancleshow()
  },[seq])
  const handleinfo=()=>{
    sethide1(!hide1)
  }
  const [isNameClicked, setIsNameClicked] = useState(0);
  const temp = comments.map((comment) => {
    // console.log(comment.seq);

    return <><Comment_component seq={comment.seq} name={comment.memId} text={comment.content}   isNameClicked={isNameClicked} setIsNameClicked={setIsNameClicked}/><hr className='mb-2'></hr></>;
  });
    const qqww=useParams()
    console.log(qqww.item)

  const largePicturePath = `/${qqww.item}.jpg`;
  
  const largePicture = (
    
      <div className=' col-span-2 gap-0  text text-center flex w-full'>
        
      <img
        src={largePicturePath}
        alt="Large Picture"
        className=' inline-flex'
        
        
      />
      <section className='bg-white  p-0 m-0 w-full' >
    <table className='m-0'>
      <thead >
        <tr >
          <th colSpan='2' className='border-none font-bold p-0 py-3 pl-3 w-full'>
            게임정보
          </th>
          <th><button onClick={handleinfo}></button></th>
        </tr>
      </thead>
      <tbody>
      
      {gameinfo && hide1&&
            gameinfo.map((game, index) => (
              game.seq == qqww.item && (
                <><tr key={index}>

                  <td  className='border-none px-2'>이름</td><td> {game.name}</td>
                  </tr>
                  <tr>
                  <td className='border-none px-2'>제작 </td><td>{game.producer}</td></tr>
                  <tr>
                  <td className='border-none px-2'>배급 </td><td>{game.distributor.length>8?game.distributor.slice(0,8)+'...':game.distributor}</td></tr>
                  <tr>
                  <td className='border-none px-2'>출시 </td><td>{game.openDate}</td></tr>
                  {/* Add more columns as needed */}
                  <tr>
                    <td className='border-none px-2'>장르 </td><td>{game.genre.length>8? game.genre.slice(0,8)+'...':game.genre}</td>
                  </tr>
                </>
              )
            ))}
      </tbody>
    </table>
  </section>
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
  const category={1:'롤',
  2:'FC온라인',
  3:'발로란트',
  4:'로아',
  5:'서든어택',
  6:'오버워치',
  7:'메이플',
  8:'배그',
  9:'스타',
  10:'던파',}
  const maxLengthToShow = 4; //party = ['data1111111111111111111111111111111', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];

  const party=async () => {
    try {
      const response = await fetch(`${uri}/api/party/`);
      if (response.ok) {
        const data = await response.json();
        console.log(data,'data')
        const data1=data.reverse()
        setDisplayedparty((prevDisplayedParty) => {
          const filteredData = data1.filter((item) => item.category === category[qqww.item]);
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
      console.log(displayedParty)
      setSection(
        displayedParty.map((item, idx) => {
           {
            console.log(item.seq,'item.seq')
            return (
              <tr >
                
                <td  value={item.seq} ref={postseq} onClick={()=>{hancleshow();hancleseq(item.seq)}} className='border-none'>{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</td>
                <td className='text-right border-none'>{item.memId.length > 20 ? item.memId.slice(0, 20) + '...' : item.memId}</td>
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
    // if(newComment=='')
    
    // return;
     async () => {console.log(newComment.text,"add_on_comment",newComment.text.length)
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
      <div className='pt-16 flex justify-center max-w-full w-full h-screen' style={{paddingTop:'76.25px'}}> {/* Add padding at the top */}
        <div className='flex justify-center max-w-full items-center w-full h-full mt-2'>
         
            <div className='  bg-white max-h-full h-full pt-0 border-solid border-white rounded-lg border-2 overflow-hidden'  style={{flexBasis:'50%'}}>
            {largePicture}
            
            <div className=' col-span-2 h-full max-h-full row-span-6 m-0 p-0'>
              <div className='mt-1' style={{height:'45%'}}>
                <CommentList setCurrentPage={setCurrentPage1} currentPage={currentPage1} comments={comments} itemsPerPage={6}></CommentList>
            {/* {temp}</div> */}</div>
            <div >
            <textarea
              name='text'
              placeholder='내용 입력하세요'
              value={newComment.text}
              onChange={handleInputChange}
              className='mb-2 p-2 '
            />
            
            <button onClick={() => { handleAddComment(); setCurrentPage1(-1); }} className='bg-blue-500 text-white p-2'>
              글 등록하기
            </button></div>
            </div>
            </div>
        <div className='basis-1/6 max-h-full h-full'>
            <div className='   ml-2  flex flex-col justify-start border-solid border-white rounded-lg border-2 overflow-hidden'>
            <section className='bg-white m-0  '>
      <table className='m-0 p-0 table-fixed'>
        <thead>
          
            <tr>
            
            <th colSpan='2'>
              <div className='flex w-full  justify-between items-center'>
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
                <div  className='m-0 pr-2 relative'><img  className='' src={item.imgUrl} alt={item.title} referrerPolicy="no-referrer" /></div>
              </td>
              <td className='m-0 p-0'>
                
                <div className='font-bold'><a href={item.hyperLink}>{item.title.slice(0,15)+'...'}</a></div>
                <div className='text-xs'>{item.summary.slice(0, 15)+"..."}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </section>
 
  <section className='bg-white  p-0 m-0'>
    <table className=' m-0 '>
      <thead>
        <tr className='border-b-0'>
          <th colSpan='2' className='border-none'><div  className='flex justify-between w-full items-center  
          border-none'><div className='font-bold'>파티모집</div><div className='text-xs '><button onClick={handlePartyM} className='border-none'>MORE</button></div></div></th>
          {showWritingBoard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <button
              className="absolute top-0 right-0 p-4 text-gray-700 hover:text-gray-900"
              onClick={() => {
                setSelectedPost(null);
                
                setShowWritingBoard(false);
              }}
            >
              Close
            </button>
            <TempBoard setCurrent_state1={setCurrent_state1} current_state1={current_state1} selectedPost={selectedPost}  onClose={() => {setShowWritingBoard(false);setseq(null)}} />
          </div>
        </div>
      )}
        </tr>
      </thead>
      <tbody >
        {section === null ? 'loading' : section}
      </tbody>
    </table>
    {isDataTruncated}
  </section>
  
</div></div>
          </div>
        
      </div>
    </div>
  );
}

export default Comment;
