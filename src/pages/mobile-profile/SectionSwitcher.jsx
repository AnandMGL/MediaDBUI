import React from "react";
import { useState } from "react";
import { sectionName } from "../../methods";
import "./section-switcher.scss";

export default function SectionSwitcher({ setSection, section }) {
  const [active, setActive] = useState(false);

  const switcher = (number) => {
    setActive(!active);
    setSection(number);
  };

  return (
    <div className="section-drop-down">
      <button className="btn open-btn" onClick={() => setActive(!active)}>
        {sectionName(section)}
        <img src="/assets/icons/arrow-down.svg" alt="arrow" />
      </button>
      {active && (
        <div className="drop-down-content">
          <button className="btn switcher-btn" onClick={() => switcher(1)}>
            계정 정보
          </button>
          <button className="btn switcher-btn" onClick={() => switcher(2)}>
            이력서 관리
          </button>
          <button className="btn switcher-btn" onClick={() => switcher(3)}>
            증명서 신청
          </button>
          <button className="btn switcher-btn" onClick={() => switcher(4)}>
            급여 명세서
          </button>
          <button className="btn switcher-btn" onClick={() => switcher(6)}>
            지원 현황
          </button>
          <button className="btn switcher-btn" onClick={() => switcher(7)}>
            스크랩한 채용정보
          </button>
        </div>
      )}
    </div>
  );
}
