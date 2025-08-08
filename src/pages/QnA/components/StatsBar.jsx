import React from "react";

const StatsBar = ({ likes, commentCount }) => {
  return (
    <div className="qna-stats">
      <span> 좋아요{likes}</span>
      <span> 댓글{commentCount}</span>
    </div>
  );
};

export default StatsBar;
