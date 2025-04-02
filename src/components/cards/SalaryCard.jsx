import React from "react";
import "./salary.card.scss";
import dayjs from "dayjs";

function formatNumber(num) {
  return num.toLocaleString();
}

export default function SalaryCard({ content, i }) {
  return (
    <div className="salary-card">
      <span className="number">{i + 1}</span>
      <div className="card-content flex-between">
        <div className="left-side">
          <h5 className="type flex-between">
            <span>급여년월</span>
            {dayjs(content.dateString).format("YYYY.MM")}
          </h5>
          <h5 className="type flex-between">
            <span>지급일</span>
            {formatNumber(content.sum)}
          </h5>
          <h5 className="usage">{content.companyName}</h5>
        </div>
        <div className="right-side">
          <h5 className="type flex-between">
            <span>급여년월</span>
            {dayjs(content.createdDate).format("YYYY.MM.DD")}
          </h5>
          <h5 className="type flex-between">
            <span>지급일</span>
            {formatNumber(content.sub)}
          </h5>
          <h5 className="type flex-between">
            <span>차인 지급</span>
            {formatNumber(content.sum - content.sub)}
          </h5>
        </div>
      </div>
    </div>
  );
}
