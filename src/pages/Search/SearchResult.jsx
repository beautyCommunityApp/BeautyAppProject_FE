// src/pages/Search/SearchResult.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { fetchCosmeticsByCategory } from "../../api/cosmeticApi";
import searchIcon from "../../assets/images/searchIcon.png";
import mockDataImg from "../../assets/images/review1.png";
import StarR from "../../assets/images/StarRating.png";
import ArrowLeftImg from "../../assets/images/Arrow Left.png";
import "./Search.css";
import Footer from "../../components/Footer";

const mockProducts = [
  {
    brandInfo: { name: "다자연" },
    reviewStatistics: { avgStar: 4.5 },
    imageUrl: mockDataImg,
    name: "토너A",
    price: 15000,
    capacity: 200,
  },
  {
    brandInfo: { name: "다자연" },
    reviewStatistics: { avgStar: 4.0 },
    imageUrl: mockDataImg,
    name: "토너B",
    price: 25000,
    capacity: 300,
  },
  // …더 추가…
];

export default function SearchResult() {
  const navigate = useNavigate();
  const { search } = useLocation();
  // URL 파라미터 우선으로 초기값 설정 (페이지 로드시)
  const initial = new URLSearchParams(search).get("keyword") || "";

  // 1) 사용자가 입력하는 값
  const [searchTerm, setSearchTerm] = useState(initial);
  // 2) 디바운스된(지연된) 검색어
  const debouncedTerm = useDebounce(searchTerm, 300);
  // 3) 결과 리스트
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // 입력값이 바뀔 때마다 URL 동기화 (선택)
  useEffect(() => {
    // URL 바꾸려면, 주석 해제하세요
    // navigate(`/search/result?keyword=${encodeURIComponent(searchTerm)}`, { replace: true });
    console.log("searchTerm:", searchTerm, "debouncedTerm:", debouncedTerm);
  }, [searchTerm, navigate]);

  useEffect(() => {
    if (!debouncedTerm) {
      setProducts([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    // === [공통] 카테고리명 → ID 매핑 ===
    const categoryMap = {
      토너: 1,
      에센스: 2,
      세럼: 3,
      앰플: 4,
      로션: 5,
      크림: 6,
      클렌저: 7,
      클렌징폼: 8,
      클렌징오일: 9,
      선크림: 10,
      팩: 11,
      마스크팩: 12,
      아이크림: 13,
      미스트: 14,
      바디로션: 15,
      바디워시: 16,
      헤어에센스: 17,
      샴푸: 18,
      컨디셔너: 19,
    };
    const catId = categoryMap[debouncedTerm];

    // === [테스트용] 목데이터 필터링 ===
    // ✅ 백엔드 연결 시 이 블록을 주석 처리하세요
    const filtered = mockProducts.filter(
      (p) =>
        p.name.includes(debouncedTerm) ||
        p.brandInfo.name.includes(debouncedTerm)
    );
    setProducts(filtered);
    setLoading(false);
    return;

    /*
    // ✅ 백엔드 연결 시 이 아래 주석을 해제하세요
  
    if (!catId) {
      setProducts([]);
      setError("❌ 해당 키워드는 카테고리와 일치하지 않아요.");
      setLoading(false);
      return;
    }
  
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setProducts([]);
      setError("🔒 로그인 정보가 없습니다. 다시 로그인해주세요.");
      setLoading(false);
      return;
    }
  
    fetchCosmeticsByCategory(catId, token, 0)
      .then((res) => {
        if (res.data.isSuccess) {
          setProducts(res.data.result.content);
        } else {
          setError("⚠️ 데이터 요청 실패: " + res.data.responseMessage);
          setProducts([]);
        }
      })
      .catch((err) => {
        setError("🚨 서버 오류: " + (err.response?.status || "Unknown"));
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
    */
  }, [debouncedTerm]);
  {
    error && (
      <p className="search-no-result" style={{ color: "#e74c3c" }}>
        {error}
      </p>
    );
  }

  return (
    <div className="search-page-wrapper-top">
      <div className="search-search-page">
        {/* 검색 헤더 */}
        <div className="search-search-header">
          {/* <button onClick={() => navigate(-1)} className="back-button">
            <img src={ArrowLeftImg} alt="검색" className="search-icon" />
          </button> */}
          <button onClick={() => navigate(-1)} className="search-back-button">
            <img src={ArrowLeftImg} alt="뒤로가기" />
          </button>

          <div className="search-input-wrapper">
            <img src={searchIcon} alt="검색" className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 빈 상태 */}
        {!debouncedTerm && (
          <div className="search-empty-state">
            {/* <img src={searchIcon} alt="검색 아이콘" width={48} height={48} /> */}
          </div>
        )}

        {/* 로딩 */}
        {debouncedTerm && loading && (
          <p className="search-loading">로딩 중...</p>
        )}

        {/* 결과 없음 */}
        {debouncedTerm && !loading && products.length === 0 && (
          <p className="search-no-result">
            “{debouncedTerm}” 검색 결과가 없습니다.
          </p>
        )}

        {/* 결과 있음 */}
        {debouncedTerm && !loading && products.length > 0 && (
          <>
            <div className="section-header">
              <span>제품</span>
              <span className="arrow">›</span>
            </div>
            <div className="search-product-list">
              {products.map((item, idx) => (
                <div key={idx} className="search-product-card">
                  <div className="search-star-badge">
                    <img src={StarR} alt="별점" className="star-badge-icon" />
                    <span className="star-badge-value">
                      {item.reviewStatistics.avgStar.toFixed(1)}
                    </span>
                  </div>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="search-product-image"
                  />
                  <div className="search-product-info">
                    <div className="search-brand-name">
                      {item.brandInfo.name}
                    </div>
                    <div className="search-product-name">{item.name}</div>
                    <div className="search-product-price">
                      {item.price.toLocaleString()}원 {item.capacity}ml
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="search-footer-fixed">
        <Footer />
      </div>
    </div>
  );
}
