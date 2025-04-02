import React from "react";
import "./process.scss";

export default function Process() {
  return (
    <div className="process">
      <div className="progress-row flex-between">
        <div className="progress-item flex-between">
          <h6>기업 의뢰</h6>
          <img src="/assets/icons/mark.svg" alt="email" />
        </div>
        <div className="corner">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
        <div className="progress-item flex-between">
          <h6>Needs 분석</h6>
          <img src="/assets/icons/insert.svg" alt="insert" />
        </div>
        <div className="corner">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
        <div className="progress-item flex-between">
          <h6>헤드헌팅 서비스 계약 체결</h6>
          <img src="/assets/icons/handshake.svg" alt="handshake" />
        </div>
      </div>
      <div className="progress-row middle flex-between">
        <div className="progress-item" />
        <div className="progress-item" />
        <div className="progress-item">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
      </div>
      <div className="progress-row second flex-between">
        <div className="progress-item flex-between">
          <h6>인재 추천</h6>
          <img src="/assets/icons/recent.svg" alt="recent" />
        </div>
        <div className="corner">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
        <div className="progress-item flex-between">
          <h6>사전인터뷰</h6>
          <img src="/assets/icons/videoo.svg" alt="videoo" />
        </div>
        <div className="corner">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
        <div className="progress-item flex-between">
          <h6>후보자 Search 진행</h6>
          <img src="/assets/icons/persons.svg" alt="person" />
        </div>
      </div>
      <div className="progress-row middle flex-between">
        <div className="progress-item">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
        <div className="progress-item" />
        <div className="progress-item" />
      </div>
      <div className="progress-row flex-between">
        <div className="progress-item flex-between">
          <h6>채용 결정</h6>
          <img src="/assets/icons/badge.svg" alt="badge" />
        </div>
        <div className="corner">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
        <div className="progress-item flex-between">
          <h6>사후 관리</h6>
          <img src="/assets/icons/insert.svg" alt="insert" />
        </div>
        <div className="corner fade">
          <img src="/assets/icons/corner.svg" alt="corner" />
        </div>
        <div className="progress-item flex-between fade" />
      </div>
    </div>
  );
}
