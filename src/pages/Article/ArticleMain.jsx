import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api/articleApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./ArticleMain.css";

const TAGS = ["NEW", "BEST", "#전문가꿀팁", "#뷰티소식", "#에디터찐템"];

function ArticleMain() {
  const [articles, setArticles] = useState([]);
  const [selectedTag, setSelectedTag] = useState("NEW");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetchArticles();
        if (res.data.isSuccess) {
          setArticles(res.data.result.content);
        }
      } catch (err) {
        console.error("아티클 데이터 불러오기 실패", err);
      }
    };
    getArticles();
  }, []);

  const filteredArticles =
    selectedTag === "NEW"
      ? articles
      : articles.filter((a) => a.articleTag === selectedTag);

  return (
    <>
      <Header />
      <div className="article-main-container">
        <h1 className="title">BeautemTalk</h1>
        <div className="tag-group">
          {TAGS.map((tag) => (
            <button
              key={tag}
              className={`tag-button ${selectedTag === tag ? "active" : ""}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="article-list">
          {filteredArticles.map((item, idx) => (
            <div key={idx} className="article-card">
              <img
                src={item.articleImageUrl}
                alt={item.articleName}
                className="article-image"
              />
              <div className="article-content">
                <p className="article-title">{item.articleName}</p>
                <p className="article-tag-label">{item.articleTag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ArticleMain;
