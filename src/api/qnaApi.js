import userImg from "./../assets/images/profileImageUrl.png";
import qnalistItemImg from "./../assets/images/qnalistItemImg.svg";

export const fetchQnAList = async () => {
  return [
    {
      id: 1,
      category: "스킨/토너",
      title: "너무너무 스트레스 받아요..ㅠㅠ",
      content: "요즘 너무 피부가 안 좋아졌어요...",
      likeCount: 1,
      commentCount: 5,
      productCount: 9,
      imageUrls: [qnalistItemImg, qnalistItemImg, qnalistItemImg],

      nickname: "우장산너구리",
      profileImageUrl: userImg,
    },
  ];
};
