import React from "react";
import SearchField from "./SearchField";

export default function MobileSearch({ setActiveMenu }) {
  return (
    <div className="mobile-search">
      <div className="container">
        <SearchField setActiveMenu={setActiveMenu} />
        <p>*검색어는 두 글자 이상 입력해 주세요.</p>
      </div>
    </div>
  );
}
