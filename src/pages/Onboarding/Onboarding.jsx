import React, { useState } from "react";
import "./Onboarding.css";
import OnboardingSlide from "./OnboardingSlide";

import image1 from "../../assets/images/onboarding1.png";
import image2 from "../../assets/images/onboarding2.png";
import image3 from "../../assets/images/onboarding3.png";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: image1,
    title: "가장 솔직한 뷰티템 커뮤니티",
    description:
      "화장품 정보부터 솔직한 리뷰까지,\n나에게 딱 맞는 뷰티템을 찾아보세요!",
  },
  {
    image: image2,
    title: "리뷰 기반 추천",
    description:
      "진짜 사용자들의 리뷰를 통해\n나만의 추천 리스트를 받아보세요.",
  },
  {
    image: image3,
    title: "다양한 뷰티 콘텐츠",
    description: "트렌디한 뷰티 콘텐츠와\n전문가의 팁까지 한 번에!",
  },
];

function Onboarding() {
  // 현재 슬라이드 인덱스를 관리하는 상태
  const [currentSlide, setCurrentSlide] = useState(0);

  const nav = useNavigate(); // 페이지 이동을 위한 훅

  // '다음' 버튼 클릭 시 실행되는 함수
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      // 아직 마지막 슬라이드가 아니면 다음 슬라이드로 이동
      setCurrentSlide((prev) => prev + 1);
    } else {
      // 마지막 슬라이드인 경우 로그인 화면으로 이동
      console.log("로그인 화면으로 이동");
      nav("/login?force=true");
    }
  };
  // 온보딩에서
  // nav("/login?force=true");

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-top">
        <img
          src={slides[currentSlide].image} // 현재 슬라이드에 해당하는 이미지 표시
          alt="onboarding"
          className="onboarding-image"
        />
      </div>

      <div className="onboarding-bottom">
        <div className="onboarding-content">
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].description}</p>

          <div className="onboarding-indicator">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
              />
            ))}
          </div>

          <button className="onboarding-button" onClick={handleNext}>
            {currentSlide === slides.length - 1 ? "시작하기" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
