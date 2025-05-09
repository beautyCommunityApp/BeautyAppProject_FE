// // src/api/productApi.js
// import axios from "axios";

// // fetchProductDetail 함수 만들고 export 해줘야 함
// export const fetchProductDetail = async (id, token) => {
//   const response = await axios.get(
//     `http://localhost:8080/app/api/cosmetics/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data.result;
// };

// src/api/productApi.js
// import instance from "./instance"; // axios 말고 instance!

// export const fetchProductDetail = (productId) => {
//   return instance.get(`/cosmetics/${productId}`);
// };

// src/api/productApi.js
import instance from "./instance"; // 공통 axios 인스턴스 사용

/**
 * 특정 화장품의 상세 정보를 가져오는 API
 * @param {string | number} productId - 조회할 화장품 ID
 * @returns {Promise<object>} - 백엔드에서 받은 제품 상세 데이터
 */
export const fetchProductDetail = async (productId) => {
  try {
    const res = await instance.get(`/cosmetics/${productId}`);
    return res.data; // 여기서 .result는 사용하는 쪽에서 처리
  } catch (err) {
    console.error(`❌ fetchProductDetail 실패 (productId=${productId})`, err);
    throw err; // 호출한 쪽에서 처리할 수 있게 다시 throw
  }
};
