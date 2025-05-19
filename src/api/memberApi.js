// src/api/memberApi.js
import api from "./instance";
import { isMockMode } from "../utils/envUtils";

// 마이페이지 전체 정보 조회 API (뷰티 + 활동 정보 포함)
export async function fetchMyPage() {
  if (isMockMode()) {
    console.log("🧪 샘플데이터 fetchMyPage 호출됨");
    return {
      isSuccess: true,
      result: {
        profile: {
          nickname: "개발너구리",
          age: 25,
          gender: "FEMALE",
          skinType: "복합성",
          profileImageUrl: null,
        },
        scalpType: "건성두피",
        hairType: "손상모",
        personalColor: "여름쿨톤",
        displayInProfile: true,
        reviewCount: 3,
        scrapCount: 5,
      },
    };
  }

  try {
    const res = await api.get("/members"); // baseURL에 /app/api 포함돼 있으므로 이대로
    return res.data;
  } catch (err) {
    console.error("❌ fetchMyPage 실패:", err);
    throw err;
  }
}
// 마이페이지 유저 정보 조회
// export const fetchMyInfo = () => {
//   return api.get("/app/api/members").then((res) => res.data);
// };
// ✅ 내 정보 가져오기
export const fetchMyInfo = async () => {
  //   if (process.env.NODE_ENV === "development")

  if (isMockMode()) {
    console.log("🧪 샘플데이터 memberApi.js  fetchMyInfo ");
    // 개발 모드일 경우 더미 응답 반환
    return {
      isSuccess: true,
      result: {
        profile: {
          nickname: "개발너구리",
          age: 25,
          gender: "FEMALE",
          skinType: "복합성",
        },
      },
    };
  }

  try {
    const res = await api.get("/members/me");
    return res.data;
  } catch (err) {
    console.error("❌ fetchMyInfo 실패:", err);
    throw err;
  }
};

// 로그아웃 요청
export const logout = (refreshToken) => {
  return api
    .get("/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: { refreshToken }, // ⚠️ axios에서 GET 요청에 body를 포함하려면 config의 `data` 키에 넣어야 함
    })
    .then((res) => res.data);
};
