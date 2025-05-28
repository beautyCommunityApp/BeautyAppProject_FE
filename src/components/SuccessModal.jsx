import React from "react";
import "./SuccessModal.css";

export default function SuccessModal({ message, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p className="modal-message">{message}</p>
        <button className="modal-button" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}
