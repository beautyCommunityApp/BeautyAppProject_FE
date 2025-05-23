import instance from "./instance";
import { isMockMode } from "../utils/envUtils";

// 🖼️ 샘플 이미지 (assets 폴더에 직접 추가해줘!)
import article1 from "../assets/images/article1.png";
import article2 from "../assets/images/article2.png";
import article3 from "../assets/images/article3.png";

/**
 * 아티클 리스트 조회 (실제 서버 또는 개발모드)
 */
export const fetchArticles = async () => {
  if (isMockMode()) {
    console.log("🧪 [Mock] fetchArticles 호출됨");

    return {
      data: {
        isSuccess: true,
        result: {
          content: [
            {
              articleId: 1,
              articleName: "촉촉한 스킨케어 루틴 제안",
              articleTag: "#에디터찐템",
              articleImageUrl: article1,
              createdAt: "2025-05-20T12:00:00", // ✅ 최근 (NEW 뱃지 붙을 예정)
            },
            {
              articleId: 2,
              articleName: "올해의 뷰티 트렌드 총정리",
              articleTag: "#뷰티소식",
              articleImageUrl: article2,
              createdAt: "2025-05-10T12:00:00", // ❌ 오래됨 (NEW 없음)
            },
            {
              articleId: 3,
              articleName: "2025 베스트셀러 TOP3 비교",
              articleTag: "#전문가꿀팁",
              articleImageUrl: article3,
              createdAt: "2025-05-21T12:00:00", // ✅ 최근 (NEW 뱃지)
            },
          ],
          pageNumber: 0,
          last: true,
        },
      },
    };
  }

  try {
    const res = await instance.get("/articles");
    return res;
  } catch (err) {
    console.error("❌ 아티클 조회 실패", err);
    throw err;
  }
};

// export const fetchArticleDetail = async (articleId) => {
//   try {
//     const res = await instance.get(`/articles/${articleId}`);
//     return res.data;
//   } catch (err) {
//     console.error("❌ 아티클 상세 조회 실패", err);
//     throw err;
//   }
// };

export const fetchArticleDetail = async (articleId) => {
  if (isMockMode()) {
    console.log("🧪 [Mock] fetchArticleDetail 호출됨");

    return {
      isSuccess: true,
      result: {
        articleId: Number(articleId),
        articleName: "건조한 피부, 진정 깊은 보습을 만나다",
        articleTag: "#에디터찐템",
        articleImageUrl: article1,
        articleContent: "민감한 피부를 위한 보습 루틴 소개! 겨울철 추천템!",
        editor: {
          name: "옐로",
          profileImageUrl: "/dummy/editor.png",
        },
        comments: [
          {
            id: 1,
            nickname: "우장산너구리",
            age: 24,
            gender: "여",
            skinType: "복합성",
            profileImageUrl: "/dummy/profile1.png",
            text: "원래는 닥터지 오일만 썼는데 이건 진짜 촉촉하고 좋아요!",
          },
          {
            id: 2,
            nickname: "수명산너구리",
            age: 21,
            gender: "남",
            skinType: "복합성",
            profileImageUrl: "/dummy/profile2.png",
            text: "정말 좋아요. 매일 아침마다 사용 중입니다.",
          },
          {
            id: 3,
            nickname: "까치산너구리",
            age: 21,
            gender: "남",
            skinType: "복합성",
            profileImageUrl: "/dummy/profile3.png",
            text: "올겨울은 이 제품 하나로 버틸 수 있을 것 같아요.",
          },
        ],
      },
    };
  }

  try {
    const res = await instance.get(`/articles/${articleId}`);
    return res.data;
  } catch (err) {
    console.error("❌ 아티클 상세 조회 실패", err);
    throw err;
  }
};

/**
 * 내가 스크랩한 아티클 목록 조회 현재 백엔드 api 에 없음 관심아티클 api 만들어야함
 */
export const fetchScrapArticles = async () => {
  if (isMockMode()) {
    console.log("🧪 [Mock] fetchScrapArticles 호출됨");
    return {
      isSuccess: true,
      result: [
        {
          articleName: "겨울철 뜨지 않는 베이스를 원한다면",
          articleImageUrl: article1,
          articleTag: "#뷰티소식",
        },
        {
          articleName: "수분가득 화잘먹 썬크림",
          articleImageUrl: article2,
          articleTag: "#수분케어",
        },
      ],
    };
  }

  try {
    const res = await instance.get("/members/me/scraps/articles");
    return res.data;
  } catch (err) {
    console.error("스크랩 아티클 조회 실패", err);
    throw err;
  }
};
