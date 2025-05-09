// // src/components/ReviewCard.jsx
// import React, { useState } from "react";
// // import "../ReviewCard.css";
// import { useNavigate } from "react-router-dom";
// import likeOn from "./../assets/images/like_on.png";
// import likeOff from "./../assets/images/like_off.png";
// // import likeOff from "../../assets/images/like_off.png";
// import "./../components/ReviewCard.css";
// import api from "../../api/axiosInstance"; // ✅ 공통 axios 인스턴스

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 좋아요 toggle API 함수
import { toggleReviewLike } from "../api/reviewApi";
// 좋아요 아이콘
import likeOn from "./../assets/images/like_on.png";
import likeOff from "./../assets/images/like_off.png";
import "./../components/ReviewCard.css";

//	reviewId: 좋아요 API 요청 시 필요한 리뷰 ID  ,user :작성자 정보: 프로필 이미지, 나이, 성별, 피부타입 포함 객체
//product :리뷰와 연결된 제품 정보 ,content :리뷰 내용 및 별점, 한줄평, 본문, 좋아요 수 등
//date :리뷰 작성일 (ex: 1일 전)
function ReviewCard({ reviewId, user, product, content, date }) {
  const nav = useNavigate();

  // 좋아요 상태 및 개수 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(content.likes);

  // 별점 UI를 렌더링하는 함수
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= score ? "" : "gray"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  //  좋아요 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    try {
      const liked = await toggleReviewLike(reviewId); // 서버에 toggle 요청
      setIsLiked(liked); // 상태 변경
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1)); // 숫자 증감
    } catch (err) {
      console.error("❌ 좋아요 API 에러:", err);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="review-card">
      {/* 사용자 프로필 & 작성자 정보 */}
      <div className="review-header">
        <img src={user.image} alt="프로필" className="user-image" />
        <div className="user-info">
          <span className="nickname">{user.nickname}</span>
          <span className="meta">
            {user.age}세 ・ {user.skin} ・ {user.gender}
          </span>
        </div>
        <span className="review-date">{date}</span>
      </div>

      {/* 별점 추가 */}
      <div className="star-rating">{renderStars(content.rating)}</div>

      {/* 해당 리뷰의 제품 정보 (썸네일, 이름, 브랜드) */}
      {/* <div className="product-info" onClick={() => nav(`/product/${1}`)}> */}
      <div
        className="product-info"
        onClick={() => nav(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-thumbnail"
        />
        <div className="product-details">
          <div className="product-name">{product.name}</div>
          <div className="product-brand">{product.brand}</div>
        </div>
      </div>

      {/* 한줄평과 본문 내용 */}
      <div className="review-title">“ {content.title} ”</div>
      <div className="review-body">{content.body}</div>

      {/* 좋아요 버튼 */}
      <div className="review-footer">
        <button className="like-button" onClick={handleLikeClick}>
          <img src={isLiked ? likeOn : likeOff} alt="like" width="20" />
          <span style={{ marginLeft: "8px" }}>{likeCount}</span>
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;
