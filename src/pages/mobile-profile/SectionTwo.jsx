import React from "react";

export default function SectionTwo({
  setSection,
  resumes,
  setResume,
  deleteResume,
  copyResume,
}) {
  return (
    <div className="page-content-two">
      <h4 className="title">이력서 관리</h4>
      <div className="resumes">
        {resumes?.map((resume, i) => {
          const labelId = `enhanced-table-checkbox-${i}`;
          return (
            <div key={i} className="resume">
              <div className="flex-between top">
                <div id={labelId} className="left-side">
                  <h5 className="title">{resume.title}</h5>
                  <h6 className="mod-date">{resume.createdDate}</h6>
                </div>
                <div id={labelId} className="right-side">
                  <h6 className={`status ${resume.status}`}>
                    {resume.status === "WRITING" ? "작성중" : "작성 완료"}
                  </h6>
                </div>
              </div>
              <div className="bottom-buttons flex-between">
                <button
                  className="btn edit-btn"
                  onClick={() => {
                    setResume(resume);
                    setSection(5);
                  }}
                >
                  <img src="/assets/icons/edit-3.svg" alt="edit" />
                  수정
                </button>
                <button
                  className="btn copy-btn"
                  onClick={() => copyResume(resume)}
                >
                  <img src="/assets/icons/copy.svg" alt="copy" />
                  복사
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => deleteResume(resume.id)}
                >
                  <img src="/assets/icons/trash-2.svg" alt="delete" />
                  삭제
                </button>
              </div>
            </div>
          );
        })}
        {resumes?.length !== 3 ? (
          <button
            className="btn add-btn flex-center w-100"
            onClick={() => {
              setSection(5);
              setResume("");
            }}
          >
            <img src="/assets/icons/plus-square.svg" alt="add-btn" />
            이력서 추가하기
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
