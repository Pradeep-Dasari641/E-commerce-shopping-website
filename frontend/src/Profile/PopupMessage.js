import React from "react";
import "./pages.css"; // Make sure to create this CSS file for styles

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-message">
        <span className="popup-icon">✅</span>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupMessage;
