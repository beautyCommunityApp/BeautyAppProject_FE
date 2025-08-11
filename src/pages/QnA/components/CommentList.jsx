import React from "react";

const CommentList = ({ comments }) => {
  return (
    // <div className="qna-comments">
    //   {comments.map((c) => (
    //     <div className="comment" key={c.id}>
    //       <strong>{c.nickname}:</strong> {c.text}
    //     </div>
    //   ))}
    // </div>
    <div className="qna-comments">
      {comments.map((c) => (
        <div className="comment" key={c.id}>
          <img
            src="/images/profile.png"
            alt="profile"
            className="comment-avatar"
          />
          <div className="comment-content">
            <strong>{c.nickname}</strong>
            <p>{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
