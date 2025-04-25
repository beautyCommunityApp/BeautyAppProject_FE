import React from "react";

import { useNavigate,useParams } from "react-router-dom";
import "./../Product/ProductDetail.css";
import Header from "../../components/Header";
import review from "../../assets/images/review1.png";
import DetailImg from "../../assets/images/DetailImage.png";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

import off_h from "../../assets/images/off_h.png";
import searchIconImg from "../../assets/images/searchIcon.png";





function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    // 백엔드 서버 꺼져있는 경우, mock 데이터로 테스트
    const mockData = {
      imageUrl: DetailImg,
      brandInfo: { name: "더자연" , id: 1,   },
      name: "블루 아가베 포어 에센스 토너",
      explanation: "촉촉히 채우기 전 쿨하게 비워내는 모공 관리 비건 부스터",
      price: 25500,
      capacity: 200,
      reviewStatistics: {
        avgStar: 4.5,
        reviewCount: 12
      }
    };
  
    // 실제 API 호출 주석 처리
    // const fetchProductDetail = async () => {
    //   try {
    //     const token = localStorage.getItem("accessToken");
    //     const response = await axios.get(
    //       `http://localhost:8080/app/api/cosmetics/${id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     setProductData(response.data.result);
    //   } catch (error) {
    //     console.error("제품 상세 조회 실패", error);
    //   }
    // };
  
    // fetchProductDetail();
    
    // 대신 Mock 데이터 세팅
    setProductData(mockData);
  }, [id]);
  
  // useEffect(() => {
  //   const fetchProductDetail = async () => {
  //     try {
  //       const token = localStorage.getItem("accessToken");
  //       const response = await axios.get(
  //         `https://your-api-domain.com/app/api/cosmetics/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setProductData(response.data.result);
  //     } catch (error) {
  //       console.error("제품 상세 조회 실패", error);
  //     }
  //   };

  //   fetchProductDetail();
  // }, [id]);

  return (
    <div>
      <div className="product-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h3 className="header-title">제품상세페이지</h3>
        {/* <button className="search-button" onClick={() => alert("검색 예정!")}>🔍</button> */}
        <div className="search-button">
        <img src ={searchIconImg} onClick={() => alert("검색 예정!")}/></div>
      </div>

      {productData && (
        <div className="product-detail-container">
          <div className="cenP">  
             <img src={productData.imageUrl} alt="제품 이미지" className="product-image" />
          
             </div>
            <p>{productData.brandInfo.name}</p>
          <h2>{productData.name}</h2>
          <p>{productData.explanation}</p>
           <div className="price-and-icon">
          <p><strong>{productData.price.toLocaleString()}원</strong> / {productData.capacity}ml  </p>
           <img src={off_h}/>
         </div> 
         {/* <div className="price-and-icon">
  <p>
    <strong>{productData.price.toLocaleString()}원</strong> / {productData.capacity}ml
  </p>
  <img src={off_h} alt="찜" />
</div> */}

          {/* 🔽 얇은 선 */}
          <hr className="separator-line" />

          {/* 🔽 별점 + 평균 별점 */}
          <div className="review-summary">
            <span className="stars-col">
              {"⭐".repeat(Math.round(productData.reviewStatistics.avgStar))}
              
            </span>
            <span className="avg-star">
              {productData.reviewStatistics.avgStar.toFixed(2)}
            </span>
          </div>

          {/* 🔽 리뷰 개수 */}
          <div className="review-count">
            {productData.reviewStatistics.reviewCount}개 리뷰 {'>'}
          </div>

          <div className="review-actions">
            <Button text="리뷰 작성" onClick={() => navigate(`/product/${id}/write-review`)} />
            <Button text="리뷰 조회" onClick={() => navigate(`/product/${id}/reviews`)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetail;