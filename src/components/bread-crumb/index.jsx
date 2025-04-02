import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

export default function BreadCrumb({ crumbName, crumbName2 }) {
  return (
    <div className="bread-crumb">
      <Link to="/">
        <img src="/assets/icons/home.svg" alt="home" />
      </Link>
      {/* <Link to="/">
        <img src="/assets/icons/chevron-right.svg" alt="right" />
        카테고리 1
      </Link>
      <Link to="/">
        <img src="/assets/icons/chevron-right.svg" alt="right" />
        카테고리 2
      </Link> */}
      <Link to="#">
        <img src="/assets/icons/chevron-right.svg" alt="right" />
        {crumbName}
      </Link>
    </div>
  );
}
