import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../Product/ProductDetail.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/Button/Button";
import searchIconImg from "../../assets/images/searchIcon.png";
import DetailImg from "../../assets/images/DetailImage.png";
import ArrowLeft from "../../assets/images/Arrow Left.png";

import { FaStar } from "react-icons/fa";
import { isMockMode } from "../../utils/envUtils";
// 제품 상세 데이터 가져오는 API 함수
import { fetchProductDetail } from "../../api/productApi"; // 요렇게 import
import review from "../../assets/images/review1.png";
// (좋아요 관련 import는 삭제)

// import review from "../../assets/images/review1.png";

// import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // 제품 상세 정보를 저장할 상태
  const [productData, setProductData] = useState(null);

  // // 컴포넌트 마운트 시 API 호출
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 토큰 가져오기 (로그인 필요 시 사용)
  //       const token = localStorage.getItem("accessToken");

  //       // 제품 상세 정보 요청
  //       const data = await fetchProductDetail(id, token);

  //       // 받아온 데이터 상태에 저장
  //       setProductData(data);
  //     } catch (error) {
  //       console.error("제품 상세 조회 실패", error);
  //       // 실패했을 때 mockData로 대체 (선택사항)
  //       const mockData = {
  //         imageUrl: DetailImg,
  //         brandInfo: { name: "더자연", id: 1 },
  //         name: "블루 아가베 포어 에센스 토너",
  //         explanation: "촉촉히 채우기 전 쿨하게 비워내는 모공 관리 비건 부스터",
  //         price: 25500,
  //         capacity: 200,
  //         reviewStatistics: {
  //           avgStar: 4.5,
  //           reviewCount: 12,
  //         },
  //       };
  //       setProductData(mockData);
  //     }
  //   };
  //   // fetch 실행
  //   fetchData();
  // }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      // 백엔드 비활성화 상태에서는 mockData로 대체
      // if (
      //   import.meta.env.MODE === "development" &&
      //   import.meta.env.VITE_API_ACTIVE === "false"
      // )
      if (isMockMode()) {
        console.log("🧪 Mock 제품 상세 사용 중");
        const mockData = {
          imageUrl: DetailImg,
          brandInfo: { name: "더자연", id: 1 },
          name: "블루 아가베 포어 에센스 토너",
          explanation: "촉촉히 채우기 전 쿨하게 비워내는 모공 관리 비건 부스터",
          price: 25500,
          capacity: 200,
          reviewStatistics: {
            avgStar: 4.5,
            reviewCount: 12,
          },
        };
        setProductData(mockData);
        return;
      }

      // 실제 API 호출
      try {
        const res = await fetchProductDetail(id, token);
        const data = res.result ?? res; // 백엔드 구조에 따라 대응
        setProductData(data);
      } catch (err) {
        console.error("제품 상세 조회 실패", err);
      }
    };

    fetchData();
  }, [id]);
  console.log("🌐 MODE:", import.meta.env.MODE);
  console.log("🌐 VITE_API_ACTIVE:", import.meta.env.VITE_API_ACTIVE);
  return (
    <div className="product-page-wrapper">
      <Header
        prevPath={`/home`}
        title="제품상세페이지"
        rightChild={
          <img
            src={searchIconImg}
            onClick={() => navigate("/search")}
            alt="검색"
          />
        }
      />
      <div>
        {/* 상단 헤더: 뒤로가기, 페이지 제목, 검색 버튼 */}
        {/* <div className="product-detail-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ←
          </button>
          <h3 className="header-title">제품상세페이지</h3>
          <div className="search-button">
            <img
              src={searchIconImg}
              onClick={() => navigate("/search")}
              alt="검색"
            />
          </div>
        </div> */}

        {/* 제품 정보가 로딩된 후에만 렌더링 */}
        {productData && (
          <div className="product-detail-container">
            <div className="cenP">
              <img
                src={productData.imageUrl}
                alt="제품 이미지"
                className="product-image"
              />
            </div>
            {/* 브랜드명 */}
            {/* <p>{productData.brandInfo.name}</p> */}
            <p>{productData.brandInfo?.name}</p>
            {/* 제품명 */}
            <h2>{productData.name}</h2>
            {/* 제품 설명 */}
            <p>{productData.explanation}</p>
            {/* 가격 및 용량 */}
            {/* <div className="price-and-icon">
              <p>
                <strong>{productData.price.toLocaleString()}원</strong> /{" "}
                {productData.capacity}ml
              </p>
            </div> */}
            <div className="price-and-icon">
              <p>
                <strong>
                  {productData.price !== undefined
                    ? productData.price.toLocaleString()
                    : "가격 없음"}
                  원
                </strong>{" "}
                / {productData.capacity}ml
              </p>
            </div>

            <hr className="separator-line" />
            {/* 별점 평균 표시 */}
            <div className="review-summary">
              <span className="stars-col">
                {[
                  ...Array(
                    Math.round(productData.reviewStatistics?.avgStar || 0)
                  ),
                ].map((_, i) => (
                  <FaStar key={i} color="#FF616D" size={20} />
                ))}
              </span>
              <span className="avg-star">
                {productData.reviewStatistics?.avgStar?.toFixed(2) ?? "0.00"}
              </span>
            </div>

            {/* 리뷰 개수 */}
            <div
              className="product-review-count"
              onClick={() => navigate(`/home/product/${id}/reviews`)}
            >
              {productData.reviewStatistics?.reviewCount ?? 0}개 리뷰 {">"}
            </div>

            {/* 별점 평균 표시 */}
            {/* <div className="review-summary">
              <span className="stars-col">
                {[
                  ...Array(Math.round(productData.reviewStatistics.avgStar)),
                ].map((_, i) => (
                  <FaStar key={i} color="#FF616D" size={20} />
                ))}
              </span>
              <span className="avg-star">
                {productData.reviewStatistics.avgStar.toFixed(2)}
              </span>
            </div> */}

            {/* 리뷰 개수 */}
            {/* <div
              className="product-review-count"
              onClick={() => navigate(`/product/${id}/reviews`)}
            >
              {productData.reviewStatistics.reviewCount}개 리뷰 {">"}
            </div> */}
            {/* 버튼: 리뷰 작성, 리뷰 조회 */}
            <div className="review-actions">
              <Button
                text="리뷰 작성"
                onClick={() => navigate(`/home/product/${id}/write-review`)}
              />
              <Button
                text="리뷰 조회"
                onClick={() => navigate(`/home/product/${id}/reviews`)}
              />
            </div>
          </div>
        )}
        <div className="footer-fixed">
          {" "}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
