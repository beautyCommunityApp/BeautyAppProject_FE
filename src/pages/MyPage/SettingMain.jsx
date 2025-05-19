import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { fetchMyInfo, logout } from "../../api/memberApi";
import "./SettingMain.css";
import LogoutModal from "../../components/LogoutModal"; // 모달 import 추가
import VectorImg from "../../assets/images/Vector.svg";
//마이페이지에서 셋팅버튼 클릭시 화면
function SettingMain() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // 모달 상태

  useEffect(() => {
    fetchMyInfo()
      .then((res) => {
        if (res?.isSuccess) {
          setUser(res.result.profile);
        }
      })
      .catch((err) => console.error("유저 정보 불러오기 실패", err));
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await logout(refreshToken);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("로그아웃 실패", err);
      alert("로그아웃에 실패했습니다");
    }
  };
  // SettingMain.jsx or App.jsx 상단 useEffect에 추가
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="setting-main-container">
      <Header title="설정" />

      <div className="setting-section">
        <p className="setting-title">내 계정</p>
        <div className="account-box">
          <span className="nickname">{user.nickname}</span>
          <button className="logout-button" onClick={() => setShowModal(true)}>
            로그아웃
          </button>
        </div>
      </div>

      <div className="setting-section">
        <div className="setting-row" onClick={() => navigate("/mypage/edit")}>
          <span className="label">프로필 수정</span>
          {/* <span className="value">
            {user.age}세 | {user.skinType || "피부타입 없음"} |{" "}
            {user.gender === "MALE" ? "남" : "여 "}
            <img src={VectorImg} />
          </span> */}
          <span className="value">
            <span className="text">
              {user.age}세 | {user.skinType || "피부타입 없음"} |{" "}
              {user.gender === "MALE" ? "남" : "여"}
            </span>
            <img className="arrow-icon" src={VectorImg} alt=">" />
          </span>
        </div>
      </div>
      {showModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default SettingMain;
