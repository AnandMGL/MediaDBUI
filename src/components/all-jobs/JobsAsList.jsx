import React from "react";
import JobsAsCard from "../cards/JobsAsCard";

export default function JobsAsList({ jobs }) {
  return (
    <div className="all-jobs-list">
      <div className="row">
        {jobs &&
          jobs.content?.map((job, i) => (
            <div className="col-md-6" key={i}>
              <JobsAsCard content={job} />
            </div>
          ))}
      </div>
    </div>
  );
}
