import React from "react";
import MenuContent from "./MenuContent";
import MobileSearch from "../search/MobileSearch";

export default function MainMenu({ activeMenu, setActiveMenu }) {
  return (
    <div className={`main-menu ${activeMenu.isOpen ? "active" : ""}`}>
      {activeMenu.content ? (
        <MenuContent setActiveMenu={setActiveMenu} />
      ) : (
        <MobileSearch setActiveMenu={setActiveMenu} />
      )}
    </div>
  );
}
