
// import React from "react";
import "./../Home/Home.css";
import ReviewCard from "../../components/ReviewCard";
import Footer from '../../components/Footer';
import review from "../../assets/images/review1.png";
import profileImageUrl from "../../assets/images/profileImageUrl.png";
import searchIconImg from "../../assets/images/searchIcon.png";
import bannerImg from "../../assets/images/banner.png";

import BannerSlider from "../../components/BannerSlider";
import React, { useEffect, useState } from "react";
import axios from "axios";

const sampleData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  user: {
    image: profileImageUrl,
    nickname: `유저${i + 1}`,
    age: 20 + i,
    skin: "복합성",
    gender: "여",
  },
  product: {
    name: "블루 아가페 포어 에센스 토너",
    brand: "더자연",
    image: review,
  },
  content: {
    title: `제목${i + 1}`,
    body: "리뷰 본문입니다. 샘플 텍스트.",
    likes: 3 + i,
    rating: (i % 5) + 1,
  },
  date: "2025.01.01",
}));

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reviews")
      .then((res) => {
        console.log("✅ res.data", res.data);
        const data = res.data;

        if (Array.isArray(data?.result?.content)) {
          const mappedData = data.result.content.map((item, idx) => ({
            id: idx + 1,
            user: {
              image: item.reviewInfo.memberProfile.profileImageUrl || "images/user1.png",
              nickname: item.reviewInfo.memberProfile.nickname,
              age: item.reviewInfo.memberProfile.age,
              skin: item.reviewInfo.memberProfile.skinType,
              gender: item.reviewInfo.memberProfile.gender === "MALE" ? "남" : "여",
            },
            product: {
              name: item.cosmeticInfo.cosmeticName,
              brand: item.cosmeticInfo.brandName,
              image: item.cosmeticInfo.cosmeticImageUrl || review,
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
          throw new Error("응답 데이터가 배열이 아님");
        }
      })
      .catch((err) => {
        console.error("❌ API 실패, 샘플로 대체", err);
        setReviews(sampleData);
      });
  }, []);

  return (
    <div className="home-container">
      <header className="main-banner-section">
        <div className="logo-row">
          <h1 className="logo">BeautemTalk</h1>
          {/* <span className="search-icon">🔍</span> */}
          <div className="search-icon">
            <img src ={searchIconImg} onClick={() => alert("검색 예정!")}/></div>
        </div>
        <BannerSlider />
        <div className="review-section-header" onClick={() => console.log("리뷰 클릭")}>
          <h2>실시간 리뷰</h2>
          <span className="more">더보기 &gt;</span>
        </div>
      </header>

      <div className="review-list">
        {reviews.map((item) => (
          <ReviewCard
            key={item.id}
            user={item.user}
            product={item.product}
            content={item.content}
            date={item.date}
            onLike={() => console.log(`${item.id} 좋아요 클릭`)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;

//   return (
//     <div className="home-container">
//     {/* 🔼 상단 추천 배너 및 타이틀 영역 */}
//     <header className="main-banner-section">
//       <div className="logo-row">
//         <h1 className="logo">BeautemTalk</h1>
//         <span className="search-icon">🔍</span>
//       </div>
//       {/* <img src={bannerImg} alt="추천 배너" className="main-banner" /> */}

//       <BannerSlider /> 

//       <div className="review-section-header" onClick={() => console.log("리뷰 클릭")}>
//     <h2>실시간 리뷰</h2>
//     <span className="more">더보기 &gt;</span>
//   </div>

//     </header>

//     {/* 🔽 리뷰 카드들 */}
//     <div className="review-list">
//       {reviews.map((item) => (
//         <ReviewCard
//           key={item.id}
//           user={item.user}
//           product={item.product}
//           content={item.content}
//           date={item.date}
//           onLike={() => console.log(`${item.id} 좋아요 클릭`)}
//         />
//       ))}
//     </div>

//     <Footer />
//   </div>
// );
// }

// export default Home;
