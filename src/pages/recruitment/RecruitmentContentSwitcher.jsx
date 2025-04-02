import React from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

export default function RecruitmentContentSwitcher({ section, user }) {
  switch (section) {
    case 1:
      return <SectionOne user={user} />;
    case 2:
      return <SectionTwo />;
    default:
      return <SectionOne />;
  }
}
