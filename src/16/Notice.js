import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  const arr1 = ['칸 1', '칸 2', '칸 3', '칸 4', '칸 5', '칸 6', '칸 7', '칸 8', '칸 9', '칸 10'];
  const navigate = useNavigate();

  const handleDivClick = (item) => {
    // Replace '/target-page' with the path of the page you want to navigate to
    navigate(`/Comment/${item}`);
  };

  const arr_div = arr1.map((item, index) => {
    // Generate a random background color using Tailwind CSS classes
    const bgColorClass = `bg-slate-${Math.floor(Math.random() * 9) * 100}`;
    
    return (
      <div key={index} className={`p-4 ${bgColorClass}`} onClick={() => handleDivClick(item)}>
        {item}
      </div>
    );
  });

  return <div className="grid grid-cols-5 h-screen">{arr_div}</div>;
};

export default Notice;