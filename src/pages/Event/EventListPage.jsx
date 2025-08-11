// import React, { useState } from "react";
// import "./EventListPage.css";
// import productImage from "../../assets/images/EventPImg.png"; // 샘플 이미지 경로 설정
// import searchIconImg from "../../assets/images/searchIcon.png";
// import { useLocation, useNavigate } from "react-router-dom";

// import Footer from "../../components/Footer";

// // 탭 이름들 정의: 상단 탭 메뉴에 표시될 항목들
// const tabs = ["참여 가능", "종료", "당첨자 발표", "내 이벤트"];
// // 임시 이벤트 데이터 (mock 데이터)
// const mockEvents = [
//   {
//     id: 1,
//     brand: "다자연",
//     title: "첫구매 한정!\n새해 첫 혜택",
//     desc: "온라인 첫 구매라면\n에센스 토너를 무료로 드립니다",
//     period: "25.01.01~25.01.31",
//     image: productImage,
//     status: "active", // 종료: ended, 발표: announced
//   },
//   {
//     id: 2,
//     brand: "다자연",
//     title: "두번째 혜택",
//     desc: "온라인 첫 구매라면\n에센스 토너를 무료로 드립니다",
//     period: "25.01.01~25.02.31",
//     image: productImage,
//     status: "active", // 종료: ended, 발표: announced
//   },
// ];

// const EventListPage = () => {
//   const [activeTab, setActiveTab] = useState("참여 가능"); // 현재 활성화된 탭 상태
//   const navigate = useNavigate(); // 페이지 이동 함수
//   return (
//     <div className="event-wrapper">
//       <div className="event-page">
//         <div className="logo-row">
//           <h1 className="logo">BeautemTalk</h1>
//           <div className="search-icon">
//             <img src={searchIconImg} onClick={() => navigate("/search")} />
//           </div>
//         </div>
//         {/* 탭 */}
//         <div className="event-tabs">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               className={`event-tab ${activeTab === tab ? "active" : ""}`}
//               onClick={() => setActiveTab(tab)} // 클릭 시 탭 상태 변경
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* 내용 */}
//         <div className="event-content">
//           {["참여 가능", "종료", "당첨자 발표"].includes(activeTab) &&
//             mockEvents.map((event) => (
//               <div key={event.id} className="event-card">
//                 <div className="event-text">
//                   <span className="brand">{event.brand}</span>
//                   <div className="title">{event.title}</div>
//                   <div className="desc">{event.desc}</div>
//                   <div className="period">{event.period}</div>
//                 </div>
//                 <div className="event-image">
//                   <img src={event.image} alt="이벤트 이미지" />
//                   {activeTab === "종료" && <div className="badge">마감</div>}
//                 </div>
//                 <button className="event-button">
//                   {activeTab === "당첨자 발표"
//                     ? "당첨자 확인하기"
//                     : "자세히 보기"}
//                 </button>
//               </div>
//             ))}

//           {activeTab === "내 이벤트" && (
//             <div className="my-event-message">이벤트 참여 현황</div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default EventListPage;

// src/pages/Event/EventListPage.jsx

import React, { useState, useEffect } from "react";
import "./EventListPage.css";
import productImage from "../../assets/images/EventPImg.png";
import searchIconImg from "../../assets/images/searchIcon.png";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import EventCard from "../../components/EventCard"; // 공통 컴포넌트 import

const tabs = ["참여 가능", "종료", "당첨자 발표", "내 이벤트"];

// 임시 이벤트 mock 데이터
const mockEvents = [
  {
    id: 1,
    brand: "다자연",
    title: "첫구매 한정!\n새해 첫 혜택",
    desc: "온라인 첫 구매라면\n에센스 토너를 무료로 드립니다",
    period: "25.01.01~25.01.31",
    image: productImage,
    status: "active",
  },
  {
    id: 2,
    brand: "다자연",
    title: "두번째 혜택",
    desc: "온라인 첫 구매라면\n에센스 토너를 무료로 드립니다",
    period: "25.01.01~25.02.31",
    image: productImage,
    status: "active",
  },
];

const EventListPage = () => {
  const [activeTab, setActiveTab] = useState("참여 가능");
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();

  // 탭 변경 시 API 또는 mock 데이터 불러오기
  useEffect(() => {
    // 실제로는 여기에 탭에 따른 API 호출 로직 추가
    // 예: /app/api/events?status=active 또는 status=ended 등
    setEventList(mockEvents);
  }, [activeTab]);

  return (
    <div className="event-wrapper">
      <div className="event-page">
        <div className="logo-row">
          <h1 className="logo">BeautemTalk</h1>
          <div className="search-icon">
            <img src={searchIconImg} onClick={() => navigate("/search")} />
          </div>
        </div>

        {/* 탭 영역 */}
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

        {/* 이벤트 리스트 */}
        <div className="event-content">
          {activeTab === "내 이벤트" ? (
            <div className="my-event-message">이벤트 참여 현황</div>
          ) : (
            eventList.map((event) => (
              <EventCard key={event.id} {...event} tabType={activeTab} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventListPage;
