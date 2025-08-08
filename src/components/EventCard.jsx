// src/components/EventCard.jsx
import React from "react";
import "./EventCard.css";

const EventCard = ({ brand, title, desc, period, image, status, tabType }) => {
  const getButtonLabel = () => {
    if (tabType === "당첨자 발표") return "당첨자 확인하기";
    return "자세히 보기";
  };

  return (
    // <div className="event-card">
    //   <div className="event-text">
    //     <span className="brand">{brand}</span>
    //     <div className="title">{title}</div>
    //     <div className="desc">{desc}</div>
    //     <div className="period">{period}</div>
    //   </div>
    //   <div className="event-image">
    //     <img src={image} alt="이벤트 이미지" />
    //     {tabType === "종료" && <div className="badge">마감</div>}
    //   </div>
    //   <button className="event-button">{getButtonLabel()}</button>
    // </div>

    <div className="event-card">
      <div className="event-top">
        <div className="event-left">
          <span className="brand">{brand}</span>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
          <div className="period">{period}</div>
        </div>
        <div className="event-image">
          <img src={image} alt="이벤트 이미지" />
          {tabType === "종료" && <div className="badge">마감</div>}
        </div>
      </div>
      <button className="event-button">{getButtonLabel()}</button>
    </div>
  );
};

export default EventCard;
