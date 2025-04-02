import React, { useState } from "react";
import "./first.modal.scss";
import { Box } from "@mui/material";

export default function FirstModal({
  resumes,
  setModal,
  openSecondModal,
  handleFileChange,
  selectedFile,
  setSelectedFile,
  setResumeId,
}) {
  const [selectedResume, setSelectedResume] = useState(null);

  const handleResumeClick = (resume) => {
    setSelectedResume(resume);
    setResumeId(resume.id);
    setSelectedFile(null);
  };

  const handleResumeFileClick = (fileResume) => {
    setSelectedResume(fileResume);
  };

  return (
    <div className="first-content">
      <div className="content-body">
        {resumes?.length > 0 ? (
          resumes?.map((resume, i) => {
            return (
              <div
                key={i}
                className={`resume flex-between ${
                  selectedResume === resume ? "selected" : ""
                }`}
                onClick={() => handleResumeClick(resume)}
              >
                <div className="left-side flex-between">
                  <h6 className={`status ${resume.status}`}>
                    {resume.status === "WRITING" ? "작성중" : "작성 완료"}
                  </h6>
                  <h6 className="mod-date">{resume.updatedDate}</h6>
                  <h5 className="title desktop">{resume.title}</h5>
                </div>
                <div className="right-side flex-between">
                  <h5 className="title mobile">{resume.title}</h5>
                  <div className="flex-center">
                    {selectedResume === resume ? (
                      <img
                        className="circle"
                        src="/assets/icons/circle-cv.svg"
                        alt="circle"
                      />
                    ) : (
                      <img
                        className="circle"
                        src="/assets/icons/circle.svg"
                        alt="circle"
                      />
                    )}
                    선택
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="resume">
            <div className="no-resume-data">
              <img src="/assets/icons/no-data.svg" alt="circle" />

              <h5 className="title">저장된 이력서가 없습니다.</h5>
            </div>
          </div>
        )}

        <hr />

        <div
          className="resume flex-between"
          onClick={() => handleResumeFileClick(selectedFile)}
        >
          <div className="left-side flex-between">
            <label htmlFor="fileInput" className="file-upload-label">
              <h6 className="status">
                {"writing" ? "업체 서식 이력서 업로드" : "작성 완료"}
              </h6>
              {selectedFile ? (
                <Box
                  className="desktop"
                  sx={{
                    marginLeft: "12px",
                    width: 350,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    display: "inline-block",
                    textOverflow: "ellipsis",
                    fontSize: "18px",
                  }}
                >
                  {selectedFile.name}
                </Box>
              ) : (
                <h6 className="file-upload-label desktop">*OOO 이력서.docx</h6>
              )}
            </label>
            <input
              id="fileInput"
              className={`file-upload ${
                selectedResume === selectedFile ? "selected" : ""
              }`}
              type="file"
              onChange={handleFileChange}
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>
          <div className="right-side flex-between">
            <label htmlFor="fileInput" className="file-upload-label mobile">
              {selectedFile ? (
                <Box
                  sx={{
                    width: 240,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    display: "inline-block",
                    textOverflow: "ellipsis",
                    fontSize: "12px",
                  }}
                >
                  {selectedFile.name}
                </Box>
              ) : (
                <h6 className="file-upload-label mobile">*OOO 이력서.docx</h6>
              )}
            </label>
            <div className="flex-center">
              {selectedFile && selectedResume ? (
                <img
                  className="circle"
                  src="/assets/icons/circle-cv.svg"
                  alt="circle"
                />
              ) : (
                <img
                  className="circle"
                  src="/assets/icons/circle.svg"
                  alt="circle"
                />
              )}
              선택
            </div>
          </div>
        </div>
        <hr />

        <div className="helper-buttons flex-center">
          <button className="find btn" onClick={() => setModal(false)}>
            취소
          </button>

          {selectedResume ? (
            <button
              className="find btn"
              onClick={() => {
                setModal(false);
                openSecondModal();
              }}
            >
              다음
            </button>
          ) : (
            <button
              disabled
              className="find btn"
              onClick={() => {
                setModal(false);
                openSecondModal();
              }}
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
