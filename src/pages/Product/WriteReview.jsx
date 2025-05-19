import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../Product/WriteReview.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DetailImg from "../../assets/images/review1.png";

import saveIcon from "../../assets/images/save-icon.png"; // 실제 경로에 맞게 수정
import { submitReview } from "../../api/reviewApi";
import { fetchProductDetail } from "../../api/productApi";
import { isMockMode } from "../../utils/envUtils";

function WriteReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 별점, 본문 내용, 한줄평 상태값
  const [star, setStar] = useState(0);
  const [content, setContent] = useState("");
  const [oneLineReview, setOneLineReview] = useState("");

  //  제품 정보 상태 추가
  const [product, setProduct] = useState(null);

  console.log("id: " + id);

  // 페이지 진입 시 제품 상세 정보 불러오기
  useEffect(() => {
    // if (process.env.NODE_ENV === "development")
    if (isMockMode()) {
      // 개발환경에서는 mock 데이터 사용
      console.log("🧪 [Mock] 리뷰 데이터 사용 중");
      setProduct({
        imageUrl: DetailImg,
        name: "블루 아가베 포어 에센스 토너",
        brand: "다자연",
      });
      return;
    }
    // 실제 API 호출 (운영환경)
    const fetchData = async () => {
      try {
        const data = await fetchProductDetail(id);
        setProduct(data.result); // 또는 data.data.result
      } catch (err) {
        console.error("❌ 제품 정보 가져오기 실패", err);
      }
    };

    fetchData();
  }, [id]);

  // 리뷰 등록 버튼 클릭 시 호출
  const handleSubmit = async () => {
    // 유효성 검사
    if (!star || content.length < 20 || !oneLineReview.trim()) {
      alert("모든 항목을 정확히 입력해주세요.");
      return;
    }

    // 개발 환경일 경우 - API 호출 없이 이동만
    if (process.env.NODE_ENV === "development") {
      console.log("💡 로컬 테스트용 리뷰 등록 완료!");
      navigate(`/home/product/${id}/reviews`);
      return;
    }

    // 운영 환경 - 실제 서버에 리뷰 등록 요청
    try {
      const data = await submitReview(id, { star, content, oneLineReview });

      if (data.isSuccess) {
        navigate(`/home/product/${id}/reviews`);
      } else {
        alert(data.responseMessage || "리뷰 등록에 실패했습니다.");
      }
    } catch (err) {
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  // 페이지 진입 시 localStorage에 임시 저장된 리뷰 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem("tempReview");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStar(parsed.star || 0);
      setContent(parsed.content || "");
      setOneLineReview(parsed.oneLineReview || "");
    }
  }, []);

  // 임시저장 아이콘 클릭 시 로컬스토리지에 저장
  const handleTempSave = () => {
    const tempData = {
      star,
      content,
      oneLineReview,
    };
    localStorage.setItem("tempReview", JSON.stringify(tempData));
    alert("임시 저장되었습니다.");
    // 입력한 리뷰 정보가 이미지 버튼 클릭 시 localStorage에 저장되고, 페이지 새로고침 후에도 복원됩니다.
  };
  return (
    <div>
      <div className="write-review-page">
        {/* <Header title="리뷰 작성"  prevPath={`/product/${id}`} /> */}
        {/* 상단 헤더 - 뒤로가기 + 타이틀 + 우측 임시저장 아이콘 */}
        <Header
          prevPath={`/home/product/${id}`}
          title="리뷰 작성"
          rightChild={
            <img
              src={saveIcon} // import한 이미지 경로
              alt="임시저장"
              onClick={handleTempSave}
              className="save-button-img"
            />
          }
        />

        <div className="writeGap">
          {/* 제품 정보 박스 */}
          <div className="review-box">
            {/* <h4>블루 아가베 포어 에센스 토너</h4>
          <p className="brand-name">다자연</p> */}
            <div className="product-infow">
              <img src={product?.imageUrl} alt="제품 이미지" />
              <div className="product-detailsw">
                <h4>{product?.name || "제품명 로딩 중..."}</h4>
                <p className="brand-name">
                  {product?.brand || "브랜드명 로딩 중..."}
                </p>
              </div>
            </div>
            {/* <img src={product.imageUrl} alt="제품 이미지" className="product-image" /> */}
          </div>

          {/* 별점 선택 영역 */}
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

          {/* 리뷰 본문 입력 */}
          <textarea
            placeholder="최소 20자 이상 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
          />
          <div className="counter">{content.length} / 1000</div>

          {/* 한줄평 입력 */}
          <p className="section-title">한줄평을 작성해 주세요.</p>
          <input
            type="text"
            value={oneLineReview}
            onChange={(e) => setOneLineReview(e.target.value)}
            maxLength={20}
            placeholder="좋아요"
          />
          <div className="counter">{oneLineReview.length} / 20</div>

          {/* 리뷰 등록 버튼 */}
          <button
            className={`submit-button ${
              content.length >= 20 && star && oneLineReview ? "active" : ""
            }`}
            onClick={handleSubmit}
            disabled={!(content.length >= 20 && star && oneLineReview)}
          >
            리뷰 등록하기
          </button>
        </div>
      </div>
      {/* 하단 고정 Footer */}
      <Footer />
    </div>
  );
}

export default WriteReview;
