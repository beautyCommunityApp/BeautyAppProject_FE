import React from "react";
import "./QnACard.css";
import thumbsUpIcon from "./../assets/images/thumbs-up.svg";
import commentIcon from "./../assets/images/message-circle.svg";
import { useNavigate } from "react-router-dom";
function QnACard({ qna }) {
  const imageCount = qna.imageUrls?.length || 0;
  const hasThumbnail = imageCount > 0;
  const thumbnailUrl = qna.imageUrls?.[0] || "";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/qna/${qna.id}`);
  };
  return (
    <div
      className="qna-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {/* 카테고리 뱃지 */}
      <div className="qna-category">{qna.category}</div>

      {/* 제목/본문/아이콘/이미지 */}
      <div className="qna-main">
        <div className="qna-texts">
          <h3 className="qna-title">Q {qna.title}</h3>
          <p className="qna-content">{qna.content}</p>

          <div className="qna-footer">
            <div className="qna-meta">
              <img src={thumbsUpIcon} alt="좋아요" />
              <span>{qna.likeCount}</span>
            </div>
            <div className="qna-meta">
              <img src={commentIcon} alt="댓글" />
              <span>{qna.commentCount}</span>
            </div>
            <div className="qna-product-count">
              {qna.productCount}개의 추천제품
            </div>
          </div>
        </div>

        {hasThumbnail && (
          <div className="qna-thumbnail">
            <img className="thumbnail-img" src={thumbnailUrl} alt="썸네일" />
            {imageCount > 1 && <div className="image-count">+{imageCount}</div>}
          </div>
        )}
      </div>

      {/* 작성자 정보 */}
      <div className="qna-writer">
        {/* <img className="writer-img" src={qna.profileImageUrl} alt="작성자" /> */}
        <img
          className="writer-img"
          src={qna.profileImageUrl || "/default-profile.png"}
          alt="작성자"
        />
        {/* <span className="writer-nickname">{qna.nickname}</span> */}
        <span className="writer-nickname">{qna.nickname || "익명 사용자"}</span>
      </div>
    </div>
  );
}

export default QnACard;
//     <div className="qna-card">
//       <div className="qna-category">{qna.category}</div>

//       <div className="qna-main">
//         <div className="qna-texts">
//           <h3 className="qna-title">Q {qna.title}</h3>
//           <p className="qna-content">{qna.content}</p>

//           <div className="qna-footer">
//             <div className="qna-meta">
//               <img src={thumbsUpIcon} alt="좋아요" />
//               <span>{qna.likeCount}</span>
//             </div>
//             <div className="qna-meta">
//               <img src={commentIcon} alt="댓글" />
//               <span>{qna.commentCount}</span>
//             </div>
//             <div className="qna-product-count">
//               {qna.productCount}개의 추천제품
//             </div>
//           </div>
//         </div>

//         <div className="qna-thumbnail">

//           <img
//             className="thumbnail-img"
//             src={qna.imageUrls?.[0]}
//             alt="썸네일"
//           />

//           {qna.imageUrls?.length > 1 && (
//             <div className="image-count">+{qna.imageUrls.length}</div>
//           )}
//         </div>
//       </div>

//       <div className="qna-writer">
//         <img className="writer-img" src={qna.profileImageUrl} alt="프로필" />
//         <span className="writer-nickname">{qna.nickname}</span>
//       </div>
//     </div>
//   );
// }

// export default QnACard;
