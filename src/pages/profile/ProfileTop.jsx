import React from "react";

export default function ProfileTop({ setSection, section, user }) {
  return (
    <div className="profile-top flex-start">
      <h5 className="name">{"크리에이터"}</h5>
      <div className="tab-switcher desktop flex-center">
        <button
          className={`btn switcher-item ${section === 1 ? "active" : ""}`}
          onClick={() => setSection(1)}
        >
          계정 정보
        </button>
        <button
          className={`btn switcher-item ${
            section === 2 || section === 5 || section === 6 ? "active" : ""
          }`}
          onClick={() => setSection(2)}
        >
          이력서 관리
        </button>
        <button
          className={`btn switcher-item ${section === 3 ? "active" : ""}`}
          onClick={() => setSection(3)}
        >
          증명서 신청
        </button>
        <button
          className={`btn switcher-item ${section === 4 ? "active" : ""}`}
          onClick={() => setSection(4)}
        >
          급여 명세서
        </button>
      </div>
    </div>
  );
}
