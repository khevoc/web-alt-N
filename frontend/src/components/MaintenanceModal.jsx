import React from "react";
import "./MaintenanceModal.css";

export default function MaintenanceModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="circle-text">
          <span>O</span>
          <span>p</span>
          <span>t</span>
          <span>i</span>
          <span>o</span>
          <span>n&nbsp;</span>
          <span>i</span>
          <span>n&nbsp;</span>
          <span>m</span>
          <span>a</span>
          <span>i</span>
          <span>n</span>
          <span>t</span>
          <span>e</span>
          <span>n</span>
          <span>a</span>
          <span>n</span>
          <span>c</span>
          <span>e</span>
        </div>
      </div>
    </div>
  );
}


