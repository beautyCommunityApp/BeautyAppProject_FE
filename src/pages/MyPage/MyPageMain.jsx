// src/pages/MyPage/MyPageMain.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../api/axiosInstance"; // accessToken 자동 주입되는 인스턴스
import axios from "../../api/instance";
import { fetchMyPage } from "../../api/memberApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./MyPageMain.css"; // 필요한 경우 스타일링 추가
import profileFallbackImg from "../../assets/images/profileImageUrl.png";
import { isMockMode } from "../../utils/envUtils";
function MyPageMain() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // if (process.env.NODE_ENV === "development")
    if (isMockMode()) {
      console.log("🧪 [Mock  MyPageMain ");
      // ✅ 더미 응답 예시
      const dummy = {
        profile: {
          nickname: "우장산너구리",
          age: 21,
          gender: "MALE",
          skinType: "복합성",
          profileImageUrl: profileFallbackImg,
        },
        skinType: "복합성",
        scalpType: "민감성두피",
        hairType: "지성모",
        personalColor: "모름",
        reviewCount: 1,
        scrapCount: 1,
      };
      setUserInfo(dummy);
      return;
    }

    fetchMyPage()
      .then((res) => {
        if (res?.isSuccess) {
          setUserInfo(res.result);
        } else {
          console.error("마이페이지 정보 조회 실패", res);
        }
      })
      .catch((err) => {
        console.error("API 호출 에러", err);
      });
  }, []);

  if (!userInfo) return <div>로딩 중...</div>;

  const { profile, reviewCount, scrapCount } = userInfo;

  return (
    <div className="mypage-container">
      <Header
        title="마이페이지"
        hasBack={false}
        hasSetting
        // onSettingClick={() => navigate("/mypage/edit")}
        onSettingClick={() => navigate("/mypage/setting")}
      />

      <div className="profile-section">
        <div className="profile-header">
          <img
            src={profile.profileImageUrl || "/images/default-profile.png"}
            alt="프로필"
            className="profile-img"
          />
          <div className="profile-info">
            <div className="nickname">{profile.nickname}</div>
            <div className="sub-info">
              {profile.age}세 | {profile.gender === "MALE" ? "남" : "여"}
            </div>
            {/* <div className="follow">팔로워 0 팔로잉 0</div> */}
          </div>
        </div>

        <div className="mypage-beauty-profile">
          <p className="mypage-section-title">뷰티프로필</p>
          <div className="mypage-beauty-grid">
            <div className="mypage-beauty-item">
              <span className="label">피부타입</span>
              <span className="value">{profile.skinType}</span>
            </div>
            <div className="mypage-beauty-item">
              <span className="label">두피타입</span>
              <span className="value">{userInfo.scalpType}</span>
            </div>
            <div className="mypage-beauty-item">
              <span className="label">모발타입</span>
              <span className="value">{userInfo.hairType}</span>
            </div>
            <div className="mypage-beauty-item">
              <span className="label">퍼스널컬러</span>
              <span className="value">{userInfo.personalColor}</span>
            </div>
          </div>
        </div>
        <div className="mypage-editBtn-section">
          <button className="edit-btn" onClick={() => navigate("/mypage/edit")}>
            뷰티 프로필 수정
          </button>
        </div>
        <div className="summary-section">
          <div onClick={() => navigate("/mypage/reviews")}>
            나의 리뷰
            <br />
            {reviewCount}
          </div>
          <div onClick={() => navigate("/mypage/scrap-articles")}>
            관심 아티클
            <br />
            {scrapCount}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyPageMain;
