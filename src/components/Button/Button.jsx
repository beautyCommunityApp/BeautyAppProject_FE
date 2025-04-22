// src/components/Button/Button.jsx
import React from 'react';
import './Button.css';

// function Button({ text, onClick, variant = 'primary', disabled = false, style }) {
//   return (
//     <button
//       className={`btn btn-${variant} ${disabled ? 'btn-disabled' : ''}`}
//       onClick={onClick}
//       disabled={disabled}
//       style={style}
//     >
//       {text}
//     </button>
//   );
// }
function Button({ text, type = "primary", onClick }) {
  return (
    <button
      className={`custom-button ${type}`}
      onClick={onClick}
      disabled={type === "disabled"}
    >
      {text}
    </button>
  );
}




export default Button;