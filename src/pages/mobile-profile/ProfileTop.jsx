import React from "react";
import SectionSwitcher from "./SectionSwitcher";

export default function ProfileTop({ setSection, section, user }) {
  return (
    <div className="profile-top flex-between">
      <h5 className="name">{"크리에이터"}</h5>
      <SectionSwitcher section={section} setSection={setSection} />
    </div>
  );
}
