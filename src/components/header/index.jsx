import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { Link, useLocation } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import MainMenu from "./MainMenu";
import HamburgerMenu from "react-hamburger-menu";
import { useSelector } from "react-redux";
import "./index.scss";

export default function Header() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  const [activeMenu, setActiveMenu] = useState({ isOpen: false });

  useEffect(() => {
    setActiveMenu({ isOpen: false });
  }, [pathname]);

  return (
    <div className="header">
      <div className="container">
        <div className="header-top">
          <div className="left-side">
            <div className={`desktop ${pathname === "/" ? "h" : ""}`}>
              <Logo
                logo={`/assets/images/logo${pathname === "/" ? "h" : ""}.svg`}
              />
            </div>
            <div className="mobile">
              <Logo logo="/assets/images/logo.svg" />
            </div>
          </div>
          <div className="right-side">
            <Link
              to="/recruitment"
              className={`btn ${pathname === "/recruitment" ? "active" : ""}`}
            >
              채용정보
            </Link>
            <Link
              to="/profile"
              className={`btn creator ${
                pathname === "/profile" ? "active" : ""
              }`}
            >
              크리에이터
            </Link>
            {user.token ? (
              <UserDropDown user={user} />
            ) : (
              <Link
                to="/login"
                className={`btn login ${
                  pathname === "/login" ? "noactive" : ""
                }`}
              >
                로그인
              </Link>
            )}
            <button
              onClick={() => setActiveMenu({ isOpen: !activeMenu.isOpen })}
              className="mobile search btn"
            >
              <img src="/assets/icons/search-2.svg" alt="search" />
            </button>
            <HamburgerMenu
              className="menu-burger"
              isOpen={activeMenu.isOpen}
              menuClicked={() =>
                setActiveMenu({ isOpen: !activeMenu.isOpen, content: "menu" })
              }
              width={24}
              height={window.innerWidth < 769 ? 14 : 18}
              strokeWidth={2}
              rotate={0}
              color="#8F66FF"
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>
        </div>
      </div>
      <div className={`container mobile ${pathname === "/" ? "" : "d-none"}`}>
        <div className="header-bottom">
          <Link to="profile" state={{ tab: 6 }} className="btn">
            채용정보
            <img src="/assets/icons/layers.svg" alt="layers" />
          </Link>
          <Link to="profile" className="btn creator">
            크리에이터
            <img src="/assets/icons/pen-tool.svg" alt="pen-tool" />
          </Link>
        </div>
      </div>
      <MainMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    </div>
  );
}
