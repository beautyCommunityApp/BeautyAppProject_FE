// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ReviewCard from "@/components/ReviewCard"; // 공통 리뷰 카드 컴포넌트
import ReviewCard from "./../../components/ReviewCard";
import "./ProductReviewList.css";


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ReviewCard from "@/components/ReviewCard";
// import "./ProductReviewList.css";

const mockData = {
  isSuccess: true,
  result: {
    content: Array.from({ length: 3 }, (_, i) => ({
      memberProfile: {
        nickname: `우장산너구리${i + 1}`,
        age: 21 + i,
        gender: "MALE",
        skinType: "복합성",
        profileImageUrl: null,
      },
      daysAgo: `${i}일 전`,
      star: 5,
      oneLineReview: "정말 좋아요",
      reviewComment:
        "5점 만점에 4점\n피부 타입 민감성에 좋아요.\n바르기에는 건조할거라 생각했는데 의외로 잘 사용했어요.",
      likeCount: 21 + i,
      product: {
        image: "/images/sample-product.png",
        name: "블루 아가페 포어 에센스 토너",
        brand: "다자연",
      },
    })),
    stats: {
      average: 4.89,
      satisfaction: 95,
      countByStars: [0, 0, 24, 57, 128], // index: 1~5 stars
    },
  },
};

function ProductReviewList() {
  const { cosmeticId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    average: 0,
    satisfaction: 0,
    countByStars: [0, 0, 0, 0, 0],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      if (process.env.NODE_ENV === "development") {
        setReviews(mockData.result.content);
        setStats(mockData.result.stats);
      } else {
        try {
          const response = await fetch(`/app/api/cosmetics/${cosmeticId}/reviews`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          const data = await response.json();
          if (data.isSuccess) {
            setReviews(data.result.content);
            setStats(data.result.stats); // 서버에 stats 포함 시 사용
          }
        } catch (error) {
          console.error("리뷰 불러오기 실패", error);
        }
      }
    };

    fetchReviews();
  }, [cosmeticId]);

  const totalReviews = stats.countByStars.reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="product-review-list">
         <div className="product-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h3 className="header-title">제품상세페이지</h3>
        <button className="search-button" onClick={() => alert("검색 페이지 연결 예정!")}>🔍</button>
      </div>
      {/* 상단 평점 & 별점 분포 */}
      <div className="review-summary">
        <div className="review-average">
          <span className="score">{stats.average.toFixed(2)}</span>
          <span className="percent">{stats.satisfaction}%</span>
        </div>
        <div className="star-bars">
          {[5, 4, 3, 2, 1].map((star, idx) => (
            <div key={star} className="star-row">
              <span className="star-label">{star}점</span>
              <div className="bar-container">
                <div
                  className="bar"
                  style={{
                    width:
                      totalReviews > 0
                        ? `${(stats.countByStars[5 - star] / totalReviews) * 100}%`
                        : "0%",
                  }}
                />
              </div>
              <span className="star-count">{stats.countByStars[5 - star]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 리뷰 목록 */}
      <h2 className="review-list-title">전체 리뷰</h2>
      {reviews.map((review, idx) => (
        <ReviewCard
          key={idx}
          user={{
            image: review.memberProfile.profileImageUrl || "/images/user1.png",
            nickname: review.memberProfile.nickname,
            age: review.memberProfile.age,
            gender: review.memberProfile.gender === "MALE" ? "남" : "여",
            skin: review.memberProfile.skinType,
          }}
          product={review.product}
          content={{
            title: `“ ${review.oneLineReview} ”`,
            body: review.reviewComment,
            likes: review.likeCount,
          }}
          date={review.daysAgo}
          onLike={() => console.log("좋아요 클릭")}
        />
      ))}

   

      {/* 하단 리뷰 작성 버튼 */}
      <div className="review-write-bottom">
  <button onClick={() => navigate(`/product/${cosmeticId}/review/write`)}>
    리뷰 작성
  </button>
</div>

    </div>
  );
}

export default ProductReviewList;

