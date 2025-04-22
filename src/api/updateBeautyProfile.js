// 📁 src/api/updateBeautyProfile.js

export const updateBeautyProfile = async (data, accessToken) => {
  const response = await fetch("/app/api/members/beauty-info", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("서버 요청 실패");
  }

  return await response.json();
};
