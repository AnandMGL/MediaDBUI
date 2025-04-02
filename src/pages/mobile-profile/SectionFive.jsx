import React from "react";
import { useState } from "react";
import ActionSteps from "./steps/ActionSteps";
import StepSwitcher from "./steps/StepSwitcher";
import "./steps/index.scss";

export default function SectionFive({
  resume,
  setResume,
  resumes,
  setResumes,
  setSection,
}) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="page-content-five">
      <div className="content-top flex-between">
        <button className="btn back-btn flex-center">
          <img src="/assets/icons/arrow-left-circle.svg" alt="back" />
          이력서 작성
        </button>
        <ActionSteps activeStep={activeStep} />
        <hr />
      </div>
      <div className="step">
        <StepSwitcher
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          setResume={setResume}
          resume={resume}
          resumes={resumes}
          setResumes={setResumes}
          setSection={setSection}
        />
      </div>
    </div>
  );
}
