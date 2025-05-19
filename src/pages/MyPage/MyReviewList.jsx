// src/pages/MyPage/MyReviewList.jsx
import React, { useEffect, useState } from "react";
import { fetchMyReviews } from "../../api/reviewApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./MyReviewList.css";
import ReviewCard from "../../components/ReviewCard";
import { useNavigate } from "react-router-dom";

import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { deleteReview } from "../../api/reviewApi";

//나의 리뷰 조회 페이지
function MyReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyReviews()
      .then((res) => {
        if (res?.isSuccess) {
          setReviews(res.result.content);
        }
      })
      .catch((err) => {
        console.error("리뷰 조회 실패", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // 하단 모달 열기
  const openBottomSheet = (id) => {
    setSelectedReviewId(id);
    setShowBottomSheet(true);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  //   const handleEdit = (id) => {
  //     closeBottomSheet();
  //     navigate(`/mypage/review/edit/${id}`);
  //   };

  const handleEdit = () => {
    closeBottomSheet();

    // 리뷰 데이터 찾아오기
    const selectedReview = reviews.find(
      (r) => r.reviewInfo.reviewId === selectedReviewId
    );

    if (!selectedReview) {
      alert("리뷰 정보를 찾을 수 없습니다.");
      return;
    }
    console.log("✅ 리뷰 ID:", selectedReview.reviewInfo.reviewId);

    navigate(`/mypage/review/edit/${selectedReviewId}`, {
      state: {
        review: selectedReview.reviewInfo,
        cosmetic: selectedReview.cosmeticInfo,
      },
    });
    console.log("✅ selectedReview:", selectedReview);
    console.log("✅ cosmeticInfo:", selectedReview.cosmeticInfo);
  };

  const handleDelete = (id) => {
    // closeBottomSheet();
    // // 추후: 삭제 확인 모달 또는 삭제 API 호출 추가
    // alert(`리뷰 ${id} 삭제하기`);
    closeBottomSheet(); // 1단계: bottom sheet 닫기
    setSelectedReviewId(id); // 어떤 리뷰 삭제할지 저장
    setShowConfirmDelete(true); // 2단계: 확인 모달 열기
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="my-review-list-container">
      <Header title="나의 리뷰" />

      <div className="review-header">
        <span className="sort">최신순 ▼</span>
        <span className="count">
          총 <span className="highlight">{reviews.length}</span>건
        </span>
      </div>

      {reviews.length === 0 ? (
        <div className="no-review">
          <p>아직 작성한 리뷰가 없습니다.</p>
          <button>리뷰 작성하기</button>
        </div>
      ) : (
        <div className="review-list">
          {reviews.map(({ cosmeticInfo, reviewInfo }, index) => (
            <ReviewCard
              key={index}
              reviewId={index}
              //   key={reviewInfo.reviewId}  // 진짜 유일한 ID
              //   reviewId={reviewInfo.reviewId}  // 좋아요 toggle 시에도 필요
              user={{
                image:
                  reviewInfo.memberProfile.profileImageUrl ||
                  "/images/default-profile.png",
                nickname: reviewInfo.memberProfile.nickname,
                age: reviewInfo.memberProfile.age,
                skin: reviewInfo.memberProfile.skinType,
                gender:
                  reviewInfo.memberProfile.gender === "MALE" ? "남" : "여",
              }}
              product={{
                id: cosmeticInfo.cosmeticId || 0,
                name: cosmeticInfo.cosmeticName,
                brand: cosmeticInfo.brandName,
                image: cosmeticInfo.cosmeticImageUrl,
              }}
              content={{
                title: reviewInfo.oneLineReview,
                body: reviewInfo.reviewComment,
                likes: reviewInfo.likeCount,
                rating: reviewInfo.star,
              }}
              date={reviewInfo.daysAgo}
              showEdit={true}
              onEditClick={() => openBottomSheet(reviewInfo.reviewId)}
            />
          ))}
        </div>
      )}
      {showBottomSheet && (
        <div className="modal-overlay" onClick={closeBottomSheet}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header">
              <button className="close-btn" onClick={closeBottomSheet}>
                ✕
              </button>
            </div>
            <div className="sheet-actions">
              <button onClick={() => handleEdit(selectedReviewId)}>
                수정하기
              </button>
              <button onClick={() => handleDelete(selectedReviewId)}>
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <ConfirmDeleteModal
          onCancel={() => setShowConfirmDelete(false)}
          onConfirm={async () => {
            try {
              await deleteReview(selectedReviewId);
              setReviews((prev) =>
                prev.filter(
                  (review) => review.reviewInfo.reviewId !== selectedReviewId
                )
              );
              setShowConfirmDelete(false);
            } catch (error) {
              const status = error.response?.status;
              if (error.response?.status === 403) {
                alert("이 리뷰를 삭제할 권한이 없습니다." + status);
              } else {
                alert(`리뷰 삭제 중 오류가 발생했습니다. (status: ${status})`);
              }
              console.error("❌리뷰 삭제 실패", error);
            }
          }}
        />
      )}
      <Footer></Footer>
    </div>
  );
}

export default MyReviewList;
