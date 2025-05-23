// src/pages/MyPage/MyScrapArticles.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchScrapArticles } from "../../api/articleApi";
import "./MyScrapArticles.css";
import placeholderImage from "../../assets/images/article1.png"; // 예시 이미지

function MyScrapArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScrapArticles()
      .then((res) => {
        if (res?.isSuccess) {
          setArticles(res.result || []);
        } else {
          console.error("관심 아티클 조회 실패", res);
        }
      })
      .catch((err) => {
        console.error("API 에러", err);
      });
  }, []);

  return (
    <div className="scrap-articles-container">
      <Header title="관심 아티클" />
      <div className="scrap-article-list">
        {articles.length === 0 ? (
          <div className="empty">스크랩한 아티클이 없습니다.</div>
        ) : (
          articles.map((article, index) => (
            <div className="scrap-article-card" key={index}>
              <img
                src={article.articleImageUrl || placeholderImage}
                alt={article.articleName}
                className="article-image"
              />
              {/* <div className="article-info">
                <div className="article-title">{article.articleName}</div>
                <div className="article-tag">{article.articleTag}</div>
                <span className="article-tag-label">{article.articleTag}</span>
              </div> */}
              <div className="article-content">
                <div className="article-title-row">
                  <p className="article-title">{article.articleName}</p>
                  <span className="article-tag-label">
                    {article.articleTag}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyScrapArticles;
