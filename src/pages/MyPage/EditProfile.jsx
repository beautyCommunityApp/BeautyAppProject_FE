import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../api/axiosInstance";
import axios from "../../api/instance";

import Header from "../../components/Header";
import "./EditProfile.css";
// 사용자 프로필 업데이트 API 함수 import
import { updateUserProfile } from "../../api/updateBeautyProfile";
import { fetchMyInfo } from "../../api/memberApi";

import profileImageUrl from "../../assets/images/profileImageUrl.png";
import cameraIcon from "../../assets/images/camera.svg";
import Footer from "../../components/Footer";
function EditProfile() {
  const navigate = useNavigate();
  // 유저 상태값들 선언
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("FEMALE");
  const [skinType, setSkinType] = useState("");

  // 생년월일 관련 상태값 (연/월/일 나눠서 관리)
  const [year, setYear] = useState("1999");
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");
  // 컴포넌트 마운트 시 사용자 정보 가져오기
  //   useEffect(() => {
  //     axios
  //       .get("/members")
  //       .then((res) => {
  //         if (res.data?.isSuccess) {
  //           const user = res.data.result.profile;
  //           // 가져온 유저 정보로 상태값 업데이트
  //           setNickname(user.nickname || "");
  //           setGender(user.gender || "FEMALE");
  //           setSkinType(user.skinType || "");

  //           // 기본 생년월일 처리 (age → 추정 값)
  //           const birthYear = new Date().getFullYear() - user.age;
  //           setYear(String(birthYear));
  //           setMonth("1");
  //           setDay("1");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("유저 정보 불러오기 실패", err);
  //       });
  //   }, []);

  useEffect(() => {
    fetchMyInfo()
      .then((res) => {
        if (res?.isSuccess) {
          const user = res.result.profile;
          setNickname(user.nickname || "");
          setGender(user.gender || "FEMALE");
          setSkinType(user.skinType || "");

          const birthYear = new Date().getFullYear() - user.age;
          setYear(String(birthYear));
          setMonth("1");
          setDay("1");
        }
      })
      .catch((err) => {
        console.error("유저 정보 불러오기 실패", err);
      });
  }, []);
  // '수정하기' 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    // 생년월일 포맷을 "YYYYMMDD" 문자열로 변환
    const birthday = `${year.padStart(4, "0")}${month.padStart(
      2,
      "0"
    )}${day.padStart(2, "0")}`;

    try {
      const payload = {
        nickname,
        gender,
        birthday,
        skinType,
        profileImageUrl: null,
      };
      // 프로필 업데이트 API 호출
      const res = await updateUserProfile(payload);
      // 결과 처리
      if (res?.isSuccess) {
        alert("프로필이 수정되었습니다.");
        navigate("/mypage");
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      console.error("수정 에러:", err);
      alert("에러 발생");
    }
  };

  return (
    <div className="edit-profile-container">
      {/* <Header title="프로필 수정" /> */}
      <div className="edit-profile-image-wrapper">
        <div className="edit-profile-image">
          <img
            src={profileImageUrl} // 기본 이미지 경로 (백엔드에서 받아온 값으로 대체 가능)
            alt="프로필 이미지"
          />
          <div className="edit-profile-camera-icon">
            <img src={cameraIcon} alt="카메라 아이콘" />
          </div>
        </div>
      </div>
      <div className="edit-profile-form">
        <label>이름</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label>성별</label>
        <div className="edit-profile-gender">
          <button
            className={gender === "FEMALE" ? "selected" : ""}
            onClick={() => setGender("FEMALE")}
          >
            여성
          </button>
          <button
            className={gender === "MALE" ? "selected" : ""}
            onClick={() => setGender("MALE")}
          >
            남성
          </button>
        </div>

        {/* <label>생년월일</label>
        <div className="edit-profile-birthday">
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {Array.from({ length: 50 }, (_, i) => 1980 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div> */}
        <label>생년월일</label>
        <div className="edit-profile-birthday-wrapper">
          <div className="edit-profile-birthday-year">
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {Array.from({ length: 50 }, (_, i) => 1980 + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-profile-birthday-month-day">
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label>피부 타입</label>
        <select value={skinType} onChange={(e) => setSkinType(e.target.value)}>
          <option value="">선택</option>
          <option value="건성">건성</option>
          <option value="지성">지성</option>
          <option value="복합성">복합성</option>
          <option value="민감성">민감성</option>
        </select>

        <button className="edit-profile-submit" onClick={handleSubmit}>
          수정하기
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
