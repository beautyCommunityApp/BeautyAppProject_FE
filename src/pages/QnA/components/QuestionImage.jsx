import React from "react";

const QuestionImage = ({ imageUrl }) => {
  if (!imageUrl) return null;
  return (
    <div className="qna-image">
      <img src={imageUrl} alt="qna" />
    </div>
  );
};

export default QuestionImage;
