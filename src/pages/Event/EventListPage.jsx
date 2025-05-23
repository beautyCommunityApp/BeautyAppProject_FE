import React, { useState } from "react";
import "./EventListPage.css";
import productImage from "../../assets/images/EventPImg.png"; // 샘플 이미지 경로 설정
import searchIconImg from "../../assets/images/searchIcon.png";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
const tabs = ["참여 가능", "종료", "당첨자 발표", "내 이벤트"];

const mockEvents = [
  {
    id: 1,
    brand: "다자연",
    title: "첫구매 한정!\n새해 첫 혜택",
    desc: "온라인 첫 구매라면\n에센스 토너를 무료로 드립니다",
    period: "25.01.01~25.01.31",
    image: productImage,
    status: "active", // 종료: ended, 발표: announced
  },
  {
    id: 2,
    brand: "다자연",
    title: "두번째 혜택",
    desc: "온라인 첫 구매라면\n에센스 토너를 무료로 드립니다",
    period: "25.01.01~25.02.31",
    image: productImage,
    status: "active", // 종료: ended, 발표: announced
  },
];

const EventListPage = () => {
  const [activeTab, setActiveTab] = useState("참여 가능");
  const navigate = useNavigate();
  return (
    <div className="event-wrapper">
      <div className="event-page">
        <div className="logo-row">
          <h1 className="logo">BeautemTalk</h1>
          <div className="search-icon">
            <img src={searchIconImg} onClick={() => navigate("/search")} />
          </div>
        </div>
        {/* 탭 */}
        <div className="event-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`event-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 내용 */}
        <div className="event-content">
          {["참여 가능", "종료", "당첨자 발표"].includes(activeTab) &&
            mockEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-text">
                  <span className="brand">{event.brand}</span>
                  <div className="title">{event.title}</div>
                  <div className="desc">{event.desc}</div>
                  <div className="period">{event.period}</div>
                </div>
                <div className="event-image">
                  <img src={event.image} alt="이벤트 이미지" />
                  {activeTab === "종료" && <div className="badge">마감</div>}
                </div>
                <button className="event-button">
                  {activeTab === "당첨자 발표"
                    ? "당첨자 확인하기"
                    : "자세히 보기"}
                </button>
              </div>
            ))}

          {activeTab === "내 이벤트" && (
            <div className="my-event-message">이벤트 참여 현황</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventListPage;
