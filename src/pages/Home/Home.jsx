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
import { isMockMode } from "../../utils/envUtils";
import { fetchRecentReviews } from "../../api/reviewApi";
import DetailImg from "../../assets/images/review1.png";
import profileImageUrl from "../../assets/images/profileImageUrl.png";
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
    id: 1, //productId 임시로
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
  const [page, setPage] = useState(0); // ✅ 페이지 상태 추가
  const [hasMore, setHasMore] = useState(true); // ✅ 더 불러올 데이터가 있는지
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews(0); // 첫 페이지 로딩
  }, []);

  const fetchReviews = async (pageNum) => {
    console.log("fetchReviews 호출됨: page", pageNum);
    // 개발환경에서는 무조건 샘플로 보기 (선택)
    // if (process.env.NODE_ENV === "development")
    if (isMockMode()) {
      console.log("🧪 [Mock] 리뷰 목록 호출");
      const mappedData = sampleData.map((item, idx) => ({
        ...item,
        reviewId: pageNum * 10 + idx + 1,
      }));
      setReviews(mappedData);
      setPage(pageNum);
      // setHasMore(false);
      setHasMore(true);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchRecentReviews(pageNum); // API 호출

      // 리뷰 리스트가 비어있을 경우
      const content = data?.result?.content;
      if (!Array.isArray(content) || content.length === 0) {
        console.warn("⚠️ 리뷰 없음, 샘플 데이터로 대체");
        if (pageNum === 0) {
          setReviews(sampleData); // 첫 페이지일 경우만 샘플 출력
          setHasMore(false);
        }
        return;
      }

      //  정상 응답인 경우 리뷰 리스트 매핑
      const mappedData = content.map((item, idx) => ({
        reviewId: pageNum * 10 + idx + 1,
        user: {
          image:
            item.reviewInfo.memberProfile.profileImageUrl || profileFallbackImg,
          nickname: item.reviewInfo.memberProfile.nickname,
          age: item.reviewInfo.memberProfile.age,
          skin: item.reviewInfo.memberProfile.skinType,
          gender: item.reviewInfo.memberProfile.gender === "MALE" ? "남" : "여",
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

      setReviews((prev) => [...prev, ...mappedData]);
      setPage(pageNum);
      setHasMore(!data.result.last);
    } catch (err) {
      console.error("❌ 리뷰 API 실패 → 샘플 데이터로 대체", err);

      // ✅ API 자체 실패 시도 샘플로 대체
      if (pageNum === 0) {
        setReviews(sampleData);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

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
        {hasMore && reviews.length > 0 && (
          <div className="load-more-wrapper">
            <button
              className="load-more-btn"
              onClick={() => fetchReviews(page + 1)}
            >
              더보기
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
