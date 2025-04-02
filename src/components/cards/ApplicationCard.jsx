import React from "react";
import "./application.card.scss";
import { Link } from "react-router-dom";

export default function ApplicationCard({
  content,
  i,
  setModal,
  setCertificate,
}) {
  return (
    <div className="application-card">
      <span className="number">{i + 1}</span>
      <div className="card-content flex-between">
        <div className="left-side">
          <h5 className="type">
            <span>{content.createdDate}</span>
            {content.type}
          </h5>
          <h5 className="usage">{content.purposeOfUsage}</h5>
        </div>
        <div className="right-side">
          <span>{content.updatedDate}</span>

          {content.type !== "원천징수영수증(이메일 발급)" &&
          content.type !== "갑종근로영수증(이메일 발급)" &&
          content.status === "APPROVED" ? (
            <Link
              className="status"
              onClick={() => {
                setModal(true);
                setCertificate(content);
              }}
            >
              {content.status === "APPROVED" && "허가"}
            </Link>
          ) : (
            <div>
              {(content.status === "REQUESTED" && "대기") ||
                (content.status === "DENIED" && "불가")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
