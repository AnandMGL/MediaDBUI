import React from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionFiveUpdate from "./SectionFiveUpdate";

export default function ProfileContentSwitcher({
  user,
  section,
  setSection,
  resumes,
  setResumes,
  resume,
  setResume,
  deleteResume,
  copyResume,
}) {
  switch (section) {
    case 1:
      return <SectionOne />;
    case 2:
      return (
        <SectionTwo
          setResume={setResume}
          resumes={resumes}
          setSection={setSection}
          user={user}
          deleteResume={deleteResume}
          copyResume={copyResume}
        />
      );
    case 3:
      return <SectionThree />;
    case 4:
      return <SectionFour user={user} />;
    case 5:
      return (
        <SectionFive
          user={user}
          setSection={setSection}
          resume={resume}
          resumes={resumes}
          setResumes={setResumes}
        />
      );
    case 6:
      return (
        <SectionFiveUpdate
          setSection={setSection}
          resume={resume}
          setResume={setResume}
          resumes={resumes}
          setResumes={setResumes}
          user={user}
        />
      );
    default:
      return <SectionOne />;
  }
}
