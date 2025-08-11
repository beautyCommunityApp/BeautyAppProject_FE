import React, { useState } from "react";

const CommentInput = () => {
  const [text, setText] = useState("");

  return (
    <div className="qna-comment-input-wrapper">
      <input
        className="qna-comment-input"
        placeholder="답변을 입력해 주세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default CommentInput;
