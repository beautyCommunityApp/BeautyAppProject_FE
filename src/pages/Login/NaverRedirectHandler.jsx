// // src/pages/NaverRedirectHandler.jsx
// 네이버 로그인의 리디렉트 방식 때문에

// 네이버 로그인을 누르면 네이버 로그인 페이지로 이동하고,

// 로그인 성공하면 access_token을 포함한 URL로 돌아오는데,
// 예: http://localhost:5173/naver-callback#access_token=...

// 이 "돌아온 페이지" 에서 access_token을 받아서 처리해줘야 함

// 👉 이걸 처리하는 페이지가 바로 NaverRedirectHandler.jsx 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NaverRedirectHandler() {
  const nav = useNavigate();

  useEffect(() => {
//     const hash = window.location.hash;
//     console.log("🔁 [네이버 리디렉트] 현재 해시:", hash);

//     const params = new URLSearchParams(hash.substring(1));
//     const token = params.get("access_token");

//     if (token) {
//       console.log("✅ 네이버 access_token 감지됨!", token);
//       // TODO: 백엔드 연동해서 사용자 정보 요청하기
//       nav("/subscription"); // or 원하는 경로
//     } else {
//       console.warn("⚠️ access_token 없음 (redirect 페이지)");
//       nav("/login");
//     }
//   }, []);

//   return <div>네이버 로그인 처리 중... (백엔드 연동 예정)</div>;

const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (token) {
      console.log("✅ 네이버 access_token 감지됨!", token);
      // 여기서 토큰 저장이나 서버로 전송하는 로직
      // 예: localStorage.setItem("naver_token", token);

      // 그리고 해시 제거 + 다음 화면으로 네비게이션
      window.history.replaceState(null, "", window.location.pathname); // 🔥 해시 제거
      nav("/subscription"); // 예: 맞춤 정보 설정 페이지로 이동
    }
  }, []); // ✅ 빈 배열로 한 번만 실행되게
}

export default NaverRedirectHandler;
