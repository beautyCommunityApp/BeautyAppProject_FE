// src/components/StarRating.jsx
import React from "react";
// import fullStar from /"../assets/icons/star-full.svg";
// import halfStar from "../assets/icons/star-half.svg";
// import emptyStar from "../assets/icons/star-empty.svg";
import StarR from "./../assets/images/StarRating.png";

export default function StarRating({ rating }) {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2; // 0.5 단위 반올림
  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) stars.push(StarR);
    else if (i - 0.5 === rounded) stars.push(StarR);
    else stars.push(StarR);
  }
  return (
    <div className="star-rating">
      {stars.map((src, idx) => (
        <img key={idx} src={src} alt="" className="star-icon" />
      ))}
      <span className="star-value">{rating.toFixed(1)}</span>
    </div>
  );
}
