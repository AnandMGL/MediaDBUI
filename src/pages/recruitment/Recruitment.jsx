import React, { useEffect } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import BreadCrumb from "../../components/bread-crumb";
import RecruitmentTop from "./RecruitmentTop";
import { useState } from "react";
import RecruitmentContentSwitcher from "./RecruitmentContentSwitcher";
import EasyActions from "../../components/easyActions";
import LinkButtons from "../../components/easyActions/LinkButtons";

export default function Recruitment({ initialTab = 2 }) {
  const user = useSelector((state) => state.user);
  const [section, setSection] = useState(initialTab);

  useEffect(() => {
    setSection(initialTab);
  }, [initialTab]);

  return (
    <div className="recruit-page">
      <div className="container">
        <BreadCrumb crumbName={"채용정보"} />
        <RecruitmentTop setSection={setSection} section={section} user={user} />
      </div>
      <div className="page-body">
        <div className="container">
          <div className="page-content">
            <RecruitmentContentSwitcher
              section={section}
              setSection={setSection}
              user={user}
            />
          </div>
        </div>
      </div>
      <EasyActions>
        <LinkButtons />
      </EasyActions>
    </div>
  );
}
