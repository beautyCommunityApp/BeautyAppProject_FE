import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../Product/WriteReview.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function WriteReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [star, setStar] = useState(0);
    const [content, setContent] = useState("");
    const [oneLineReview, setOneLineReview] = useState("");
  
    const handleSubmit = () => {
      if (!star || content.length < 20 || !oneLineReview.trim()) {
        alert("모든 항목을 정확히 입력해주세요.");
        return;
      }
  //개발 테스트 시에는 process.env.NODE_ENV === "development" 분기 처리로 서버 요청 없이도 동작 확인 가능!
      // ✅ 개발 환경에서는 fetch 생략하고 이동만
      if (process.env.NODE_ENV === "development") {
        console.log("💡 로컬 테스트용 리뷰 등록 완료!");
        alert("여기 💡 로컬 테스트용 리뷰 등록 완료!");
        navigate(`/product/${id}/reviews`);
        return;
      }
  
      // 실제 서버로 POST 요청
      fetch(`/app/api/cosmetics/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ star, content, oneLineReview }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`리뷰 등록 실패: ${res.status} - ${errorText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.isSuccess) {
            navigate(`/product/${id}/reviews`);
          } else {
            alert(data.responseMessage || "리뷰 등록에 실패했습니다.");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("리뷰 등록 중 오류가 발생했습니다.");
        });
    };
  
    return (
      <div className="write-review-page">
        <Header title="리뷰 작성" prevPath={`/product/${id}`} />
  
        <div className="review-box">
          <h4>블루 아가베 포어 에센스 토너</h4>
          <p className="brand-name">다자연</p>
        </div>
  
        <p className="section-title">평점을 선택해 주세요.</p>
        <div className="star-rating-st">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`star ${star >= num ? "selected" : ""}`}
              onClick={() => setStar(num)}
            >
              ★
            </span>
          ))}
        </div>
  
        <p className="section-title">리뷰를 작성해 주세요.</p>
        <textarea
          placeholder="최소 20자 이상 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
        />
        <div className="counter">{content.length} / 1000</div>
  
        <p className="section-title">한줄평을 작성해 주세요.</p>
        <input
          type="text"
          value={oneLineReview}
          onChange={(e) => setOneLineReview(e.target.value)}
          maxLength={20}
          placeholder="좋아요"
        />
        <div className="counter">{oneLineReview.length} / 20</div>
  
        <button
          className={`submit-button ${
            content.length >= 20 && star && oneLineReview ? "active" : ""
          }`}
          onClick={handleSubmit}
          disabled={!(content.length >= 20 && star && oneLineReview)}
        >
          리뷰 등록하기
        </button>
  
        <Footer />
      </div>
    );
  }
  
  export default WriteReview;
