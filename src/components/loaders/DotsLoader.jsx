import React from "react";
import "./dots-loader.scss";

export default function DotsLoader() {
  return (
    <section className="wrapper">
      <div className="card">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}
