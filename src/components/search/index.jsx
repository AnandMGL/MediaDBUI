import React from "react";
import "./index.scss";
import SearchField from "./SearchField";

export default function Search({ allJobsFilter }) {
  return (
    <div className="search mobile">
      <SearchField allJobsFilter={allJobsFilter} />
    </div>
  );
}
