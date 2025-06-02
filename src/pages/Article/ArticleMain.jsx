// import React, { useEffect, useState } from "react";
// import { fetchArticles } from "../../api/articleApi";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import "./ArticleMain.css";
// import { useNavigate } from "react-router-dom";

// import searchIconImg from "../../assets/images/searchIcon.png";
// import newBadgeImg from "../../assets/images/newBadge.png";

// function ArticleMain() {
//   // 전체 아티클 데이터를 저장하는 상태
//   const [articles, setArticles] = useState([]);

//   // 현재 선택된 태그 (초기값: "NEW")
//   const [selectedTag, setSelectedTag] = useState("NEW");

//   // 화면에 노출할 태그 목록
//   const [tags, setTags] = useState(["NEW"]);

//   const navigate = useNavigate(); //페이지이동

//   // 최초 렌더링 시 아티클 데이터 불러오기
//   useEffect(() => {
//     const getArticles = async () => {
//       try {
//         const res = await fetchArticles(); // API 호출
//         if (res.data.isSuccess) {
//           // const allArticles = res.data.result.content;
//           // const allArticles = res.data.result;
//           setArticles(res.data.result.content || []); // content는 배열이어야 함
//           setArticles(allArticles); // 전체 아티클 저장

//           // 개발환경이면 아티클 데이터에서 태그 동적으로 추출
//           if (process.env.NODE_ENV === "development") {
//             const dynamicTags = extractTags(allArticles);
//             setTags(dynamicTags);
//           } else {
//             // 운영환경은 고정된 태그 목록 사용
//             setTags(["NEW", "BEST", "#전문가꿀팁", "#뷰티소식", "#에디터찐템"]);
//           }
//         }
//       } catch (err) {
//         console.error("아티클 데이터 불러오기 실패", err);
//       }
//     };
//     getArticles(); // 함수 호출
//   }, []);

//   // 아티클 리스트에서 중복 없는 태그만 추출하여 배열로 반환
//   const extractTags = (articles) => {
//     const tags = new Set(); // 중복 제거를 위해 Set 사용
//     articles.forEach((a) => {
//       if (a.articleTag) tags.add(a.articleTag);
//     });
//     return ["NEW", ...Array.from(tags)]; // "NEW" 태그는 항상 앞에 고정
//   };

//   // 아티클이 최근 등록된 것인지(7일 이내) 판단하는 함수
//   const isNewArticle = (createdAt) => {
//     const now = new Date(); // 현재 시간
//     const created = new Date(createdAt); // 아티클 등록일
//     const diffDays = (now - created) / (1000 * 60 * 60 * 24); // 시간 차이를 일(day) 단위로 계산
//     return diffDays <= 7; // 7일 이내면 true
//   };

//   // 현재 선택된 태그에 맞는 아티클 필터링
//   const filteredArticles = articles.filter((a) => {
//     if (selectedTag === "NEW") {
//       // NEW 태그 선택 시 최근 게시물만
//       return isNewArticle(a.createdAt);
//     } else {
//       // 그 외에는 해당 태그가 일치하는 아티클만
//       return a.articleTag === selectedTag;
//     }
//   });

//   // const isNewArticle = (createdAt) => {
//   //   const now = new Date();
//   //   const created = new Date(createdAt);
//   //   const diffDays = (now - created) / (1000 * 60 * 60 * 24); // 밀리초 → 일(day)
//   //   return diffDays <= 7; // 최근 7일 이내
//   // };
//   return (
//     <>
//       {/* <Header /> */}
//       <div className="article-page-wrapper">
//         {/* 상단 로고 및 검색 아이콘 영역 */}
//         <div className="logo-row">
//           <h1 className="logo">BeautemTalk</h1>
//           <div className="search-icon">
//             <img src={searchIconImg} onClick={() => navigate("/search")} />
//           </div>
//         </div>
//         <div className="article-main-container">
//           {/* 태그 버튼 그룹 */}
//           <div className="tag-group">
//             {tags.map((tag) => (
//               <button
//                 key={tag}
//                 className={`tag-button ${selectedTag === tag ? "active" : ""}`}
//                 onClick={() => setSelectedTag(tag)} // 태그 클릭 시 선택 상태 변경
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>

//           <div className="article-list">
//             {filteredArticles.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="article-card"
//                 onClick={() => navigate(`/articles/${item.articleId}`)}
//               >
//                 {/* <img
//                 src={item.articleImageUrl}
//                 alt={item.articleName}
//                 className="article-image"
//               /> */}
//                 <div className="article-image-wrapper">
//                   <img
//                     src={item.articleImageUrl}
//                     alt={item.articleName}
//                     className="article-image"
//                   />
//                   {item.isNew && (
//                     <img src={newBadgeImg} className="new-badge" />
//                   )}
//                   {/* 최근 7일 이내 등록된 경우 NEW 뱃지 노출 */}
//                   {isNewArticle(item.createdAt) && (
//                     <img src={newBadgeImg} alt="NEW" className="new-badge" />
//                   )}
//                   {/* <img src={newBadgeImg} alt="NEW" className="new-badge" /> */}
//                 </div>
//                 <div className="article-content">
//                   <div className="article-title-row">
//                     <p className="article-title">{item.articleName}</p>
//                     <span className="article-tag-label">{item.articleTag}</span>
//                   </div>
//                   {/* 현재는 고정값으로 노출 중이며, 추후 item.subtitle 같은 필드로 대체 */}
//                   <p className="article-subtitle">
//                     들뜸, 밀림없는 수분가득 화잘먹 썬크림 (이건 지금은
//                     고정값이지만 실제론 item에서 받아야함)
//                   </p>{" "}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default ArticleMain;
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

        if (res?.data?.isSuccess) {
          // ✅ 실서버 응답 구조가 배열이라면:
          const serverArticles = res.data.result;

          // ✅ Mock일 경우 content 배열 내부에 있음
          const mockArticles = res.data.result.content || []; // content가 없으면 빈 배열

          // ✅ 모든 케이스 대응
          const allArticles = Array.isArray(serverArticles)
            ? serverArticles
            : mockArticles;

          setArticles(allArticles);

          // 동적 태그 추출
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

  const extractTags = (articlesList) => {
    const tags = new Set();
    articlesList.forEach((a) => {
      if (a.articleTag) tags.add(a.articleTag);
    });
    return ["NEW", ...Array.from(tags)];
  };

  const isNewArticle = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const filteredArticles = Array.isArray(articles)
    ? articles.filter((a) => {
        if (selectedTag === "NEW") {
          return isNewArticle(a.createdAt);
        }
        return a.articleTag === selectedTag;
      })
    : [];

  return (
    <>
      <div className="article-page-wrapper">
        <div className="logo-row">
          <h1 className="logo">BeautemTalk</h1>
          <div className="search-icon">
            <img src={searchIconImg} onClick={() => navigate("/search")} />
          </div>
        </div>
        <div className="article-main-container">
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
            {filteredArticles.map((item) => (
              <div
                key={item.articleId}
                className="article-card"
                onClick={() => navigate(`/articles/${item.articleId}`)}
              >
                <div className="article-image-wrapper">
                  <img
                    src={item.articleImageUrl}
                    alt={item.articleName}
                    className="article-image"
                  />
                  {isNewArticle(item.createdAt) && (
                    <img src={newBadgeImg} alt="NEW" className="new-badge" />
                  )}
                </div>
                <div className="article-content">
                  <div className="article-title-row">
                    <p className="article-title">{item.articleName}</p>
                    <span className="article-tag-label">{item.articleTag}</span>
                  </div>
                  <p className="article-subtitle">
                    {/* 임시 고정값, 실제 subtitle 도입 시 대체 */}
                    들뜸, 밀림없는 수분가득 화잘먹 썬크림
                  </p>
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
