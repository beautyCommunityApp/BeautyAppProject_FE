// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import ArrowLeft from "./../assets/images/Arrow Left.png";
import "./Header.css";

function Header({
  title,
  hasBack = true,
  hasSetting = false,
  onSettingClick,
  rightChild, // ✅ 추가
}) {
  const nav = useNavigate();

  const handleBack = () => {
    nav(-1);
  };

  return (
    <div className="header-wrapper">
      {hasBack ? (
        <button className="header-back-btn" onClick={handleBack}>
          <img src={ArrowLeft} alt="뒤로가기" />
        </button>
      ) : (
        <div className="header-back-placeholder" />
      )}

      <h2 className="header-title">{title}</h2>

      <div className="header-right">
        {rightChild && rightChild}
        {hasSetting && (
          <button className="header-setting-btn" onClick={onSettingClick}>
            <FiSettings size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
