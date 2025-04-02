import React, { useState } from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";

export default function LoginContentSwitcher() {
  const [section, setSection] = useState(1);

  switch (section) {
    case 1:
      return <SectionOne setSection={setSection} />;
    case 2:
      return <SectionTwo setSection={setSection} />;
    case 3:
      return <SectionThree setSection={setSection} />;
    case 4:
      return <SectionFour setSection={setSection} />;
    case 5:
      return <SectionFive setSection={setSection} />;
    default:
      return <SectionOne setSection={setSection} />;
  }
}
