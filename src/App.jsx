// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Onboarding from './pages/Onboarding/Onboarding';
import Login from './pages/Login/Login';
import SubscriptionPlans from './pages/SubscriptionPlans/SubscriptionPlans';
import NaverRedirectHandler from "./pages/Login/NaverRedirectHandler";
import ProductDetail from './pages/Product/ProductDetail';
import WriteReview from './pages/Product/WriteReview';
import ProductReviewList from './pages/Product/ProductReviewList';

import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plans" element={<SubscriptionPlans />} />

        <Route path="/subscription" element={<SubscriptionPlans />} />
        <Route path="/naver-callback" element={<NaverRedirectHandler />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/write-review" element={<WriteReview />} />
        <Route path="/product/:id/reviews" element={<ProductReviewList />} />


      </Routes>
    </Router>
  );
}

export default App;