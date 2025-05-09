// import React from "react";
// import "./../Home/Home.css";
// import ReviewCard from "../../components/ReviewCard";
// import Footer from "../../components/Footer";
// import review from "../../assets/images/review1.png";
// import profileImageUrl from "../../assets/images/profileImageUrl.png";
// import searchIconImg from "../../assets/images/searchIcon.png";
// import bannerImg from "../../assets/images/banner.png";

// import BannerSlider from "../../components/BannerSlider";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import "./Home.css";
import ReviewCard from "../../components/ReviewCard";
import Footer from "../../components/Footer";
import BannerSlider from "../../components/BannerSlider";
import { useLocation, useNavigate } from "react-router-dom";
import searchIconImg from "../../assets/images/searchIcon.png";
import reviewFallbackImg from "../../assets/images/review1.png";
import profileFallbackImg from "../../assets/images/profileImageUrl.png";

import { fetchRecentReviews } from "../../api/reviewApi";

const sampleData = Array.from({ length: 5 }, (_, i) => ({
  reviewId: i + 1, // ✅ 샘플에도 reviewId 추가
  user: {
    image: profileFallbackImg,
    nickname: `샘플유저${i + 1}`,
    age: 20 + i,
    skin: "복합성",
    gender: "여",
  },
  product: {
    name: "블루 아가페 포어 에센스 토너",
    brand: "더자연",
    image: reviewFallbackImg,
    id: 1,
  },
  content: {
    title: `샘플 제목${i + 1}`,
    body: "샘플 리뷰 본문입니다.",
    likes: 3 + i,
    rating: (i % 5) + 1,
  },
  date: "2025.01.01",
}));

function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchRecentReviews();
        console.log("✅ 실시간 리뷰:", data);

        if (Array.isArray(data?.result?.content)) {
          const mappedData = data.result.content.map((item, idx) => ({
            reviewId: idx + 1,
            user: {
              image:
                item.reviewInfo.memberProfile.profileImageUrl ||
                profileFallbackImg,
              nickname: item.reviewInfo.memberProfile.nickname,
              age: item.reviewInfo.memberProfile.age,
              skin: item.reviewInfo.memberProfile.skinType,
              gender:
                item.reviewInfo.memberProfile.gender === "MALE" ? "남" : "여",
            },
            product: {
              name: item.cosmeticInfo.cosmeticName,
              brand: item.cosmeticInfo.brandName,
              image: item.cosmeticInfo.cosmeticImageUrl || reviewFallbackImg,
              id: item.cosmeticInfo.cosmeticId,
            },
            content: {
              title: item.reviewInfo.oneLineReview,
              body: item.reviewInfo.reviewComment,
              likes: item.reviewInfo.likeCount,
              rating: item.reviewInfo.star,
            },
            date: item.reviewInfo.daysAgo,
          }));

          setReviews(mappedData);
        } else {
          throw new Error("응답 데이터 형식 오류");
        }
      } catch (err) {
        console.error("❌ 리뷰 조회 실패, 샘플로 대체", err);
        setReviews(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="home-container">
        <p className="home-loading">리뷰 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="main-banner-section">
        <div className="logo-row">
          <h1 className="logo">BeautemTalk</h1>
          <div className="search-icon">
            <img src={searchIconImg} onClick={() => navigate("/search")} />
          </div>
        </div>

        <BannerSlider />

        <div className="review-section-header">
          <h2>실시간 리뷰</h2>
          <span className="more" onClick={() => alert("더보기 준비중!")}>
            더보기 &gt;
          </span>
        </div>
      </header>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="home-no-review">등록된 리뷰가 없습니다.</p>
        ) : (
          reviews.map((item) => (
            <ReviewCard
              key={item.reviewId}
              reviewId={item.reviewId}
              user={item.user}
              product={item.product}
              content={item.content}
              date={item.date}
            />
          ))
        )}
        {/* {reviews.map((item) => (
          <ReviewCard
            key={item.reviewId}
            reviewId={item.reviewId} // ✅ reviewId 넘기기
            user={item.user}
            product={item.product}
            content={item.content}
            date={item.date}
          />
        ))} */}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
