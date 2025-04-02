import React from "react";
import "./index.scss";
import Banner from "../banner";
import { Link } from "react-router-dom";
import FavouriteButton from "../buttons/favourite-button";
import { formatDate, imgURL } from "../../constants/constants";

export default function RecruitmentCard({ content }) {
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
        <h6 className="job-type">{content.occupationName}</h6>
        <div className="footer-card">
          {content.career ? (
            <button className="back-type btn">
              {content.career} | {content.eduHistoryTo || content.eduHistory}
            </button>
          ) : (
            <button className="back-type btn">무관</button>
          )}
          <span className="notice-dedline">
            {formatDate(content.noticeDedline)}
          </span>
        </div>
      </div>
    </Link>
  );
}
