import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import "./QnADetail.css";

import QnADetailHeader from "./components/QnADetailHeader";
import QuestionTitle from "./components/QuestionTitle";
import UserInfo from "./components/UserInfo";
import QuestionImage from "./components/QuestionImage";
import QuestionContent from "./components/QuestionContent";
import StatsBar from "./components/StatsBar";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";

const QnADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qna, setQna] = useState(null);

  useEffect(() => {
    const dummy = {
      id,
      category: "스킨/토너",
      title: "너무너무 스트레스 받아요..ㅠㅠ",
      nickname: "우장산너구리",
      age: "21세",
      skinType: "복합성",
      gender: "남",
      imageUrl: "/images/sample.png",
      content: "요즘 피부 너무 안좋아요... 어떻게 관리해야 하나요?",
      likes: 2,
      comments: [
        {
          id: 1,
          nickname: "수명산참새",
          text: "사용 목적에 맞는 토너를 써보세요!",
        },
      ],
    };
    setQna(dummy);
  }, [id]);

  if (!qna) return null;

  return (
    <div className="qna-detail-container">
      <QnADetailHeader
        category={qna.category}
        onBack={() => navigate("/qna")}
      />
      <QuestionTitle title={qna.title} />
      <UserInfo
        nickname={qna.nickname}
        age={qna.age}
        skinType={qna.skinType}
        gender={qna.gender}
      />
      <QuestionImage imageUrl={qna.imageUrl} />
      <QuestionContent content={qna.content} />
      <StatsBar likes={qna.likes} commentCount={qna.comments.length} />
      <CommentList comments={qna.comments} />
      <CommentInput />
      <Footer />
    </div>
  );
};

export default QnADetail;
