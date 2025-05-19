// src/components/LogoutModal.jsx
import React from "react";
import "./LogoutModal.css";

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p className="modal-text">로그아웃 하시겠습니까?</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            취소
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
