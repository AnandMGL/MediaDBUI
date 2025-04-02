import React from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

export default function StepSwitcher({
  activeStep,
  setActiveStep,
  resume,
  setResume,
  resumes,
  setResumes,
  setSection,
}) {
  switch (activeStep) {
    case 1:
      return (
        <StepOne
          setActiveStep={setActiveStep}
          resume={resume}
          setResume={setResume}
        />
      );
    case 2:
      return (
        <StepTwo
          setActiveStep={setActiveStep}
          resume={resume}
          setResume={setResume}
        />
      );
    case 3:
      return (
        <StepThree
          setActiveStep={setActiveStep}
          resume={resume}
          setResume={setResume}
        />
      );
    case 4:
      return (
        <StepFour
          setActiveStep={setActiveStep}
          resume={resume}
          setResume={setResume}
        />
      );
    case 5:
      return (
        <StepFive
          setActiveStep={setActiveStep}
          resume={resume}
          setResume={setResume}
          resumes={resumes}
          setResumes={setResumes}
          setSection={setSection}
        />
      );
    default:
      return <StepOne setActiveStep={setActiveStep} />;
  }
}
