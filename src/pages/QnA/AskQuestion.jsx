import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./AskQuestion.css";
import CategoryModal from "../../components/CategoryModal";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/images/Arrow Left.png";
//질문 작성화면
function AskQuestion() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  //   const handleSubmit = () => {
  //     if (!title || !content || !category)
  //       return alert("모든 항목을 작성해주세요.");
  //     console.log({ category, title, content }); // 나중에 API 호출
  //   };
  //   const isFormValid = category && title.trim().length >= 5;
  const isFormValid =
    category && title.trim().length >= 5 && content.trim().length >= 10;

  const handleSubmit = () => {
    if (!isFormValid) return;

    try {
      // 🔽 [여기서 API 호출 수행 예정]
      // const response = await axios.post("/app/api/questions", {
      //   category,
      //   title,
      //   content,
      // });

      // 🔽 [임시 로깅]
      console.log("질문 등록 요청", {
        category,
        title,
        content,
      });

      // 🔽 [요청 성공 후 처리]
      // if (response.data.isSuccess) {
      //   alert("질문이 등록되었습니다!");
      //   navigate("/qna"); // Q&A 피드로 이동
      // }

      // 🔽 [백엔드 연동 전 임시 처리]
      alert("임시: 질문이 등록된 것으로 처리됩니다.");
      navigate("/qna");
    } catch (err) {
      // 🔽 [오류 처리]
      console.error("질문 등록 실패", err);
      alert("질문 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className="ask-question-container">
      {/* <Header title="질문하기" back /> */}
      <div className="ask-header">
        <button className="back-btn" onClick={() => navigate("/qna")}>
          <img src={ArrowLeft} alt="뒤로가기" />
        </button>
        <h3>질문하기</h3>
        <button
          className={`submit-btn ${isFormValid ? "active" : ""}`}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      <div className="ask-question-body">
        <div className="ask-form">
          <div className="form-field">
            <input
              readOnly
              placeholder="질문 카테고리를 선택해주세요."
              value={category}
              onClick={() => setShowCategoryModal(true)}
            />
            <span style={{ fontSize: "18px", color: "#c1c1c1" }}>›</span>
          </div>

          <input
            className="title-input"
            placeholder="질문 제목을 입력해주세요. (최소 5자 이상)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="content-input"
            placeholder={`*Q&A 작성 유의사항 안내\n\n불쾌감을 줄 수 있는 게시물, 광고나 홍보성 게시물 등은 별도의 고지 없이 삭제될 수 있습니다.\n\n클리어링 정책에 따라 검수된 이미지는 노출에 제한될 수 있습니다.`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <Footer />

      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSelect={(selected) => setCategory(selected)}
        />
      )}
    </div>
  );
}

export default AskQuestion;
