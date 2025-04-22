import React from "react";

import { useNavigate,useParams } from "react-router-dom";
import "./../Product/ProductDetail.css";
import Header from "../../components/Header";
import review from "../../assets/images/review1.png";
import DetailImg from "../../assets/images/DetailImage.png";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer";

function ProductDetail(){
    const { id } = useParams(); // URL에서 productId 가져오기
    const navigate = useNavigate();
  
    return (
        <div>
            {/* <Header title="제품상세페이지" prevPath="/home" /> */}
            <div className="product-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h3 className="header-title">제품상세페이지</h3>
        <button className="search-button" onClick={() => alert("검색 페이지 연결 예정!")}>🔍</button>
      </div>

      <div className="product-detail-container">
        <img src={DetailImg}  alt="제품 이미지" className="product-image" />
        <p> 더자연</p>
        <h2>블루 아가베 포어 에센스 토너</h2>
        <p>촉촉히 채우기 전 쿨하게 비워내는 모공 관리 비건 부스터</p>
        <p><strong>25,500원</strong> / 200ml</p>
  
        <div className="review-actions">
          {/* <button onClick={() => navigate(`/product/${id}/write-review`)}>리뷰 작성</button>
          <button onClick={() => navigate(`/product/${id}/reviews`)}>리뷰 조회</button> */}
          <Button  text="리뷰 작성" onClick={() => navigate(`/product/${id}/write-review`)}></Button>
          <Button text="리뷰 조회" onClick={() => navigate(`/product/${id}/reviews`)} > </Button>
        </div>
      </div>

        <Footer></Footer>
      </div>
    );
  }
export default ProductDetail;