// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchArticleDetail } from "../../api/articleApi";
// import "./ArticleDetail.css";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// function ArticleDetail() {
//   const { articleId } = useParams();
//   const [article, setArticle] = useState(null);

//   useEffect(() => {
//     const getArticle = async () => {
//       try {
//         const res = await fetchArticleDetail(articleId);
//         if (res.isSuccess) {
//           console.log("🧾 article 응답:", res.result); // 확인용
//           console.log("✅ article.comments:", res.result.comments);
//           setArticle(res.result);
//         }
//       } catch (err) {
//         console.error("❌ 아티클 상세 조회 실패", err);
//         console.log("S article 응답:", res.result); // 확인용
//         console.log(" article.comments:", res.result.comments);
//       }
//     };
//     getArticle();
//   }, [articleId]);

//   const articleHandleSubmit = () => {
//     alert("등록준비중입니다.");
//   };

//   if (!article) return <div>Loading...</div>;

//   return (
//     <>
//       <Header />
//       <div className="article-detail-container">
//         <img
//           src={article.articleImageUrl}
//           alt={article.articleName}
//           className="article-main-img"
//         />

//         <div className="article-text">
//           <div className="article-title-row">
//             <h2 className="article-title">{article.articleName}</h2>
//             <span className="article-tag">{article.articleTag}</span>
//           </div>

//           <p className="article-body">{article.articleContent}</p>

//           {/* 에디터 작성자 부분  아티클 등록한 대상자 */}
//           {/* {article.editor && (
//             <div className="article-editor">
//               <img
//                 src={article.editor.profileImageUrl || "/default/editor.png"}
//                 alt={`에디터 ${article.editor.name}`}
//                 className="editor-img"
//               />
//               <div className="editor-info">
//                 <div className="editor-credit">CREDIT</div>
//                 <div className="editor-name">EDITOR {article.editor.name}</div>
//               </div>
//             </div>
//           )} */}

//           {/* 수정 후 */}
//           {article.writerName && (
//             <div className="article-editor">
//               <img
//                 src="/dummy/editor.png" // 고정값 또는 기본 이미지
//                 alt={`에디터 ${article.writerName}`}
//                 className="editor-img"
//               />
//               <div className="editor-info">
//                 <div className="editor-credit">CREDIT</div>
//                 <div className="editor-name">EDITOR {article.writerName}</div>
//               </div>
//             </div>
//           )}

//           {article.comments && article.comments.length > 0 && (
//             <div className="article-comments">
//               <h3 className="comment-count">
//                 댓글 {article.comments.length}개
//               </h3>
//               <ul className="comment-list">
//                 {article.comments.map((comment) => (
//                   <li key={comment.id} className="comment-item">
//                     <img
//                       src={comment.profileImageUrl || "/default/profile.png"}
//                       alt={comment.nickname}
//                       className="comment-profile"
//                     />
//                     <div className="comment-content">
//                       <div className="comment-header">
//                         <span className="nickname">{comment.nickname}</span>
//                         <span className="meta">
//                           {comment.age}세 · {comment.skinType} ·{" "}
//                           {comment.gender}
//                         </span>
//                       </div>
//                       <p className="comment-text">{comment.text}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <button className="comment-button" onClick={articleHandleSubmit}>
//                 댓글 작성
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default ArticleDetail;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchArticleDetail, toggleArticleLike } from "../../api/articleApi";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import "./ArticleDetail.css";

// import likeOnIcon from "../../assets/images/like_on.png";
// import likeOffIcon from "../../assets/images/like_off.png";

// function ArticleDetail() {
//   const { articleId } = useParams();
//   const [article, setArticle] = useState(null);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);

//   useEffect(() => {
//     const getArticle = async () => {
//       try {
//         const res = await fetchArticleDetail(articleId);
//         if (res.isSuccess) {
//           const data = res.result;
//           setArticle(data);
//           setIsLiked(data.isLiked);
//           setLikeCount(data.likeCount);
//         }
//       } catch (err) {
//         console.error("❌ 아티클 상세 조회 실패", err);
//       }
//     };
//     getArticle();
//   }, [articleId]);

//   const handleLikeToggle = async () => {
//     try {
//       await toggleArticleLike(articleId);
//       setIsLiked(!isLiked);
//       setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
//     } catch (err) {
//       console.error("❌ 좋아요 토글 실패", err);
//     }
//   };

//   const articleHandleSubmit = () => {
//     alert("댓글 작성 화면으로 이동 예정입니다.");
//   };

//   if (!article) return <div>Loading...</div>;

//   return (
//     <>
//       <Header />
//       <div className="article-detail-container">
//         <img
//           src={article.articleImageUrl}
//           alt={article.articleName}
//           className="article-main-img"
//         />

//         <div className="article-text">
//           <div className="article-title-row">
//             <h2 className="article-title">{article.articleName}</h2>
//             <span className="article-tag">{article.articleTag}</span>
//           </div>

//           <p className="article-body">{article.articleContent}</p>

//           {article.writerName && (
//             <div className="article-editor">
//               <img
//                 src="/dummy/editor.png"
//                 alt={`에디터 ${article.writerName}`}
//                 className="editor-img"
//               />
//               <div className="editor-info">
//                 <div className="editor-credit">CREDIT</div>
//                 <div className="editor-name">EDITOR {article.writerName}</div>
//               </div>
//             </div>
//           )}
//         </div>

//         {article.comments && article.comments.length > 0 && (
//           <div className="article-comments">
//             <h3 className="comment-count">댓글 {article.comments.length}개</h3>
//             <ul className="comment-list">
//               {article.comments.map((comment) => (
//                 <li key={comment.id} className="comment-item">
//                   <img
//                     src={comment.profileImageUrl || "/default/profile.png"}
//                     alt={comment.nickname}
//                     className="comment-profile"
//                   />
//                   <div className="comment-content">
//                     <div className="comment-header">
//                       <span className="nickname">{comment.nickname}</span>
//                       <span className="meta">
//                         {comment.age}세 · {comment.skinType} · {comment.gender}
//                       </span>
//                     </div>
//                     <p className="comment-text">{comment.text}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* 하단 좋아요 하트 */}
//         <div className="article-footer">
//           <div className="like-section" onClick={handleLikeToggle}>
//             <img
//               src={isLiked ? likeOnIcon : likeOffIcon}
//               alt="좋아요"
//               className="like-icon"
//             />
//             <span className="like-count">{likeCount}</span>
//           </div>
//         </div>

//         {/* 댓글 작성 버튼 */}
//         <div className="comment-write-fixed">
//           <button className="comment-write-button" onClick={articleHandleSubmit}>
//             댓글 작성
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default ArticleDetail;
