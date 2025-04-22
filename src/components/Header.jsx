// import "./Header.css"

// function Header ( {title, leftChild, rightChild ,closeBtn} ) {

//     return <header className="Header">
//         {/* <div className="header_left">{leftChild}</div>
//         <div className="header_center">{title}</div>
//         <div className="header_right">{rightChild}</div> */}
// <div className="header_cente">{leftChild}</div>
// <div className="header_leftr">{title}</div>
//         {/* <div className="close_btn">{closeBtn}</div>  */}
//         {/* <button className="close-btn">{closeBtn}</button> */}


//     </header>

// }
// export default Header;

// src/components/Header/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Header.css';
import "./../components/Header.css"

// function Header({ title }) {
//   const nav = useNavigate();

//   function handleBack(){
//     nav(-1); // 이전 페이지로 이동
//     // nav("/login"); 

//   } 

//   return (
//     <div className="header-wrapper">
//       <button className="header-close-btn" onClick={handleBack}>×</button>
//       {title && <h2 className="header-title">{title}</h2>}
//     </div>
//   );
// }

function Header({ title, prevPath,onClose  }) {
    const nav = useNavigate();
  
    const handleBack = () => {
      if (prevPath) {
        nav(prevPath);
      }else if(onClose){
        onClose(); 
      } else {
        nav(-1);
      }
    };
  
    return (
      <div className="header-wrapper">
        <button className="header-close-btn" onClick={handleBack}>×</button>
        {title && <h2 className="header-title">{title}</h2>}
      </div>
    );
  }


export default Header;
