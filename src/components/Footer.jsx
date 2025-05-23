// src/components/Footer.jsx
import React from "react";
import "./../components/footer.css";
import footer1 from "../assets/images/footer1.svg";
import footer2 from "../assets/images/footer2.svg";
import footer3 from "../assets/images/footer3.svg";
import footer4 from "../assets/images/footer4.svg";
import footer5 from "../assets/images/footer5.svg";
import { useNavigate, useLocation } from "react-router-dom";

import footer1Active from "../assets/images/PFooter1.svg";
import footer2Active from "../assets/images/PFooter2.svg";
import footer5Active from "../assets/images/PFooter5.svg";
import footer3Active from "../assets/images/PFooter3.svg";

// function Footer() {
//   // Footer 내부
//   const navigate = useNavigate();

//   const menus = [
//     { img: footer1, path: "/home" },
//     { img: footer2, path: "/article" },
//     { img: footer3, path: "/event" },
//     { img: footer4, path: "/qna" },
//     { img: footer5, path: "/mypage" },
//   ];

//   return (
//     <div className="footer">

//       {menus.map((menu, index) => (
//         <div
//           className="footer-item"
//           key={index}
//           onClick={() => navigate(menu.path)}
//         >
//           <img src={menu.img} alt={menu.label} className="footer-icon" />
//           <span className="footer-label">{menu.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Footer;

function Footer() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인용

  const menus = [
    {
      defaultImg: footer1,
      activeImg: footer1Active,
      path: "/home",
    },
    {
      defaultImg: footer2,
      activeImg: footer2Active,
      path: "/article",
    },
    {
      defaultImg: footer3,
      activeImg: footer3Active,
      path: "/event",
    },
    {
      defaultImg: footer4,
      activeImg: footer1Active,
      path: "/qna",
    },
    {
      defaultImg: footer5,
      activeImg: footer5Active,
      path: "/mypage",
    },
  ];

  return (
    <div className="footer">
      {menus.map((menu, index) => {
        const isActive = location.pathname.startsWith(menu.path);
        return (
          <div
            className="footer-item"
            key={index}
            onClick={() => navigate(menu.path)}
          >
            <img
              src={isActive ? menu.activeImg : menu.defaultImg}
              alt={menu.label}
              className="footer-icon"
            />
            <span className={`footer-label ${isActive ? "active" : ""}`}>
              {menu.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Footer;
