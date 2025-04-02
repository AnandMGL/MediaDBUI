import React from "react";
import "./calender.card.scss";
import Banner from "../banner";
import FavouriteButton from "../buttons/favourite-button";
import { dateFormatter, imgURL } from "../../constants/constants";

export default function CalenderCard({ content }) {
  return (
    <div className="calender-card">
      <div className="header-card">
        <Banner image={imgURL + content.image} />
      </div>
      <div className="body-card">
        <div className="comp-name">
          <p>{content.compName}</p>
          <FavouriteButton content={content} />
        </div>
        <div className="description">
          <h5>{content.calenderTitle}</h5>
        </div>
        <h6 className="job-type">{content.occupationName}</h6>
        <div className="footer-card">
          {content.career ? (
            <button className="back-type btn">
              {content.career} | {content.eduHistoryTo}
            </button>
          ) : (
            <button className="back-type btn">무관</button>
          )}
          <span className="notice-dedline">
            {dateFormatter(content.calendarEndDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
