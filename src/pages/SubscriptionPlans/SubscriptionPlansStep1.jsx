import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./../../components/Button/Button.css";
import Header from "../../components/Header";
import "./../../components/Header.css";
import "./SubscriptionPlansStep1.css";
import axios from "axios";

// 연도, 월, 일 목록 생성
const years = Array.from({ length: 100 }, (_, i) => `${2025 - i}`);
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

function SubscriptionPlansStep1({ customInfo, setCustomInfo, goToNextStep }) {
  // ✅ 내부 상태 초기화
  const [gender, setGender] = useState(customInfo?.gender || "");
  const [year, setYear] = useState(customInfo?.year || "");
  const [month, setMonth] = useState(customInfo?.month || "");
  const [day, setDay] = useState(customInfo?.day || "");
  const [skinType, setSkinType] = useState(customInfo?.skinType || "");

  // 모든 필드가 선택되었는지 확인
  const isValid = gender && year && month && day && skinType;

  const handleNext = () => {
    console.log("🔥 handleNext 호출됨");
    console.log("✅ isValid 상태:", isValid); // <- 이걸 추가해보자
    if (isValid) {
      const birthday = `${year}${month.padStart(2, "0")}${day.padStart(
        2,
        "0"
      )}`;
      const mappedGender = gender === "여성" ? "FEMALE" : "MALE";

      const info = {
        nickname: "홍길동", // 이건 나중에 받는 걸로
        gender: mappedGender,
        birthday,
        skinType,
        profileImageUrl: null,
      };

      console.log("✅ API로 보낼 데이터:", info);
      setCustomInfo(info);
    }
  };

  // //👉 다음 단계로 넘어가기 전 선택된 값 상위에 저장
  // const handleNext = () => {
  //   console.log("isValid:", isValid); // 여기 찍히는지 먼저 확인
  //   if (isValid) {
  //   //   setCustomInfo({
  //   //     gender,
  //   //     year,
  //   //     month,
  //   //     day,
  //   //     skinType,
  //   //   });
  //     const info = { gender, year, month, day, skinType };
  //     console.log("✅ Step1 선택값:", info);
  //     setCustomInfo(info);

  //   //  goToNextStep();  //이거주석  SubscriptionPlans.jsx 전체변경했음 step2에서 info 값을 받기위해

  //   }
  // };

  //백앤드 연결시 사용
  // const handleNext = async () => {
  //   if (isValid) {
  //     const birthday = `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`;
  //     const info = { gender, year, month, day, skinType };

  //     // 상위 컴포넌트에도 저장
  //     setCustomInfo(info);

  //     try {
  //       const accessToken = localStorage.getItem("accessToken"); // or Recoil 등
  //       const response = await axios.patch(
  //         "/app/api/members",
  //         {
  //           nickname: "홍길동", // 임시로 넣어둠 (또는 별도 input 받아야 함)
  //           gender: gender === "여성" ? "FEMALE" : "MALE",
  //           birthday: birthday,
  //           skinType: skinType,
  //           profileImageUrl: null,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       if (response.data.isSuccess) {
  //         console.log("회원정보 업데이트 성공:", response.data.responseMessage);
  //         // goToNextStep(); // 여전히 주석이라면 이건 그대로 두고
  //       } else {
  //         console.error("회원정보 업데이트 실패:", response.data.responseMessage);
  //       }
  //     } catch (error) {
  //       console.error("API 호출 에러:", error);
  //     }
  //   }
  // };

  return (
    <div>
      {/* <Header />
        // 맞춤설정 화면 */}
      <Header title="맞춤 정보 설정" prevPath="/login" />

      <div className="subscription-container">
        <h2>맞춤 정보 설정</h2>
        <p>
          취향에 맞는 제품을 추천해 드릴 수 있도록 맞춤 정보를 입력해주세요.
        </p>

        {/* 성별 선택 */}
        <div className="section">
          <label className="label">성별</label>
          <div className="gender-group">
            <button
              className={gender === "여성" ? "selected" : ""}
              onClick={() => setGender("여성")}
            >
              여성
            </button>
            <button
              className={gender === "남성" ? "selected" : ""}
              onClick={() => setGender("남성")}
            >
              남성
            </button>
          </div>
        </div>

        {/* 생년월일 선택 */}
        <div className="section">
          <label className="label">생년월일</label>

          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">연도</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <div className="month-day-container">
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">월</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">일</option>
              {days.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 피부 타입 선택 */}
        <div className="section">
          <label className="label">피부 타입</label>
          <select
            className="full-width"
            value={skinType}
            onChange={(e) => setSkinType(e.target.value)}
          >
            <option value="">피부 타입 선택</option>
            <option value="건성">건성</option>
            <option value="지성">지성</option>
            <option value="복합성">복합성</option>
            <option value="민감성">민감성</option>
            <option value="해당없음">해당없음</option>
          </select>
        </div>

        {/* 다음 버튼 */}
        <div className="step1-container">
          <Button
            text="다음"
            //type="primary"
            type={isValid ? "primary" : "disabled"}
            onClick={handleNext}
            // onClick={() => console.log("✅ 버튼 클릭됨")}
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlansStep1;
