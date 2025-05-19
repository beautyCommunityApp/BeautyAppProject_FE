// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import SubscriptionPlans from "./pages/SubscriptionPlans/SubscriptionPlans";
import NaverRedirectHandler from "./pages/Login/NaverRedirectHandler";
import ProductDetail from "./pages/Product/ProductDetail";
import WriteReview from "./pages/Product/WriteReview";
import ProductReviewList from "./pages/Product/ProductReviewList";
import OAuth2Success from "./pages/Login/OAuth2Success"; // ✅ 이 줄 추가!
import SearchResult from "./pages/Search/SearchResult"; // 경로에 맞게 import
import MyPageMain from "./pages/MyPage/MyPageMain";
import EditProfile from "./pages/MyPage/EditProfile";
import EditBeautyProfile from "./pages/MyPage/EditBeautyProfile";
import EditSetting from "./pages/MyPage/EditSetting";
import SettingMain from "./pages/MyPage/SettingMain"; // 상단에 import 추가
import MyReviewList from "./pages/MyPage/MyReviewList";
import EditReview from "./pages/MyPage/EditReview";
import ArticleMain from "./pages/Article/ArticleMain"; // 추가한 아티클 페이지

import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route path="/oauth2/success" element={<OAuth2Success />} />

        <Route path="/search" element={<SearchResult />} />

        {/* ✅ 추가 */}
        <Route path="/subscription" element={<SubscriptionPlans />} />
        <Route path="/naver-callback" element={<NaverRedirectHandler />} />
        <Route path="/home" element={<Home />} />

        <Route path="/home/product/:id" element={<ProductDetail />} />
        <Route
          path="/home/product/:id/write-review"
          element={<WriteReview />}
        />
        {/* <Route path="/product/:id/reviews" element={<ProductReviewList />} /> */}

        <Route
          path="/home/product/:cosmeticId/reviews"
          element={<ProductReviewList />}
        />
        <Route path="/mypage" element={<MyPageMain />} />

        <Route path="/mypage/edit" element={<EditSetting />} />
        <Route path="/mypage/setting" element={<SettingMain />} />
        <Route path="/mypage/reviews" element={<MyReviewList />} />
        <Route path="/mypage/review/edit/:reviewId" element={<EditReview />} />
        <Route path="/articles" element={<ArticleMain />} />
      </Routes>
    </Router>
  );
}

export default App;
