
import React, { useState, useEffect } from "react";
import SubscriptionPlansStep1 from "./SubscriptionPlansStep1";
import SubscriptionPlansStep2 from "./SubscriptionPlansStep2";

function SubscriptionPlans() {
  const [step, setStep] = useState(1);
  const [customInfo, setCustomInfo] = useState({});
  const [pendingInfo, setPendingInfo] = useState(null); // 임시 저장
  const [beautyProfile, setBeautyProfile] = useState({});

  // ✅ customInfo가 업데이트되면 다음 Step으로 이동
  useEffect(() => {
    if (pendingInfo) {
      console.log("✅ Step1에서 전달받은 info:", pendingInfo); // ← 여기로 옮겨야 보임
      setCustomInfo(pendingInfo);
      setStep(2); // 상태 반영된 다음 Step 이동
      setPendingInfo(null); // 초기화
    }
  }, [pendingInfo]);

  return (
    <div>
      {step === 1 && (
        <SubscriptionPlansStep1
          customInfo={customInfo}
          setCustomInfo={(info) => setPendingInfo(info)} // 직접 state 바꾸지 않음!
          goToNextStep={() => {}} // 사용 안함
        />
      )}
      {step === 2 && (
        <SubscriptionPlansStep2
          beautyProfile={beautyProfile}
          setBeautyProfile={setBeautyProfile}
          goToPrevStep={() => setStep(1)}
          customInfo={customInfo}
        />
      )}
    </div>
  );
}

export default SubscriptionPlans;

// import React, { useState } from "react";
// import SubscriptionPlansStep1 from "./SubscriptionPlansStep1";
// import SubscriptionPlansStep2 from "./SubscriptionPlansStep2";

// function SubscriptionPlans() {
//   // 🔸 Step 이동을 위한 상태
//   const [step, setStep] = useState(1);

//   // 🔸 Step1(맞춤정보)에서 받은 선택 값
//   const [customInfo, setCustomInfo] = useState({});

//   // 🔸 Step2(뷰티프로필)에서 받은 선택 값
//   const [beautyProfile, setBeautyProfile] = useState({});

//   // 🔸 Step 전환 함수
//   const goToNextStep = () => {
//     setStep(prev => prev + 1);
//   };

//   const goToPrevStep = () => {
//     setStep(prev => prev - 1);
//   };

//   return (
//     <div>
//       {step === 1 && (
//         <SubscriptionPlansStep1
//           customInfo={customInfo}               // 현재 저장된 값
//           setCustomInfo={setCustomInfo}         // 값 업데이트 함수
//           goToNextStep={goToNextStep}           // 다음 Step 이동
//         />
//       )}
//       {step === 2 && (
//         <SubscriptionPlansStep2
//           beautyProfile={beautyProfile}
//           setBeautyProfile={setBeautyProfile}
//           goToPrevStep={goToPrevStep}           // 이전 Step으로 돌아가기
//           // → 여기에 완료 버튼 눌렀을 때 전체 데이터 저장 로직도 추가 가능!
//           customInfo={customInfo}
//         />
//       )}
//     </div>
//   );
// }

// export default SubscriptionPlans;
