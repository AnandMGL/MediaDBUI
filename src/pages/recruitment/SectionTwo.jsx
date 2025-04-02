import React from "react";
import { useSelector } from "react-redux";
import RecruitmentCard from "../../components/cards";

export default function SectionTwo() {
  const choosenList = useSelector((state) => state.choosenList);

  return (
    <div className="page-content-two">
      <h5 className="title">스크랩한 채용정보</h5>
      <hr />
      <div className="all-jobs-list">
        <div className="row">
          {choosenList.map((job, i) => (
            <div className="col-md-6" key={i}>
              <RecruitmentCard content={job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
