import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./reference.card.scss";

export default function ReferenceCard({ content, i }) {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname}/${content.id}`} className="reference-card">
      <div className="card-top flex-between">
        <div className="left-side">
          <span
            style={{
              borderRight: "1px solid #8C8C8C",
              marginRight: "10px",
              padding: "0 10px",
            }}
          >
            {i + 1}
          </span>
          <span>{content.createdDate}</span>
        </div>
        <div className="right-side">
          <span>조회수 :</span>
          <span> {"99999"}</span>
        </div>
      </div>
      <hr />
      <div className="card-content">
        <h5 className="type">{content.title}</h5>
        <Link to="#" className="status">
          {content.attachmentName}
        </Link>
      </div>
    </Link>
  );
}
