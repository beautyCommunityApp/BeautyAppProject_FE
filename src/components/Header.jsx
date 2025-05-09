import React from "react";
import { useNavigate } from "react-router-dom";
// import ArrowLeft from "../../assets/images/Arrow Left.png";
import ArrowLeft from "./../assets/images/Arrow Left.png";
import "./../components/Header.css";

function Header({ title, prevPath, onClose, rightChild }) {
  const nav = useNavigate();

  const handleBack = () => {
    if (prevPath) {
      nav(prevPath);
    } else if (onClose) {
      onClose();
    } else {
      nav(-1);
    }
  };

  return (
    <div className="header-wrapper">
      {/* <button className="header-close-btn" onClick={handleBack}>
        ×
      </button> */}
      <button className="header-back-btn" onClick={handleBack}>
        <img src={ArrowLeft} alt="뒤로가기" />
      </button>
      {title && <h2 className="header-title">{title}</h2>}
      <div className="header-right">{rightChild}</div>
    </div>
  );
}

export default Header;
