import api from "./instance"; // 공통 axios 인스턴스

// export const fetchCosmeticsByCategory = (categoryId, accessToken, page = 0) => {
//   return api.get(`/app/api/cosmetics/categories/${categoryId}?page=${page}`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// };

// 1) 기존: 카테고리별 화장품 조회
export const fetchCosmeticsByCategory = (categoryId, accessToken, page = 0) =>
  api.get(`/app/api/cosmetics/categories/${categoryId}?page=${page}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// 2) 신규: 브랜드 검색 (백엔드에 이 엔드포인트가 있어야 합니다)
// export const searchBrands = (keyword) =>
//   api.get(`/app/api/brands?keyword=${encodeURIComponent(keyword)}`);

// 3) 신규: 브랜드별 화장품 조회 (백엔드에 이 엔드포인트가 있어야 합니다)
// export const fetchCosmeticsByBrand = (brandId, accessToken) =>
//   api.get(`/app/api/brands/${brandId}/cosmetics`, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
