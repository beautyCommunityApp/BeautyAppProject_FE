// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import "./../Product/WriteReview.css";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import saveIcon from "../../assets/images/save-icon.png";
// import { updateReview } from "../../api/reviewApi";
// import DetailImg from "../../assets/images/review1.png";
// import "./../Mypage/EditReview.css";

// function EditReview() {
//   const { reviewId } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const review = state?.review;
//   const cosmetic = state?.cosmetic;

//   const [star, setStar] = useState(review?.star || 0);
//   const [content, setContent] = useState(review?.reviewComment || "");
//   const [oneLineReview, setOneLineReview] = useState(
//     review?.oneLineReview || ""
//   );

//   const handleSubmit = async () => {
//     if (!star || content.length < 20 || !oneLineReview.trim()) {
//       alert("모든 항목을 정확히 입력해주세요.");
//       return;
//     }

//     try {
//       const data = await updateReview(reviewId, {
//         star,
//         content,
//         oneLineReview,
//       });

//       if (data.isSuccess) {
//         localStorage.removeItem(`tempReview-${reviewId}`); // 여기에 위치해야 함
//         alert("리뷰가 수정되었습니다.");
//         navigate("/mypage/reviews");
//       } else {
//         alert(data.responseMessage || "리뷰 수정 실패");
//       }
//     } catch (err) {
//       alert("리뷰 수정 중 오류 발생");
//     }
//   };

//   if (!review || !cosmetic) {
//     return (
//       <div className="write-review-page">리뷰 정보를 불러올 수 없습니다.</div>
//     );
//   }
//   console.log("🧾 review:", review);
//   console.log("🧾 cosmetic:", cosmetic);
//   // 저장
//   const handleTempSave = () => {
//     const tempData = { star, content, oneLineReview };
//     localStorage.setItem(`tempReview-${reviewId}`, JSON.stringify(tempData));
//     alert("임시 저장되었습니다.");
//   };

//   // 진입 시 복원
//   useEffect(() => {
//     const saved = localStorage.getItem(`tempReview-${reviewId}`);
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setStar(parsed.star || 0);
//       setContent(parsed.content || "");
//       setOneLineReview(parsed.oneLineReview || "");
//     }
//   }, [reviewId]);

//   return (
//     <div>
//       <div className="write-review-page">
//         <Header
//           title="리뷰 수정"
//           prevPath="/mypage/reviews"
//           rightChild={
//             <img
//               src={saveIcon}
//               alt="임시저장"
//               onClick={handleTempSave}
//               className="save-button-img"
//             />
//           }
//         />

//         <div className="writeGap">
//           {/* 제품 정보  cosmetic = {
//   brandName: "다자연",
//   cosmeticName: "블루 아가베 포어 에센스 토너",
//   cosmeticImageUrl: "/src/assets/images/review1.png"
// }*/}
//           <div className="review-box">
//             <div className="product-infow">
//               {/* <img src={cosmetic?.imageUrl} alt="제품 이미지" /> */}
//               <img src={cosmetic?.cosmeticImageUrl} />
//               <div className="product-detailsw">
//                 {/* <h4>{cosmetic?.name}</h4> */}
//                 <h4>{cosmetic?.cosmeticName}</h4>
//                 {/* <p className="brand-name">{cosmetic?.brand}</p> */}
//                 <p>{cosmetic?.brandName}</p>
//               </div>
//             </div>
//           </div>

//           {/* 별점 */}
//           <div className="sectionGap">
//             <p className="section-title">평점을 선택해 주세요.</p>
//             <div className="star-rating-st">
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <span
//                   key={num}
//                   className={`star ${star >= num ? "selected" : ""}`}
//                   onClick={() => setStar(num)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>

//             <p className="section-title">리뷰를 작성해 주세요.</p>
//           </div>

//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             maxLength={1000}
//           />
//           <div className="counter">{content.length} / 1000</div>

//           <p className="section-title">한줄평을 작성해 주세요.</p>
//           <input
//             type="text"
//             value={oneLineReview}
//             onChange={(e) => setOneLineReview(e.target.value)}
//             maxLength={20}
//           />
//           <div className="counter">{oneLineReview.length} / 20</div>

//           <button
//             className={`submit-button ${
//               content.length >= 20 && star && oneLineReview ? "active" : ""
//             }`}
//             onClick={handleSubmit}
//             disabled={!(content.length >= 20 && star && oneLineReview)}
//           >
//             리뷰 수정하기
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default EditReview;

import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./../Product/WriteReview.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import saveIcon from "../../assets/images/save-icon.png";
import { updateReview } from "../../api/reviewApi";
import DetailImg from "../../assets/images/review1.png";
import "./../Mypage/EditReview.css";
import SuccessModal from "../../components/SuccessModal"; // 추가: 성공 모달 import

function EditReview() {
  const { reviewId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const review = state?.review;
  const cosmetic = state?.cosmetic;

  const [star, setStar] = useState(review?.star || 0);
  const [content, setContent] = useState(review?.reviewComment || "");
  const [oneLineReview, setOneLineReview] = useState(
    review?.oneLineReview || ""
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false); //  추가: 모달 상태

  // 리뷰 수정 후 처리
  const handleSubmit = async () => {
    if (!star || content.length < 20 || !oneLineReview.trim()) {
      alert("모든 항목을 정확히 입력해주세요.");
      return;
    }

    try {
      const data = await updateReview(reviewId, {
        star,
        content,
        oneLineReview,
      });

      if (data.isSuccess) {
        localStorage.removeItem(`tempReview-${reviewId}`);
        setShowSuccessModal(true); //  alert 대신 모달 표시
      } else {
        alert(data.responseMessage || "리뷰 수정 실패");
      }
    } catch (err) {
      alert("리뷰 수정 중 오류 발생");
    }
  };

  // 임시 저장 기능
  const handleTempSave = () => {
    const tempData = { star, content, oneLineReview };
    localStorage.setItem(`tempReview-${reviewId}`, JSON.stringify(tempData));
    alert("임시 저장되었습니다.");
  };

  // 페이지 진입 시 임시 저장된 값 복원
  useEffect(() => {
    const saved = localStorage.getItem(`tempReview-${reviewId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setStar(parsed.star || 0);
      setContent(parsed.content || "");
      setOneLineReview(parsed.oneLineReview || "");
    }
  }, [reviewId]);

  if (!review || !cosmetic) {
    return (
      <div className="write-review-page">리뷰 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <div>
      <div className="write-review-page">
        <Header
          title="리뷰 수정"
          prevPath="/mypage/reviews"
          rightChild={
            <img
              src={saveIcon}
              alt="임시저장"
              onClick={handleTempSave}
              className="save-button-img"
            />
          }
        />

        <div className="writeGap">
          {/* 제품 정보 */}
          <div className="review-box">
            <div className="product-infow">
              <img src={cosmetic?.cosmeticImageUrl || DetailImg} />
              <div className="product-detailsw">
                <h4>{cosmetic?.cosmeticName}</h4>
                <p>{cosmetic?.brandName}</p>
              </div>
            </div>
          </div>

          {/* 별점 선택 */}
          <div className="sectionGap">
            <p className="section-title">평점을 선택해 주세요.</p>
            <div className="star-rating-st">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star ${star >= num ? "selected" : ""}`}
                  onClick={() => setStar(num)}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="section-title">리뷰를 작성해 주세요.</p>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
          />
          <div className="counter">{content.length} / 1000</div>

          <p className="section-title">한줄평을 작성해 주세요.</p>
          <input
            type="text"
            value={oneLineReview}
            onChange={(e) => setOneLineReview(e.target.value)}
            maxLength={20}
          />
          <div className="counter">{oneLineReview.length} / 20</div>

          <button
            className={`submit-button ${
              content.length >= 20 && star && oneLineReview ? "active" : ""
            }`}
            onClick={handleSubmit}
            disabled={!(content.length >= 20 && star && oneLineReview)}
          >
            리뷰 수정하기
          </button>
        </div>
      </div>

      <Footer />

      {/* ✅ 성공 모달 표시 */}
      {showSuccessModal && (
        <SuccessModal
          message="리뷰가 수정되었습니다."
          onConfirm={() => navigate("/mypage/reviews")}
        />
      )}
    </div>
  );
}

export default EditReview;
