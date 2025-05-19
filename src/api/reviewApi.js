// src/api/reviewApi.js
import instance from "./instance";
import { isMockMode } from "../utils/envUtils";
import DetailImg from "../assets/images/review1.png";
import profileImageUrl from "../assets/images/profileImageUrl.png";
export const submitReview = async (cosmeticId, payload) => {
  try {
    const res = await instance.post(
      `/cosmetics/${cosmeticId}/reviews`,
      payload
    );
    return res.data;
  } catch (err) {
    console.error(`❌ 리뷰 등록 실패 (cosmeticId=${cosmeticId})`, err);
    throw err;
  }
};

// ✅ 리뷰 조회
// export const fetchReviewsByCosmeticId = async (cosmeticId) => {
//   try {
//     const res = await instance.get(`/cosmetics/${cosmeticId}/reviews`);
//     return res.data;
//   } catch (err) {
//     console.error("❌ 리뷰 조회 실패:", err);
//     throw err;
//   }
// };
export const fetchReviewsByCosmeticId = async (cosmeticId, page = 0) => {
  try {
    const res = await instance.get(
      `/cosmetics/${cosmeticId}/reviews?page=${page}`
    );
    return res.data;
  } catch (err) {
    console.error("❌ 리뷰 조회 실패:", err);
    throw err;
  }
};

/**
 * 실시간 리뷰 리스트 조회
 * @returns {Promise<object>} - 최신 리뷰 목록
 */
// export const fetchRecentReviews = async () => {
//   try {
//     const res = await instance.get("/reviews");
//     return res.data;
//   } catch (err) {
//     console.error("❌ 실시간 리뷰 조회 실패:", err);
//     throw err;
//   }
// };
export const fetchRecentReviews = async (page = 0) => {
  try {
    const res = await instance.get(`/reviews?page=${page}`);
    return res.data;
  } catch (err) {
    console.error("❌ 실시간 리뷰 조회 실패:", err);
    throw err;
  }
};

/**
 * 리뷰 좋아요 토글 API
 * @param {number} reviewId - 좋아요할 리뷰의 ID
 * @returns {Promise<boolean>} - 토글된 결과 (true: 좋아요됨, false: 좋아요 해제됨)
 */
export const toggleReviewLike = async (reviewId) => {
  //if문 서버연결하면 주석 처리
  //   if (process.env.NODE_ENV === "development")
  if (isMockMode()) {
    console.log("💡 좋아요 토글 mock 처리");
    return Math.random() > 0.5; // true 또는 false 랜덤 리턴
  }

  try {
    const res = await instance.post(`/reviews/${reviewId}/likes/toggle`);
    if (res.data?.isSuccess) {
      return res.data.result; // true 또는 false
    } else {
      throw new Error(res.data?.responseMessage || "좋아요 요청 실패");
    }
  } catch (err) {
    console.error("❌ 좋아요 토글 실패:", err);
    throw err;
  }
};

// export const fetchMyReviews = async () => {
//   if (isMockMode()) {
//     console.log("🧪 [Mock] fetchMyReviews 호출됨");
//     return {
//       isSuccess: true,
//       result: {
//         content: [],
//         pageNumber: 0,
//         last: true,
//       },
//     };
//   }

//   try {
//     const res = await api.get("/members/me/reviews");
//     return res.data;
//   } catch (err) {
//     console.error("❌ fetchMyReviews 실패:", err);
//     throw err;
//   }
// };

export const fetchMyReviews = async () => {
  if (isMockMode()) {
    console.log("🧪 [Mock] fetchMyReviews 호출됨");
    return {
      isSuccess: true,
      result: {
        content: [
          {
            cosmeticInfo: {
              brandName: "다자연",
              cosmeticName: "블루 아가베 포어 에센스 토너",
              cosmeticImageUrl: DetailImg,
            },
            reviewInfo: {
              memberProfile: {
                nickname: "우장산너구리",
                age: 24,
                gender: "MALE",
                skinType: "복합성",
                profileImageUrl: profileImageUrl,
              },
              daysAgo: "0일전",
              star: 5,
              oneLineReview: "정말 좋아요",
              reviewComment:
                "촉촉하고 향도 좋아요. 자극 없이 잘 맞아요. 스킨케어 첫 단계로 매일 사용 중입니다.",
              likeCount: 21,
            },
          },
        ],
        pageNumber: 0,
        last: true,
      },
    };
  }

  // 실제 API
  try {
    const res = await api.get("/members/me/reviews");
    return res.data;
  } catch (err) {
    console.error("❌ fetchMyReviews 실패:", err);
    throw err;
  }
};

//삭제
export const deleteReview = (reviewId) => {
  return instance.delete(`/app/reviews/${reviewId}`);
};

//리뷰수정
export const updateReview = async (reviewId, payload) => {
  try {
    const res = await instance.patch(`/app/reviews/${reviewId}`, payload);
    return res.data;
  } catch (err) {
    console.error("❌ 리뷰 수정 실패:", err);
    throw err;
  }
};
