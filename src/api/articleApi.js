import instance from "./instance"; // 공통 axios 인스턴스 사용

export const fetchArticles = () => {
  return instance.get("/app/api/articles");
};
