import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button/Button";
import "./Login.css";
import "./../../components/Header.css";
import "./../../components/Button/Button.css";

import googleBarImg from "../../assets/images/googleBar.png";
import naverBarImg from "../../assets/images/naverBar.png";
import kakaoBarImg from "../../assets/images/kakaotalkBar.png";

function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const forceLogin = params.get("force") === "true";
  const naverToken = params.get("naver_token");
  const nav = useNavigate();

  const GOOGLE_CLIENT_ID =
    "751472059491-d4m97akdnm1ofuu2joc7f61pnhnh5l07.apps.googleusercontent.com";
  const NAVER_CLIENT_ID = "2bkweGoVFOEEiv6QCXfi";
  const NAVER_CALLBACK_URL = "http://localhost:5173/naver-callback";

  const accessToken = localStorage.getItem("accessToken");

  // ✅ accessToken 있으면 자동 이동 (단, forceLogin 아닐 때만)
  useEffect(() => {
    if (accessToken && !forceLogin) {
      console.log("✅ 이미 로그인되어 있어 /subscription으로 이동");
      nav("/subscription");
    }
  }, [accessToken, forceLogin]);

  // ✅ 네이버 토큰 수신 시 처리
  useEffect(() => {
    if (naverToken) {
      console.log("✅ Login.jsx에서 네이버 토큰 수신:", naverToken);
      localStorage.setItem("accessToken", naverToken);
      nav("/subscription");
    }
  }, [naverToken]);

  // ✅ 구글 로그인 초기화
  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
        auto_select: false,
        cancel_on_tap_outside: false,
      });
    }
  }, []);

  const handleGoogleLogin = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "email profile openid",
      callback: (tokenResponse) => {
        console.log("✅ 구글 로그인 성공 tokenResponse", tokenResponse);
        localStorage.setItem("accessToken", tokenResponse.access_token);
        nav("/subscription");
      },
    });
    client.requestAccessToken(); // 팝업 실행
  };

  // ✅ 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("4df5f222873d7d728ce593c8df3b38d1");
      console.log("✅ Kakao SDK 초기화 완료");
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.login({
      scope: "profile_nickname",
      success: function (authObj) {
        console.log("✅ 카카오 로그인 성공", authObj);
        localStorage.setItem("accessToken", authObj.access_token);
        nav("/subscription");

        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            console.log("🙋‍♀️ 카카오 사용자 정보", res);
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

  const handleNaverLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=naverLogin&prompt=login`;
    window.location.href = naverLoginUrl;
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/v1/authorization/${provider}`;
  };

  return (
    <div>
      <Header prevPath="/" />
      <div className="login-wrapper">
        <div className="login-box">
          <h1 className="login-title">BeautemTalk</h1>
          <div className="divider" />
          <p className="sns-text">SNS 간편 로그인</p>
          <div className="sns-buttonsBar">
            {/* <img
              src={googleBarImg}
              alt="Google"
              className="sns-icons"
              onClick={handleGoogleLogin}
            />
            <img
              src={naverBarImg}
              alt="Naver"
              className="sns-icons"
              onClick={handleNaverLogin}
            />
            <img
              src={kakaoBarImg}
              className="sns-icons"
              alt="Kakao"
              onClick={handleKakaoLogin}
            /> */}

            <img
              src={googleBarImg}
              className="sns-icons"
              onClick={() => handleSocialLogin("google")}
            />
            <img
              src={naverBarImg}
              className="sns-icons"
              onClick={() => handleSocialLogin("naver")}
            />
            <img
              src={kakaoBarImg}
              className="sns-icons"
              onClick={() => handleSocialLogin("kakao")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
