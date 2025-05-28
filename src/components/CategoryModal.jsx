import React, { useState } from "react";
import "./CategoryModal.css";

const categoryData = {
  스킨케어: [
    "스킨/토너",
    "로션/에멀전",
    "에센스/세럼",
    "크림",
    "미스트",
    "페이스오일",
    "멀티밤",
  ],
  메이크업: ["페이스메이크업", "립메이크업", "아이메이크업"],
  클렌징: ["클렌징폼", "클렌징오일", "클렌징워터"],
  헤어: ["샴푸", "컨디셔너", "트리트먼트"],
  // 필요 시 추가
};

function CategoryModal({ onClose, onSelect }) {
  const [selectedMain, setSelectedMain] = useState("스킨케어");

  return (
    <div className="modal-overlay">
      <div className="category-modal-box">
        <button className="category-modal-close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="category-container">
          <div className="category-left">
            {Object.keys(categoryData).map((main) => (
              <div
                key={main}
                className={`category-main ${
                  selectedMain === main ? "active" : ""
                }`}
                onClick={() => setSelectedMain(main)}
              >
                {main}
              </div>
            ))}
          </div>
          <div className="category-right">
            {categoryData[selectedMain].map((sub) => (
              <div
                key={sub}
                className="category-sub"
                onClick={() => {
                  onSelect(sub);
                  onClose();
                }}
              >
                {sub}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
