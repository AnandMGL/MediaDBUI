import React from "react";
import Banner from "../banner";
import "./insigth.card.scss";
import { Link } from "react-router-dom";
import FavouriteButton from "../buttons/favourite-button";
import { formatDate, imgURL } from "../../constants/constants";

export default function InsightCard({ content }) {
  return (
    <Link to={`/job/${content.id}`} className="insigth-card">
      <div className="header-card">
        <Banner image={imgURL + content.thumbnail} />
        <FavouriteButton content={content} />
      </div>
      <div className="body-card">
        <div className="comp-name">
          <p>{content.companyName}</p>
        </div>
        <div className="description">
          <h5 className="">{content.title}</h5>
        </div>
      </div>
      <div className="footer-card">
        <span className="notice-dedline">
          {formatDate(content.noticeDedline)}
        </span>
      </div>
    </Link>
  );
}
