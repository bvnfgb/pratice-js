import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bigmodal from "./Bigmodal";

function ModalBasic({ setModalOpen, id, title, content, writer }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  const uri=process.env.REACT_APP_URI
  const [bigmodalOpen, setbigModalOpen] = useState(false);
  const [aContent,setaContent]=useState()
  const [aSend,setaSend]=useState()
  
  function showBigModal(content,send){
    setaContent(content)
    setaSend(send)
    setbigModalOpen(true);
    console.log("클릭빅")
    
  }
  const [notes, setNotes] = useState([]);
  const [srstate,setState]=useState(1)//1:받은 2:보낸
  useEffect(() => {
    note();
  }, []);
  const [send1, setsend1] = useState(
    <>
      <a onClick={() => setState(1)} className="text-black">
        보낸
      </a>
      <a onClick={() => setState(-1)} className="text-black">
        받은
      </a>
    </>
  );
  
  
  useEffect(() => {
    console.log(srstate, "srstate");
    setsend1(
      <>
        <a  onClick={() => setState(1)} className={srstate === 1 ? "text-black underline m-1" : "text-black m-1"}>
          보낸/미구현
        </a>
        
        <a onClick={() => setState(-1)} className={srstate === -1 ? "text-black underline" : "text-black"}>
          받은/미구현
        </a>
      </>
    );
  }, [srstate]);
  
  const note = async () => {
    try {
      const response = await fetch(`${uri}/api/note/`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        var data1 = [
           { seq: 1, content: "11", recive: "5678" ,send:"1234" },
          { seq: 2, content: "21", recive: "1234" , send:'5678'},
      ];
        
        setNotes(data1);
      } else {
        console.error('실패');
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };

  const nList = notes.map((item) => (
    
    <ul className="flex " key={item.seq}>
      
      <li className="list-none flex-1" onClick={() => showBigModal(item.content, item.send)}>{item.content}</li>
      <li className="list-none ">{item.send}</li>
    </ul>
  ));

  return (
    <div className="bg-white w-80 h-52 fixed z-30  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <button
        className="absolute w-4 right-0 top-0 text-cyan-300"
        onClick={closeModal}
      >
        X
      </button>
      <br/>
      
      {send1}
      <div className="flex justify-between"><p>내용 </p><p>보낸이</p></div>
      {nList.length > 0 ? nList : null}
      {bigmodalOpen &&<Bigmodal srstate={srstate} setState={setState}  setbigModalOpen={setbigModalOpen} content={aContent} send={aSend}/>}
    </div>
  );
}

export default ModalBasic;
