import React, { useState, useEffect } from "react";
import "./SubscriptionPlansStep2.css";
import Button from "../../components/Button/Button";
import Header from "../../components/Header";
import "./../../components/Button/Button.css";
import "./../../components/Header.css";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // 추가

// import { updateBeautyProfile } from "../../api/updateBeautyProfile";
import {
  updateUserProfile,
  updateBeautyProfile,
} from "../../api/updateBeautyProfile";

const skinTypes = ["건성", "지성", "복합성", "민감성", "해당없음"];
const scalpTypes = ["건성 두피", "지성 두피", "민감성 두피", "트러블 두피"];
const hairTypes = ["건성모", "지성모", "손상모", "탈모"];
const colorTypes = ["봄웜톤", "여름쿨톤", "가을웜톤", "겨울쿨톤", "모름"];

function SubscriptionPlansStep2({
  goToPreviousStep,
  beautyProfile,
  setBeautyProfile,
  goToPrevStep,
  customInfo,
}) {
  // ✅ 기존 선택값이 있을 경우 기본값으로 사용
  const [skin, setSkin] = useState(beautyProfile.skin || "");
  const [scalp, setScalp] = useState(beautyProfile.scalp || "");
  const [hair, setHair] = useState(beautyProfile.hair || "");
  const [color, setColor] = useState(beautyProfile.color || "");
  const [isPublic, setIsPublic] = useState(beautyProfile.isPublic || false);
  const params = useParams(); // 제품 id 가져오기

  const isValid = skin && scalp && hair && color;

  // ✅ 모든 선택값이 바뀔 때마다 상위 상태로 전달
  useEffect(() => {
    console.log("✅ customInfo props 값:", customInfo);
    console.log("✅ Step2 도착한 customInfo:", customInfo);
    setBeautyProfile({
      skin,
      scalp,
      hair,
      color,
      isPublic,
    });
  }, [skin, scalp, hair, color, isPublic, setBeautyProfile, customInfo]);

  const handleSelect = (current, value, setter) => {
    setter(current === value ? "" : value);
  };

  const nav = useNavigate();

  return (
    <div>
      <Header title="뷰티 프로필 설정" onClose={goToPrevStep} />
      <div className="profile-container">
        <h2>뷰티 프로필 설정</h2>
        <p>뷰티커버42님, 뷰티 프로필을 입력해주세요.</p>

        <section>
          <label>
            피부 타입 <span>1개 선택</span>
          </label>
          <div className="tag-group">
            {skinTypes.map((item) => (
              <button
                key={item}
                className={`tag ${skin === item ? "selected" : ""}`}
                onClick={() => handleSelect(skin, item, setSkin)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label>
            두피 타입 <span>1개 선택</span>
          </label>
          <div className="tag-group">
            {scalpTypes.map((item) => (
              <button
                key={item}
                className={`tag ${scalp === item ? "selected" : ""}`}
                onClick={() => handleSelect(scalp, item, setScalp)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label>
            모발 타입 <span>1개 선택</span>
          </label>
          <div className="tag-group">
            {hairTypes.map((item) => (
              <button
                key={item}
                className={`tag ${hair === item ? "selected" : ""}`}
                onClick={() => handleSelect(hair, item, setHair)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label>
            퍼스널 컬러 <span>1개 선택</span>
          </label>
          <div className="tag-group">
            {colorTypes.map((item) => (
              <button
                key={item}
                className={`tag ${color === item ? "selected" : ""}`}
                onClick={() => handleSelect(color, item, setColor)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="public-toggle">
          <label>뷰티 프로필 공개</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="slider"></span>
          </label>
        </section>

        <div className="step2-buttons">
          {/* <button onClick={goToPreviousStep}>이전</button> */}

          <Button
            text="뷰티톡 시작"
            type={isValid ? "primary" : "disabled"}
            onClick={async () => {
              if (!isValid) return;

              try {
                // 1. 맞춤 정보 먼저 저장 (Step1에서 받은 customInfo 사용)
                const profileRes = await updateUserProfile(customInfo);
                if (!profileRes.isSuccess) {
                  alert("맞춤정보 저장 실패 😢");
                  return;
                }

                // 2. 뷰티 프로필 저장
                const beautyRes = await updateBeautyProfile({
                  scalpType: scalp,
                  hairType: hair,
                  personalColor: color,
                  displayInProfile: isPublic,
                });
                if (!beautyRes.isSuccess) {
                  alert("뷰티 프로필 저장 실패 😢");
                  return;
                }

                // 3. 성공 시 이동
                console.log("🎉 맞춤정보 + 뷰티프로필 모두 저장 완료!");
                console.log(beautyRes);
                nav("/home");
              } catch (err) {
                console.error("❌ 저장 과정 중 에러:", err);
                alert("정보 저장 중 문제가 발생했습니다.");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlansStep2;
