import React, { useState } from "react";
import "./index.scss";
import { toTop } from "../../methods";

export default function EasyActions({ children, className = "" }) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className={`easy-actions ${className} ${isActive ? "active" : ""}`}>
      <div className="content-body">
        <div className="content">
          {children}
          <button className="opener btn" onClick={toTop}>
            <img src="/assets/icons/chevron-right.svg" alt="right" />
          </button>
        </div>
      </div>
    </div>
  );
}
