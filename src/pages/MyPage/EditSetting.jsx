// 마이페이지 탭 클릭 부분

import React, { useState } from "react";
import Header from "../../components/Header";
import EditProfile from "./EditProfile";
import EditBeautyProfile from "./EditBeautyProfile";
import "./EditSetting.css";

function EditSetting() {
  const [activeTab, setActiveTab] = useState("profile"); // or 'beauty'

  return (
    <div className="edit-setting-container">
      <Header title="설정" />

      <div className="edit-setting-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          프로필 수정
        </button>
        <button
          className={activeTab === "beauty" ? "active" : ""}
          onClick={() => setActiveTab("beauty")}
        >
          뷰티 프로필
        </button>
      </div>

      <div className="edit-setting-content">
        {activeTab === "profile" ? <EditProfile /> : <EditBeautyProfile />}
      </div>
    </div>
  );
}

export default EditSetting;
