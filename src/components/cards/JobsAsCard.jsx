import React from "react";
import "./jobsas.card.scss";
import Banner from "../banner";
import { Link } from "react-router-dom";
import FavouriteButton from "../buttons/favourite-button";
import { formatDate, imgURL } from "../../constants/constants";

export default function JobsAsCard({ content }) {
  return (
    <Link to={`/job/${content.id}`} className="recruitment-card">
      <div className="header-card">
        <Banner image={imgURL + content.thumbnail} />
      </div>
      <div className="body-card">
        <div className="comp-name">
          <p>{content.companyName}</p>
          <FavouriteButton content={content} />
        </div>
        <div className="description">
          <h5 className="">{content.title}</h5>
        </div>
        <h6 className="job-type">{content.companyIndustry}</h6>
        <div className="footer-card">
          {content.career ? (
            content.eduHistoryFrom && (
              <button className="back-type btn">
                {content.career} | {content.eduHistoryTo || "무관"}
              </button>
            )
          ) : (
            <button className="back-type btn">무관</button>
          )}
          <span className="notice-dedline">{formatDate(content.periodTo)}</span>
        </div>
      </div>
    </Link>
  );
}
