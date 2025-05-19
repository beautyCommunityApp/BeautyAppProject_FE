import React from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <p className="confirm-title">삭제하시겠습니까?</p>
        <p className="confirm-desc">
          삭제 시 동일한 제품에 대해 <br />
          추후 리뷰를 작성할 수 없으며,
          <br />
          삭제된 리뷰는 복구할 수 없습니다.
        </p>
        <div className="confirm-buttons">
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

export default ConfirmDeleteModal;
