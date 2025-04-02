import React from "react";
import "./status.card.scss";
// import SimpleCheckbox from "../inputs/SimpleCheckbox";
import { Link } from "react-router-dom";
import { imgURL } from "../../constants/constants";

export default function StatusCard({
  content,
  select,
  setModal,
  setCertificate,
}) {
  const handleDownloadClick = (file) => {
    const downloadLink = imgURL + file;

    const newTab = window.open(downloadLink, "_blank");
    newTab.focus();
  };

  return (
    <div className="status-card">
      <div className="card-top flex-between">
        <h6 className="flex-between">
          {/* <SimpleCheckbox
            onChange={(e) => select(e, content.id)}
            checked={content.isChecked || false}
          /> */}

          <span>{content.createdDate}</span>
        </h6>
        <div className="vertical-line" />
        <h6>
          <span>모집</span>
          {content.situation === "ACTIVE" ? "진행중" : "마감"}
        </h6>
        <div className="vertical-line" />
        <h6>
          <span>진행 현황</span>
          {content.status}
        </h6>
      </div>
      <div className="card-content">
        <h5 className="text-truncate">
          <Link to={`/job/${content.id}`}>{content.title}</Link>
        </h5>
        <h5>{content.customerName}</h5>
      </div>
      <div className="card-bottom flex-between">
        <Link onClick={() => handleDownloadClick(content.attachment)}>
          {content.attachment}
        </Link>
        <div className="vertical-line" />
        <h6>
          <span>진행 현황</span>
          <Link
            onClick={() => {
              setModal(true);
              setCertificate(content);
            }}
          >
            저장
          </Link>
        </h6>
      </div>
    </div>
  );
}
