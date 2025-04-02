import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../actions/user";

export default function UserDropDown({ user }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [active, setActive] = useState(false);

  const logOut = () => {
    dispatch(setUserData({}));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-drop-down" ref={dropdownRef}>
      <button className="btn" onClick={() => setActive(!active)}>
        <span>{user.name ?? "홍길동님"}</span>
        <img src="/assets/icons/arrow-down.svg" alt="arrow" />
      </button>
      {active && (
        <div className="drop-down-content">
          <button className="btn log-out" onClick={logOut}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
