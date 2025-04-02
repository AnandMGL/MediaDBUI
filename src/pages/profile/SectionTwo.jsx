import dayjs from "dayjs";
import React from "react";

export default function SectionTwo({
  setSection,
  setResume,
  resumes,
  deleteResume,
  copyResume,
}) {
  return (
    <div className="page-content-two">
      <div className="resumes">
        {resumes?.map((resume, i) => {
          return (
            <div key={i} className="resume flex-between">
              <div className="left-side flex-between">
                <h6 className={`status ${resume.status}`}>
                  {resume.status === "WRITING" ? "작성중" : "작성 완료"}
                </h6>
                <h6 className="mod-date">
                  {dayjs(resume.createdDate).format("YYYY.MM.DD")}
                </h6>
                <h5 className="title">{resume.title}</h5>
              </div>
              <div className="right-side flex-between">
                <button
                  className="btn edit-btn"
                  onClick={() => {
                    setResume(resume);
                    setSection(6);
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
              setSection(6);
              setResume("");
            }}
          >
            <img src="/assets/icons/plus-square.svg" alt="add-btn" />
            이력서 추가하기
          </button>
        ) : null}
      </div>
    </div>
  );
}
