import React from "react";
import "./ReviewCard.css";
import { useNavigate } from "react-router-dom";


function ReviewCard({ user, product, content, date, onLike }) {

  const nav =useNavigate();// 페이지 이동 함수

    const reviews = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        user: { image: "/images/user1.png", nickname: `유저${i+1}`, age: 20+i, skin: "복합성", gender: "여" },
        product: "테스트 제품",
        content: {
          
          title: `제목${i+1}`,
          body: "리뷰 본문입니다. 샘플 텍스트.",
          likes: 3 + i
        },
        date: "2025.04.18"
      }));


       // 별점 렌더링 함수
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= score ? "" : "gray"}`}>★</span>
      );
    }
    return stars;
  };


    return (
      <div className="review-card">
        <div className="review-header">
          <img src={user.image} alt="프로필" className="user-image" />
          <div className="user-info">
            <span className="nickname">{user.nickname}</span>
            <span className="meta">{user.age}세 ・ {user.skin} ・ {user.gender}</span>
          </div>
          <span className="review-date">{date}</span>
        </div>
  

    {/* 별점 추가 */}
    <div className="star-rating">{renderStars(content.rating)}</div>

        <div className="product-info" onClick={() => nav(`/product/${1}`)}>
        <img src={product.image} alt={product.name} className="product-thumbnail" />
        <div className="product-details">
          <div className="product-name">{product.name}</div>
          <div className="product-brand">{product.brand}</div>
        </div>
      </div>


        {/* <div className="product-name">{product}</div> */}
        <div className="review-title">“ {content.title} ”</div>
        <div className="review-body">{content.body}</div>
  
        <div className="review-footer">
          <button className="like-button" onClick={onLike}>❤️ {content.likes}</button>
        </div>
      </div>
    );
  }


// function ReviewCard({ user, product, content, date, onLike }) {
//   return (
//     <div className="review-card">
//       <div className="review-header">
//         <img src={user.image} alt="user" className="user-image" />
//         <div className="user-info">
//           <span className="nickname">{user.nickname}</span>
//           <span className="meta">{user.age}세 · {user.skin} · {user.gender}</span>
//         </div>
//         <div className="review-date">{date}</div>
//       </div>

//       <div className="product-name">{product}</div>
//       <div className="review-title">“ {content.title} ”</div>
//       <p className="review-body">{content.body}</p>

//       <div className="review-footer">
//         <button className="like-button" onClick={onLike}>
//           ❤️ {content.likes}
//         </button>
//       </div>
//     </div>
//   );
// }

export default ReviewCard;
