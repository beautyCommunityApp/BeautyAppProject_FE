import React from "react";

const UserInfo = ({ nickname, age, skinType, gender }) => {
  return (
    <div className="qna-user-info">
      <img src="/images/profile.png" alt="profile" className="user-avatar" />
      <div className="user-meta">
        <div className="nickname">{nickname}</div>
        <div className="details">
          {age} | {skinType} | {gender}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
