import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api/articleApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./ArticleMain.css";
import { useNavigate } from "react-router-dom";

import searchIconImg from "../../assets/images/searchIcon.png";
import newBadgeImg from "../../assets/images/newBadge.png";

function ArticleMain() {
  const [articles, setArticles] = useState([]);
  const [selectedTag, setSelectedTag] = useState("NEW");
  const [tags, setTags] = useState(["NEW"]);
  const navigate = useNavigate();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetchArticles();
        if (res.data.isSuccess) {
          const allArticles = res.data.result.content;
          setArticles(allArticles);

          if (process.env.NODE_ENV === "development") {
            const dynamicTags = extractTags(allArticles);
            setTags(dynamicTags);
          } else {
            setTags(["NEW", "BEST", "#전문가꿀팁", "#뷰티소식", "#에디터찐템"]);
          }
        }
      } catch (err) {
        console.error("아티클 데이터 불러오기 실패", err);
      }
    };
    getArticles();
  }, []);

  const extractTags = (articles) => {
    const tags = new Set();
    articles.forEach((a) => {
      if (a.articleTag) tags.add(a.articleTag);
    });
    return ["NEW", ...Array.from(tags)];
  };

  // const filteredArticles =
  //   selectedTag === "NEW"
  //     ? articles
  //     : articles.filter((a) => a.articleTag === selectedTag);
  const isNewArticle = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };
  const filteredArticles = articles.filter((a) => {
    if (selectedTag === "NEW") {
      return isNewArticle(a.createdAt); // ✅ NEW 버튼 클릭 시: 최근 등록된 아티클만!
    } else {
      return a.articleTag === selectedTag;
    }
  });

  // const isNewArticle = (createdAt) => {
  //   const now = new Date();
  //   const created = new Date(createdAt);
  //   const diffDays = (now - created) / (1000 * 60 * 60 * 24); // 밀리초 → 일(day)
  //   return diffDays <= 7; // 최근 7일 이내
  // };
  return (
    <>
      {/* <Header /> */}
      <div className="article-page-wrapper">
        <div className="logo-row">
          <h1 className="logo">BeautemTalk</h1>
          <div className="search-icon">
            <img src={searchIconImg} onClick={() => navigate("/search")} />
          </div>
        </div>
        <div className="article-main-container">
          {/* <h1 className="title">BeautemTalk</h1> */}
          <div className="tag-group">
            {tags.map((tag) => (
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
              <div
                key={idx}
                className="article-card"
                onClick={() => navigate(`/articles/${item.articleId}`)}
              >
                {/* <img
                src={item.articleImageUrl}
                alt={item.articleName}
                className="article-image"
              /> */}
                <div className="article-image-wrapper">
                  <img
                    src={item.articleImageUrl}
                    alt={item.articleName}
                    className="article-image"
                  />
                  {item.isNew && (
                    <img src={newBadgeImg} className="new-badge" />
                  )}
                  {isNewArticle(item.createdAt) && (
                    <img src={newBadgeImg} alt="NEW" className="new-badge" />
                  )}
                  {/* <img src={newBadgeImg} alt="NEW" className="new-badge" /> */}
                </div>
                <div className="article-content">
                  <div className="article-title-row">
                    <p className="article-title">{item.articleName}</p>
                    <span className="article-tag-label">{item.articleTag}</span>
                  </div>
                  <p className="article-subtitle">
                    들뜸, 밀림없는 수분가득 화잘먹 썬크림 (이건 지금은
                    고정값이지만 실제론 item에서 받아야함)
                  </p>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ArticleMain;
