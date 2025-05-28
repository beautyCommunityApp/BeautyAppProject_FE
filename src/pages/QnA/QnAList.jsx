import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import QnACard from "../../components/QnACard";
import { fetchQnAList } from "../../api/qnaApi";
import { useNavigate } from "react-router-dom";
import "./QnAList.css";
import searchIconImg from "../../assets/images/searchIcon.png";
function QnAList() {
  const [activeTab, setActiveTab] = useState("feed");
  const [qnas, setQnas] = useState([]);
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("전체"); // '전체', '스킨케어', ...

  useEffect(() => {
    // QnA 목록 조회 API 호출 (초기 렌더 시 한 번만)
    // 실제 서버 연동 시 fetchQnAList 내부에서 axios.get("/app/api/qna") 형태로 구현 필요
    fetchQnAList().then((res) => setQnas(res));
  }, []);
  // ✅ 선택된 카테고리에 따라 필터링
  const filteredQnas =
    activeCategory === "전체"
      ? qnas
      : qnas.filter((qna) => qna.category === activeCategory);

  return (
    <div className="qna-container">
      <div className="logo-row">
        <h1 className="logo">BeautemTalk</h1>
        <div className="search-icon">
          <img src={searchIconImg} onClick={() => navigate("/search")} />
        </div>
      </div>
      {/* <Header title="BeautemTalk" /> */}
      <div className="qna-body">
        {/* 상단 탭 (피드/로그) */}
        <div className="qna-top-tabs">
          <button
            className={activeTab === "feed" ? "active" : ""}
            onClick={() => setActiveTab("feed")}
          >
            피드
          </button>
          <button
            className={activeTab === "log" ? "active" : ""}
            onClick={() => setActiveTab("log")}
          >
            로그
          </button>
        </div>

        {/* 카테고리 필터 */}
        {activeTab === "feed" && (
          <>
            {/* ✅ 카테고리 필터 탭 */}
            <div className="qna-tabs">
              {["전체", "스킨케어", "페이스메이크업", "립메이크업"].map(
                (cat) => (
                  <button
                    key={cat}
                    className={activeCategory === cat ? "active" : ""}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* ✅ QnA 카드 리스트 */}
            <h2 className="qna-section-title">질문 피드</h2>
            <div className="qna-list">
              {filteredQnas.map((qna) => (
                <QnACard key={qna.id} qna={qna} />
              ))}
            </div>

            {/* ✅ 플로팅 등록 버튼 */}
            <button
              className="floating-btn"
              onClick={() => navigate("/qna/ask")}
            >
              ＋
            </button>
          </>
        )}

        {/* ✅ 로그 탭: 비어있는 상태 */}
        {activeTab === "log" && (
          <div className="qna-log-empty">
            <p className="qna-log-text">
              궁금한 것이 있나요?
              <br />
              Q&A에 언제든지 물어보세요!
            </p>
            <button
              className="qna-log-btn"
              onClick={() => navigate("/qna/ask")}
            >
              질문 등록하기 <span>›</span>
            </button>
          </div>
        )}
      </div>{" "}
      <Footer />
    </div>
  );
}

export default QnAList;
