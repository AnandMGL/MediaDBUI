import React from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import SectionSeven from "../recruitment/SectionTwo";

export default function ProfileContentSwitcher({
  section,
  setSection,
  resumes,
  setResumes,
  setResume,
  resume,
  deleteResume,
  copyResume,
  user,
}) {
  switch (section) {
    case 1:
      return <SectionOne resumes={resumes} />;
    case 2:
      return (
        <SectionTwo
          setSection={setSection}
          resumes={resumes}
          setResume={setResume}
          resume={resume}
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
          setSection={setSection}
          resume={resume}
          setResume={setResume}
          resumes={resumes}
          setResumes={setResumes}
        />
      );
    case 6:
      return <SectionSix setSection={setSection} user={user} />;
    case 7:
      return <SectionSeven setSection={setSection} />;
    default:
      return <SectionOne />;
  }
}
