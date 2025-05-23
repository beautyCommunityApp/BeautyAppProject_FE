// src/pages/MyPage/EditBeautyProfile.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/instance";
//  import api from "../../api/instance";
import Header from "../../components/Header";
import "./EditBeautyProfile.css";
// 뷰티 프로필 수정 API 함수 import
import { updateBeautyProfile } from "../../api/updateBeautyProfile";
import { fetchMyPage } from "../../api/memberApi";

// 뷰티 프로필 선택 옵션 리스트 정의
const scalpOptions = ["건성두피", "지성두피", "민감성두피", "트러블두피"];
const hairOptions = ["건성모", "지성모", "손상모", "탈모"];
const colorOptions = ["봄웜톤", "여름쿨톤", "가을웜톤", "겨울쿨톤"];

function EditBeautyProfile() {
  const navigate = useNavigate();
  // 폼 상태 선언 (두피, 모발, 컬러, 공개여부)
  const [form, setForm] = useState({
    scalpType: "",
    hairType: "",
    personalColor: "",
    displayInProfile: true,
  });
  // 컴포넌트 마운트 시 기존 사용자 뷰티 프로필 정보 불러오기
  //   useEffect(() => {
  //     axios
  //       .get("/app/api/members")
  //       .then((res) => {
  //         if (res.data?.isSuccess) {
  //           const result = res.data.result;
  //           // 기존 정보로 상태 세팅
  //           setForm({
  //             scalpType: result.scalpType || "",
  //             hairType: result.hairType || "",
  //             personalColor: result.personalColor || "",
  //             displayInProfile: result.displayInProfile ?? true,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("뷰티 프로필 불러오기 실패", err);
  //       });
  //   }, []);
  useEffect(() => {
    fetchMyPage()
      .then((res) => {
        if (res?.isSuccess) {
          const result = res.result;
          setForm({
            scalpType: result.scalpType || "",
            hairType: result.hairType || "",
            personalColor: result.personalColor || "",
            displayInProfile: result.displayInProfile ?? true,
          });
        }
      })
      .catch((err) => {
        console.error("뷰티 프로필 불러오기 실패", err);
      });
  }, []);
  // 선택 항목 클릭 시 form 상태 업데이트
  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  // 공개 여부 토글 처리
  const handleToggle = () => {
    setForm((prev) => ({
      ...prev,
      displayInProfile: !prev.displayInProfile,
    }));
  };
  // '수정하기' 버튼 클릭 시 API 요청
  const handleSubmit = async () => {
    try {
      const res = await updateBeautyProfile(form);
      if (res?.isSuccess) {
        alert("뷰티 프로필이 수정되었습니다.");
        navigate("/mypage");
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      alert("에러 발생");
    }
  };

  const renderOptions = (field, options) => (
    <div className="edit-beauty-options">
      {options.map((opt) => (
        <button
          key={opt}
          className={
            form[field] === opt
              ? "edit-beauty-option selected"
              : "edit-beauty-option"
          }
          onClick={() => handleSelect(field, opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="edit-beauty-container">
      {/* <Header title="뷰티 프로필 수정" /> */}

      <div className="edit-beauty-section">
        <label>두피 타입</label>
        {renderOptions("scalpType", scalpOptions)}

        <label>모발 타입</label>
        {renderOptions("hairType", hairOptions)}

        <label>퍼스널 컬러</label>
        {renderOptions("personalColor", colorOptions)}

        <label>프로필 공개 여부</label>
        <div className="edit-beauty-toggle">
          <span>비공개</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={form.displayInProfile}
              onChange={handleToggle}
            />
            <span className="slider round"></span>
          </label>
          <span>공개</span>
        </div>

        <button className="edit-beauty-submit" onClick={handleSubmit}>
          수정하기
        </button>
      </div>
    </div>
  );
}

export default EditBeautyProfile;
