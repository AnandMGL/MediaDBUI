import useMediaQuery from "../../hooks/useMediaQuery";
import React from "react";
import { Link } from "react-router-dom";

export default function MenuContent({ setActiveMenu }) {
  const isMobile = useMediaQuery(767);

  const handleLinkClick = (tab) => {
    if (tab) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="menu-list">
            <h5>
              <img src="/assets/icons/ver-list.svg" alt="list" /> 채용 정보
            </h5>
            {isMobile ? (
              <Link
                to="profile"
                state={{ tab: 6 }}
                onClick={() => handleLinkClick(6)}
              >
                <img
                  src="/assets/icons/ver-list.svg"
                  alt="ver-list"
                  style={{ opacity: 0 }}
                />
                지원 현황
              </Link>
            ) : (
              <Link
                to="recruitment"
                state={{ tab: 1 }}
                onClick={() => handleLinkClick(1)}
              >
                <img
                  src="/assets/icons/ver-list.svg"
                  alt="ver-list"
                  style={{ opacity: 0 }}
                />
                지원 현황
              </Link>
            )}

            {isMobile ? (
              <Link
                to="profile"
                state={{ tab: 7 }}
                onClick={() => handleLinkClick(7)}
              >
                <img
                  src="/assets/icons/ver-list.svg"
                  alt="ver-list"
                  style={{ opacity: 0 }}
                />
                스크랩 한 채용
              </Link>
            ) : (
              <Link
                to="recruitment"
                state={{ tab: 2 }}
                onClick={() => handleLinkClick(2)}
              >
                <img
                  src="/assets/icons/ver-list.svg"
                  alt="ver-list"
                  style={{ opacity: 0 }}
                />
                스크랩 한 채용
              </Link>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="menu-list">
            <h5>
              <img src="/assets/icons/pen-tool.svg" alt="pen" />
              크리에이터
            </h5>
            <Link
              to="profile"
              state={{ tab: 1 }}
              onClick={() => handleLinkClick(1)}
            >
              <img
                src="/assets/icons/pen-tool.svg"
                alt="pen-tool"
                style={{ opacity: 0 }}
              />
              계정정보
            </Link>
            <Link
              to="profile"
              state={{ tab: 2 }}
              onClick={() => handleLinkClick(2)}
            >
              <img
                src="/assets/icons/pen-tool.svg"
                alt="pen-tool"
                style={{ opacity: 0 }}
              />
              이력서 관리
            </Link>
            <Link
              to="profile"
              state={{ tab: 3 }}
              onClick={() => handleLinkClick(3)}
            >
              <img
                src="/assets/icons/pen-tool.svg"
                alt="pen-tool"
                style={{ opacity: 0 }}
              />
              증명서 신청
            </Link>
            <Link
              to="profile"
              state={{ tab: 4 }}
              onClick={() => handleLinkClick(4)}
            >
              <img
                src="/assets/icons/pen-tool.svg"
                alt="pen-tool"
                style={{ opacity: 0 }}
              />
              급여 명세서
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="menu-list">
            <Link to="announcement" onClick={() => handleLinkClick(1)}>
              <img src="/assets/icons/minus.svg" alt="minus" />
              공지사항
            </Link>
            <Link to="reference">
              <img
                src="/assets/icons/minus.svg"
                alt="minus"
                style={{ opacity: 0 }}
              />
              자료실
            </Link>
          </div>
          <div className="menu-list">
            <Link to="headhunting" onClick={() => handleLinkClick(1)}>
              <img src="/assets/icons/compass.svg" alt="compass" />
              헤드헌팅 서비스
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
