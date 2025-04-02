import React from "react";
import "./index.scss";

export default function Banner({ image }) {
  return (
    <div className="banner">
      <img src={image} alt="banner" />
    </div>
  );
}
