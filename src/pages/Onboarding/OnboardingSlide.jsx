import React from 'react';
import './Onboarding.css';

function OnboardingSlide({ image, title, description }) {
  return (
    <div className="onboarding-slide fade-in">
      <img src={image} alt="온보딩 이미지" className="onboarding-image" />
      <h2 className="onboarding-title">{title}</h2>
      <p className="onboarding-subtitle">{description}</p>
    </div>
  );
}

export default OnboardingSlide;
