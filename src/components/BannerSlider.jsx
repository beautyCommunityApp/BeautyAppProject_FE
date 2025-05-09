// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "./../components/BannerSlider.css";
// // import bannerImg from "./../assets/images/banner.png";
// import bannerImg from "./../assets/images/banner.png";
// import bannerImg1 from "./../assets/images/banner1.png";
// import bannerImg2 from "./../assets/images/banner2.png";

// import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css/pagination";
// ✅ 최신 디자인 기준으로 수정된 BannerSlider.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./../components/BannerSlider.css";

import bannerImg from "./../assets/images/banner.png";
import bannerImg1 from "./../assets/images/banner1.png";
import bannerImg2 from "./../assets/images/banner2.png";

const slides = [
  {
    img: bannerImg,
    title: "이번주 주목받은 제품은?",
    subtitle: "로사메이 더마 케어 세트",
  },
  {
    img: bannerImg1,
    title: "신상 클렌저 출시!",
    subtitle: "모공 딥클렌징 폼",
  },
  {
    img: bannerImg2,
    title: "화제의 토너 리뷰",
    subtitle: "블루 아카페 포어 에센스",
  },
];

function BannerSlider() {
  return (
    <div className="banner-slider">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="banner-slide">
              <img
                src={slide.img}
                alt={`slide-${index}`}
                className="banner-img"
              />
              <div className="banner-overlay">
                <p className="banner-title">{slide.title}</p>
                <p className="banner-subtitle">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerSlider;

// const slides = [
//   {
//     img: bannerImg,
//     text: "이번주 주목받은 제품은?\n로사메이 더마 케어 세트",
//   },
//   {
//     img: bannerImg,
//     text: "신상 클렌저 출시!\n모공 딥클렌징 폼",
//   },
//   {
//     img: bannerImg,
//     text: "화제의 토너 리뷰\n블루 아카페 포어 에센스",
//   },
// ];

// function BannerSlider() {
//   return (
//     // <div className="banner-slider">
//     //   <Swiper loop={true} autoplay={{ delay: 3000 }}>
//     //     {slides.map((slide, index) => (
//     //       <SwiperSlide key={index}>
//     //         <div className="banner-slide">
//     //           <img src={slide.img} alt={`slide-${index}`} className="banner-img" />
//     //           <div className="overlay">
//     //             <div className="text">{slide.text}</div>
//     //           </div>
//     //         </div>
//     //       </SwiperSlide>
//     //     ))}
//     //   </Swiper>
//     // </div>
//     <div className="banner-slider">
//       <Swiper
//         modules={[Pagination, Autoplay]}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="banner-slide">
//               <img
//                 src={slide.img}
//                 alt={`slide-${index}`}
//                 className="banner-img"
//               />
//               <div className="banner-overlay">
//                 <p className="banner-text">{slide.text}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default BannerSlider;
