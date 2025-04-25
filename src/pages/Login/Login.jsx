import React, { useEffect } from 'react';
import './Login.css';
import Header from '../../components/Header';
import "./../../components/Header.css";
import { useNavigate } from "react-router-dom";
import Button from '../../components/Button/Button';
import "./../../components/Button/Button.css";
import { useLayoutEffect } from 'react';


import googleImg from "../../assets/images/google.png";
import naverImg from "../../assets/images/naver.png";
import kakaoImg from "../../assets/images/kakaotalk.png";

import googleBarImg from "../../assets/images/googleBar.png";
import naverBarImg from "../../assets/images/naverBar.png";
import kakaoBarImg from "../../assets/images/kakaotalkBar.png";


function Login() {
        

    const nav = useNavigate();
  // ✅ 구글 클라이언트 ID (Google Developer Console에서 발급받은 값)751472059491-d4m97akdnm1ofuu2joc7f61pnhnh5l07.apps.googleusercontent.com
  const GOOGLE_CLIENT_ID = "751472059491-d4m97akdnm1ofuu2joc7f61pnhnh5l07.apps.googleusercontent.com";

  // ✅ 네이버 로그인에 필요한 클라이언트 ID 및 콜백 URL
  const NAVER_CLIENT_ID = "2bkweGoVFOEEiv6QCXfi";
//   const NAVER_CALLBACK_URL = "http://localhost:5173/";
  const NAVER_CALLBACK_URL = "http://localhost:5173/naver-callback";


  // ✅ 임시 이메일 로그인 함수
  const handleLogin = () => {
    console.log('이메일 로그인 시도!');
    // 실제 이메일 로그인 처리 로직은 추후 추가 예정
  };

  // ✅ 구글 로그인 초기화
  useEffect(() => {
    if (window.google && window.google.accounts) {
      // 구글 계정 API 초기화
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin, // 로그인 성공 시 실행될 콜백 함수
      });

      // 구글 로그인 버튼 렌더링 (지정된 div에 버튼 삽입)
    //   window.google.accounts.id.renderButton(
    //     document.getElementById("google-login-btn"),
    //     { theme: "outline", size: "large", width: 300 } // 버튼 스타일 설정
    //   );
      
    }
  }, []);

  useEffect(() => {
    if (window.google && window.google.accounts) {
      const googleDiv = document.getElementById("google-login-btn");
      console.log("✅ google-login-btn div:", googleDiv); // null이면 오류
  
      if (!googleDiv) return; // 없으면 리턴
  
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
        auto_select: false,
        cancel_on_tap_outside: false,
      });
  
      window.google.accounts.id.renderButton(
        googleDiv,
        { theme: "outline", size: "large" }
      );
    }
  }, []);
  const handleGoogleLogin = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'email profile openid',
      callback: (tokenResponse) => {
      //  console.log('tokenResponse', tokenResponse);
        console.log("✅ 구글 로그인 성공 tokenResponse", tokenResponse); 

          // ✅ accessToken 저장
      localStorage.setItem("accessToken", tokenResponse.access_token);


        // TODO: 백엔드와 연동 or 사용자 정보 가져오기
        nav("/subscription"); 
      },
    });

    // 이걸 호출해야 실제로 팝업이 뜸
    client.requestAccessToken();
  // ✅ 구글 로그인 콜백 함수
//   const handleGoogleLogin = (response) => {
//     console.log("✅ 구글 로그인 성공", response);
//     // response.credential을 통해 JWT 토큰 획득 가능
//     // 백엔드에 토큰을 보내 사용자 검증 가능
//     nav("/subscription");   // ✅ 로그인 성공 후 다음 화면으로 이동



//   // 🔥 백엔드로 토큰 보내기
    //  const accessToken = response.credential;
//   fetch("http://localhost:4000/api/oauth-login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       provider: "google",
//       access_token: accessToken,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("✅ 백엔드 응답:", data);
//       // 토큰 저장 (예: JWT)
//       localStorage.setItem("jwt", data.token);
//       nav("/subscription");
//     })
//     .catch((err) => {
//       console.error("❌ 백엔드 요청 실패:", err);
//     });
  

    
};

  // ✅ 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("4df5f222873d7d728ce593c8df3b38d1"); // 카카오 JavaScript 키로 초기화
      console.log("✅ Kakao SDK 초기화 완료");
    }
  }, []);

  // ✅ 카카오 로그인 버튼 클릭 시 실행될 함수
  const handleKakaoLogin = () => {
    if (!window.Kakao) return;

    // 카카오 로그인 실행
    window.Kakao.Auth.login({
    //   scope: "profile_nickname, account_email", // 요청할 권한 범위
      scope: "profile_nickname", // 요청할 권한 범위
      success: function (authObj) {
        console.log("✅ 카카오 로그인 성공", authObj);

        // ✅ accessToken 저장
  localStorage.setItem("accessToken", authObj.access_token);


        nav("/subscription");   // ✅ 로그인 성공 후 다음 화면으로 이동

        // 사용자 정보 요청
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            console.log("🙋‍♀️ 카카오 사용자 정보", res);
            // res.kakao_account.email 등으로 정보 추출 가능
       
          },
          fail: function (error) {
            console.error("❌ 카카오 사용자 정보 요청 실패", error);
          },
        });
      },
      fail: function (err) {
        console.error("❌ 카카오 로그인 실패", err);
      },
    });
  };

  // ✅ 네이버 로그인 초기화
//   useEffect(() => {
//     const naverLogin = new window.naver.LoginWithNaverId({
//       clientId: NAVER_CLIENT_ID,       // 네이버 클라이언트 ID
//       callbackUrl: NAVER_CALLBACK_URL, // 로그인 후 이동할 URL
//       isPopup: false,                  // 팝업창이 아닌 현재 창에서 동작
//       loginButton: {                   // 네이버 로그인 버튼 스타일
//         color: "green",
//         type: 3,
//         height: 48,
//       },
//     });
//     naverLogin.init(); // 초기화 실행
//   }, []);

  // ✅ 네이버 로그인 성공 후 사용자 정보 요청 처리
  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash;

    // URL에 access_token이 포함되어 있다면 로그인 성공한 상태
    if (hash.includes("access_token")) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      console.log("✅ 네이버 로그인 성공! 토큰:", token);

      localStorage.setItem("accessToken", token);

      nav("/subscription");

      // 사용자 정보 요청
      fetch("https://openapi.naver.com/v1/nid/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("🙋‍♀️ 네이버 사용자 정보:", data.response);
        })
        .catch((err) => {
          console.error("❌ 네이버 사용자 정보 요청 실패", err);
        });
    }
  }, []);

const accessToken = localStorage.getItem("accessToken");

if (!accessToken) {
  console.warn("❗ accessToken이 없습니다. 로그인부터 진행해주세요.");
  return;
}

useLayoutEffect(() => {
  console.log("✅ useLayoutEffect 실행됨");

  const hash = window.location.hash;
  console.log("✅ 현재 해시 (LayoutEffect):", hash);

  const params = new URLSearchParams(hash.substring(1));
  const token = params.get("access_token");

  if (token) {
    console.log("✅ 네이버 access_token 감지됨!", token);

    fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🙋‍♀️ 네이버 사용자 정보:", data.response);
        nav("/subscription"); // 이동
        window.history.replaceState({}, document.title, "/"); // #access_token 제거
      })
      .catch((err) => {
        console.error("❌ 네이버 사용자 정보 요청 실패", err);
      });
  } else {
    console.log("⚠️ access_token 없음 (LayoutEffect)");
  }
}, []);

const handleNaverLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=naverLogin`;
    window.location.href = naverLoginUrl;
  };

 

  
  // ✅ UI 렌더링
  return (
<div>
    {/* <Header  ></Header>
    // 로그인 화면 */}
<Header prevPath="/" />

    <div className="login-wrapper">
      <div className="login-box">
        {/* 닫기 버튼 */}
        {/* <button className="close-btn" onClick ={()=>nav(-1) }>×</button> */}

        {/* 앱 타이틀 */}
        <h1 className="login-title">BeautemTalk</h1>

        {/* 이메일 / 비밀번호 입력창 */}
        {/* <input type="text" placeholder="이메일을 입력해주세요." className="login-input" />
        <input type="password" placeholder="비밀번호를 입력해주세요." className="login-input" /> */}

        {/* 이메일 로그인 버튼 */}
        {/* <button className="login-button" onClick={handleLogin}>이메일 로그인</button> */}

        {/* 하단 링크 */}
        {/* <div className="login-links">
          <span>비밀번호 찾기</span>
          <span>|</span>
          <span>회원가입</span>
        </div> */}

        {/* 구분선 */}
        <div className="divider" />

        {/* SNS 로그인 텍스트 */}
        <p className="sns-text">SNS 간편 로그인</p>

        {/* SNS 로그인 버튼들 */}
        {/* <div className="sns-buttons">
          <img src={googleImg} alt="Google"   className="sns-icon" onClick={handleGoogleLogin} />
          <img src={naverImg} alt="Naver" className="sns-icon"  onClick={handleNaverLogin} />
          <img src={kakaoImg} alt="Kakao" onClick={handleKakaoLogin} /> 
        </div> */}
        

          {/* SNS 로그인 바 버튼들 */}
        <div className="sns-buttonsBar">
      <img src={googleBarImg} alt="Google"  className="sns-icons" onClick={handleGoogleLogin}/>
      <img src={naverBarImg}  alt="Naver"  className="sns-icons"   onClick={handleNaverLogin}/>
      <img src={kakaoBarImg}   className="sns-icons"  alt="Kakao" onClick={handleKakaoLogin} />
      </div>

       </div>
    </div>

    </div>
  );
}

export default Login;
