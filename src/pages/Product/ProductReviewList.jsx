import ReviewCard from "./../../components/ReviewCard"; // 공통 리뷰 카드 컴포넌트
import "./ProductReviewList.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";

import DetailImg from "../../assets/images/review1.png";
import profileImageUrl from "../../assets/images/profileImageUrl.png";
import searchIconImg from "../../assets/images/searchIcon.png";
// import off_h from "../../assets/images/off_h.png";
// import on_h from "../../assets/images/on_h.png";
import { fetchReviewsByCosmeticId } from "../../api/reviewApi";

const mockData = {
  isSuccess: true,
  result: {
    content: Array.from({ length: 3 }, (_, i) => ({
      cosmeticInfo: {
        cosmeticImageUrl: DetailImg,
        cosmeticName: "블루 아가페 포어 에센스 토너",
        brandName: "다자연",
      },
      reviewInfo: {
        memberProfile: {
          nickname: `우장산너구리${i + 1}`,
          age: 21 + i,
          gender: "MALE",
          skinType: "복합성",
          profileImageUrl: profileImageUrl,
        },
        daysAgo: `${i}일 전`,
        star: 5,
        oneLineReview: "정말 좋아요",
        reviewComment:
          "5점 만점에 4점\n피부 타입 민감성에 좋아요.\n건조할 줄 알았는데 의외로 괜찮았어요.",
        likeCount: 21 + i,
      },
    })),
    stats: {
      average: 4.89,
      satisfaction: 95,
      countByStars: [0, 0, 24, 57, 128],
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

  // const [isLiked, setIsLiked] = useState(false);

  console.log("cosmeticId: " + cosmeticId);

  useEffect(() => {
    const fetchReviews = async () => {
      if (process.env.NODE_ENV === "development") {
        // ✅ mock 데이터 분기 그대로 유지

        console.log(" [개발 환경] mockData 사용 중");
        const mapped = mockData.result.content.map((review) => ({
          memberProfile: review.reviewInfo.memberProfile,
          daysAgo: review.reviewInfo.daysAgo,
          star: review.reviewInfo.star,
          oneLineReview: review.reviewInfo.oneLineReview,
          reviewComment: review.reviewInfo.reviewComment,
          likeCount: review.reviewInfo.likeCount,
          product: {
            image: review.cosmeticInfo.cosmeticImageUrl,
            name: review.cosmeticInfo.cosmeticName,
            brand: review.cosmeticInfo.brandName,
          },
        }));
        setReviews(mapped);
        setStats(mockData.result.stats);
      } else {
        try {
          const data = await fetchReviewsByCosmeticId(cosmeticId);
          const mapped = data.result.content.map((review) => ({
            memberProfile: review.memberProfile,
            daysAgo: review.daysAgo,
            star: review.star,
            oneLineReview: review.oneLineReview,
            reviewComment: review.reviewComment,
            likeCount: review.likeCount,
            product: {
              image: DetailImg, // 리뷰에 제품 정보가 없을 경우 기본 이미지
              name: "", // 필요시 props로 받아서 처리
              brand: "",
            },
          }));
          setReviews(mapped);
          setStats(data.result.stats);
        } catch (error) {
          console.error("❌ 리뷰 불러오기 실패", error);
        }
      }
    };

    fetchReviews();
  }, [cosmeticId]);

  const totalReviews = stats.countByStars.reduce((acc, cur) => acc + cur, 0);
  console.log("⭐ stats", stats); // 모든 별점의 리뷰 개수를 합한 총 리뷰 수

  const satisfiedCount = stats.countByStars[3] + stats.countByStars[4]; // 4점, 5점
  const satisfaction =
    totalReviews > 0 ? Math.round((satisfiedCount / totalReviews) * 100) : 0;

  // const handleLikeClick = () => {
  //   setIsLiked((prev) => !prev);
  //   // TODO: 여기서 서버에도 좋아요 요청 보내기
  // };

  return (
    <div>
      <div className="product-review-list">
        <div className="product-detail-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ←
          </button>
          <h3 className="header-title">리뷰조회</h3>
          {/* <button className="search-button" onClick={() => alert("검색 페이지 연결 예정!")}>🔍</button> */}
          <div className="search-button">
            <img
              src={searchIconImg}
              onClick={() => alert("검색 페이지 연결 예정!")}
            />
          </div>
        </div>
        {/* 상단 평점 & 별점 분포 */}
        <div className="review-summary">
          <div className="review-average">
            <span className="score">{stats.average.toFixed(2)}</span>{" "}
            {/* 평균 별점(stats.average)을 소수점 둘째 자리까지 반올림한 문자열로 변환해서 화면에 표시 */}
            <div className="divider" />
            {/* <span className="percent">{stats.satisfaction}%</span> */}
            <span className="percent">{satisfaction}%</span>
          </div>
          {/* / */}

          <div className="review-stars-vertical">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.countByStars[star - 1] || 0;
              const percent =
                totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

              return (
                <div key={star} className="vertical-star-row">
                  <div className="vertical-label">
                    <span
                      className={`vertical-star ${
                        count === 0 ? "gray" : "active"
                      }`}
                    >
                      ★
                    </span>
                    <span className="vertical-number">{star}</span>
                  </div>

                  <div className="vertical-bar-container">
                    <div
                      className="vertical-bar"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ? */}

          <div className="star-bars">
            {[5, 4, 3, 2, 1].map((star, idx) => (
              <div key={star} className="star-row">
                {/* <span className="star-label">{star}점</span> */}
                <div className="bar-container">
                  <div
                    className="bar"
                    style={{
                      width:
                        totalReviews > 0 && stats.countByStars[star - 1] != null
                          ? `${
                              (stats.countByStars[star - 1] / totalReviews) *
                              100
                            }%`
                          : "0%",
                      backgroundColor: "#ff3d57",
                    }}
                  >
                    {totalReviews > 0 && stats.countByStars[star - 1] != null
                      ? `${Math.round(
                          (stats.countByStars[star - 1] / totalReviews) * 100
                        )}%`
                      : "0%"}
                  </div>
                </div>

                <span className="star-count">
                  {stats.countByStars[star - 1]}
                </span>
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
              image:
                review.memberProfile.profileImageUrl || "/images/user1.png",
              nickname: review.memberProfile.nickname,
              age: review.memberProfile.age,
              gender: review.memberProfile.gender === "MALE" ? "남" : "여",
              skin: review.memberProfile.skinType,
            }}
            product={review.product}
            content={{
              rating: review.star, // ⭐ 여기서 넣어야 함!
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
          <button
            onClick={() => navigate(`/product/${cosmeticId}/write-review`)}
          >
            리뷰 작성
          </button>
          {/* <img src={off_h}/>
          <img
            src={isLiked ? on_h : off_h}
            alt="좋아요"
            onClick={handleLikeClick}
            style={{ cursor: "pointer" }}
          /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductReviewList;
