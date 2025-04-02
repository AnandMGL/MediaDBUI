import React from "react";

export default function ProfileTop({ setSection, section, user }) {
  return (
    <div className="recruit-top flex-start">
      <h5 className="name">채용정보</h5>
      <div className="tab-switcher desktop flex-center">
        <button
          className={`btn switcher-item ${section === 1 ? "active" : ""}`}
          onClick={() => setSection(1)}
        >
          지원 현황
        </button>
        <button
          className={`btn switcher-item ${section === 2 ? "active" : ""}`}
          onClick={() => setSection(2)}
        >
          스크랩한 채용정보
        </button>
      </div>
    </div>
  );
}
