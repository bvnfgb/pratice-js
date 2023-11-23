import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bigmodal from "./Bigmodal";

function ModalBasic({ setModalOpen, id, title, content, writer }) {
  const closeModal = () => {
    setModalOpen(false);
  };
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
  
  useEffect(() => {
    note();
  }, []);

  const note = async () => {
    try {
      const response = await fetch(`http://10.125.121.205:8080/api/note/`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'id': localStorage.getItem('user'),
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotes(data);
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
      <p>모달창입니다.</p>
      {nList.length > 0 ? nList : null}
      {bigmodalOpen &&<Bigmodal  setbigModalOpen={setbigModalOpen} content={aContent} send={aSend}/>}
    </div>
  );
}

export default ModalBasic;
