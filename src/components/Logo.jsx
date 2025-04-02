import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ logo }) {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
}
