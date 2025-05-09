// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
//  //소셜 로그인 완료 후 accessToken 처리
// function OAuth2Success() {
//   const nav = useNavigate();

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const res = await axios.get("/app/api/login/success", {
//           withCredentials: true, // 필요 시 쿠키 포함
//         });

//         if (res.data?.isSuccess) {
//           const { accessToken, refreshToken } = res.data.result;
//           localStorage.setItem("accessToken", accessToken);
//           localStorage.setItem("refreshToken", refreshToken);
//           nav("/subscription");
//         } else {
//           console.error("❌ 로그인 실패:", res.data);
//           nav("/login");
//         }
//       } catch (err) {
//         console.error("❌ 토큰 요청 실패:", err);
//         nav("/login");
//       }
//     };

//     fetchToken();
//   }, []);

//   return <div>로그인 중입니다...</div>;
// }

// export default OAuth2Success;

// ✅ OAuth2Success.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance"; // axios 대신 이걸 사용!

function OAuth2Success() {
  const nav = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await instance.get("/login/success"); // baseURL 자동 적용됨

        if (res.data?.isSuccess) {
          const { accessToken, refreshToken } = res.data.result;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          nav("/subscription");
        } else {
          console.error("❌ 로그인 실패:", res.data);
          nav("/login");
        }
      } catch (err) {
        console.error("❌ 토큰 요청 실패:", err);
        nav("/login");
      }
    };

    fetchToken();
  }, []);

  return <div>로그인 중입니다...</div>;
}

export default OAuth2Success;
