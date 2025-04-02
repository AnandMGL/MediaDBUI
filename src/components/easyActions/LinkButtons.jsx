import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import HashSearchField from "../search/HashSearchField";

export default function LinkButtons() {
  const [hashIcon, setHashIcon] = useState(false);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -470;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <div className="link-buttons">
      <div className="flex-center search">
        {hashIcon && <HashSearchField setHashIcon={setHashIcon} />}
        <HashLink to="/#search" scroll={scrollWithOffset}>
          <img
            src="/assets/icons/search.svg"
            alt="search"
            onClick={() => setHashIcon(!hashIcon)}
          />
        </HashLink>
      </div>
      <Link to="/recruitment" className="flex-center recruit">
        <span>채용 정보</span>
        <img src="/assets/icons/ver-list.svg" alt="recruit" />
      </Link>
      <Link to="/profile" className="flex-center profile">
        <span>크리에이터</span>
        <img src="/assets/icons/pen-tool.svg" alt="profile" />
      </Link>
    </div>
  );
}
