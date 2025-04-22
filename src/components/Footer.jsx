// src/components/Footer.jsx
import React from "react";
import "./../components/footer.css";
import footer1 from "../assets/images/footer1.png";
import footer2 from "../assets/images/footer2.png";
import footer3 from "../assets/images/footer3.png";
import footer4 from "../assets/images/footer4.png";
import footer5 from "../assets/images/footer5.png";
import { useNavigate } from "react-router-dom";
function Footer() {
  
  

  // Footer 내부
const navigate = useNavigate();

const menus = [
  { img: footer1, label: "홈", path: "/home" },
  { img: footer2, label: "아티클", path: "/article" },
  { img: footer3, label: "이벤트", path: "/event" },
  { img: footer4, label: "Q&A", path: "/qna" },
  { img: footer5, label: "마이페이지", path: "/mypage" },
];
// const menus = [
//   { img: footer1, label: "홈" },
//   { img: footer2, label: "아티클" },
//   { img: footer3, label: "이벤트" },
//   { img: footer4, label: "Q&A" },
//   { img: footer5, label: "마이페이지" },
// ];






  
  

  return (
    <div className="footer">
      {/* {menus.map((menu, index) => (
        <div className="footer-item" key={index}>
          <img src={menu.img} alt={menu.label} className="footer-icon" /> */}
          {/* <span className="footer-label">{menu.label}</span> */}
          {menus.map((menu, index) => (
  <div className="footer-item" key={index} onClick={() => navigate(menu.path)}>
    <img src={menu.img} alt={menu.label} className="footer-icon" />
    <span className="footer-label">{menu.label}</span> 
          
        </div>

        
      ))}

      
    </div>
  );
}


export default Footer;
