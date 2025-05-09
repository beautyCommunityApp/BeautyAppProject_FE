// src/api/reviewApi.js
import instance from "./instance";

/**
 * 특정 화장품에 대한 리뷰 등록
 * @param {string|number} cosmeticId - 제품 ID
 * @param {object} payload - 리뷰 데이터 ({ star, content, oneLineReview })
 * @returns {Promise<object>} - 등록 성공 여부와 결과
 */
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
export const fetchReviewsByCosmeticId = async (cosmeticId) => {
  try {
    const res = await instance.get(`/cosmetics/${cosmeticId}/reviews`);
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
export const fetchRecentReviews = async () => {
  try {
    const res = await instance.get("/reviews");
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
  if (process.env.NODE_ENV === "development") {
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
