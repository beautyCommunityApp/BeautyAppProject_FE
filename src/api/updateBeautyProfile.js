import api from "./instance";
//백앤드 연결시 주석 풀기
// 1️⃣ 맞춤 정보 업데이트  성별, 생일, 피부타입 등 맞춤 정보 저장
// export async function updateUserProfile({
//   nickname,
//   gender,
//   birthday,
//   skinType,
//   profileImageUrl = null,
// }) {
//   try {
//     const res = await api.patch("/app/api/members", {
//       nickname,
//       gender,
//       birthday,
//       skinType,
//       profileImageUrl,
//     });

//     return res.data;
//   } catch (err) {
//     console.error("❌ 사용자 프로필 업데이트 실패:", err);
//     throw err;
//   }
// }

// // 2️⃣ 뷰티 프로필 업데이트  	두피, 모발, 퍼스널컬러 등 뷰티프로필 저장
// export async function updateBeautyProfile({
//   scalpType,
//   hairType,
//   personalColor,
//   displayInProfile,
// }) {
//   try {
//     const res = await api.patch("/app/api/members/beauty-info", {
//       scalpType,
//       hairType,
//       personalColor,
//       displayInProfile,
//     });

//     return res.data;
//   } catch (err) {
//     console.error("❌ 뷰티 프로필 업데이트 실패:", err);
//     throw err;
//   }
// }

// 1️⃣ 맞춤 정보 업데이트 (테스트용)
export async function updateUserProfile(data) {
  if (process.env.NODE_ENV === "development") {
    console.log("💡 사용자 프로필 저장 시도:", data);

    return { isSuccess: true }; // ✅ 테스트용 가짜 응답
  }
  try {
    const res = await api.patch("/app/api/members", data);
    return res.data; // 백엔드 응답 그대로 반환
  } catch (err) {
    console.error("❌ 사용자 프로필 업데이트 실패:", err);
    throw err;
  }
}

// 2️⃣ 뷰티 프로필 업데이트 (두피, 모발, 퍼스널컬러 등)
export async function updateBeautyProfile(data) {
  if (process.env.NODE_ENV === "development") {
    console.log("💡 뷰티 프로필 저장 시도:", data);
    return { isSuccess: true }; // ✅ 테스트용 응답
  }

  try {
    const res = await api.patch("/app/api/members/beauty-info", data);
    return res.data; // 백엔드 응답 그대로 반환
  } catch (err) {
    console.error("❌ 뷰티 프로필 업데이트 실패:", err);
    throw err;
  }
}
