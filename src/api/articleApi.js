import instance from "./instance";
import { isMockMode } from "../utils/envUtils";

//  샘플 이미지 (assets 폴더에 직접 추가해줘!)
import article1 from "../assets/images/article1.png";
import article2 from "../assets/images/article2.png";
import article3 from "../assets/images/article3.png";
import articleImg from "../assets/images/articleImg.png";

/**
 * 아티클 리스트 조회
 * - 실 서버 또는 개발용(Mock) 데이터 사용
 * - `/articles` API 호출
 */
export const fetchArticles = async () => {
  if (isMockMode()) {
    console.log("🧪 [Mock] fetchArticles 호출됨");
    //  개발용 Mock 상세 데이터
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
              createdAt: "2025-06-10T12:00:00", //  최근 (NEW 뱃지 붙을 예정)
            },
            {
              articleId: 2,
              articleName: "올해의 뷰티 트렌드 총정리",
              articleTag: "#뷰티소식",
              articleImageUrl: article2,
              createdAt: "2025-06-10T12:00:00", //  오래됨 (NEW 없음)
            },
            {
              articleId: 3,
              articleName: "2025 베스트셀러 TOP3 비교",
              articleTag: "#전문가꿀팁",
              articleImageUrl: article3,
              createdAt: "2025-05-27T12:00:00", //  최근 (NEW 뱃지)
            },
          ],
          pageNumber: 0,
          last: true,
        },
      },
    };
  }

  try {
    // 실제 서버에 요청
    const res = await instance.get("/articles");
    return res;
  } catch (err) {
    console.error("❌ 아티클 조회 실패", err);
    throw err;
  }
};

/**
 *  아티클 상세 조회
 * - `/articles/{articleId}` API 호출
 * - Mock일 경우 에디터 정보와 댓글 포함된 구조 제공
 */
export const fetchArticleDetail = async (articleId) => {
  if (isMockMode()) {
    console.log("🧪 [Mock] fetchArticleDetail 호출됨");
    // 개발용 Mock 상세 데이터
    return {
      isSuccess: true,
      result: {
        articleId: Number(articleId),
        articleName: "건조한 피부, 진정 깊은 보습을 만나다",
        articleTag: "#에디터찐템",
        articleImageUrl: articleImg,
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
            daysAgo: "방금 전",
          },
          {
            id: 2,
            nickname: "수명산너구리",
            age: 21,
            gender: "남",
            skinType: "복합성",
            profileImageUrl: "/dummy/profile2.png",
            text: "정말 좋아요. 매일 아침마다 사용 중입니다.",
            daysAgo: "방금 전",
          },
          {
            id: 3,
            nickname: "까치산너구리",
            age: 21,
            gender: "남",
            skinType: "복합성",
            profileImageUrl: "/dummy/profile3.png",
            text: "올겨울은 이 제품 하나로 버틸 수 있을 것 같아요.",
            daysAgo: "방금 전",
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
// 좋아요 토글 API 호출
export const toggleArticleLike = async (articleId) => {
  try {
    const res = await instance.post(`/articles/${articleId}/likes/toggle`);
    return res.data;
  } catch (err) {
    console.error("❌ 좋아요 토글 API 오류", err);
    throw err;
  }
};
/**
 *  스크랩한 아티클 조회 (마이페이지용)내가 스크랩한 아티클 목록 조회 현재 백엔드 api 에 없음 관심아티클 api 만들어야함
 * - 현재 실제 API 없음 → 나중에 백엔드 `/members/me/scraps/articles` 추가 예정
 * - Mock 데이터 사용
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
