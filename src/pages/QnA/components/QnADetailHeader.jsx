import React from "react";
import ArrowLeft from "../../../assets/images/Arrow Left.png";

const QnADetailHeader = ({ category, onBack }) => {
  return (
    // <div className="qna-header">
    //   <button className="back-btn" onClick={onBack}>
    //     <img src={ArrowLeft} alt="뒤로가기" />
    //   </button>
    //   <span className="category-tag">{category}</span>
    // </div>
    <>
      <div className="qna-header-row">
        <button className="back-btn-q" onClick={onBack}>
          <img src={ArrowLeft} alt="뒤로가기" />
        </button>
      </div>
      <div className="qna-header-category">
        <span className="category-tag">{category}</span>
      </div>
    </>
  );
};

export default QnADetailHeader;
