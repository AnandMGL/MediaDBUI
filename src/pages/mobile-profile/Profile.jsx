import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../../components/bread-crumb";
import ProfileTop from "./ProfileTop";
import ProfileContentSwitcher from "./ProfileContentSwitcher";
import "./index.scss";
import EasyActions from "../../components/easyActions";
import LinkButtons from "../../components/easyActions/LinkButtons";
import { mainCallerToken, mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";

export default function Profile({ initialTab = 1 }) {
  const user = useSelector((state) => state.user);
  const [section, setSection] = useState(initialTab);
  const [resumes, setResumes] = useState();
  const [resume, setResume] = useState("");

  const copyResume = async (resume) => {
    const { id, ...copiedResume } = resume;
    setResume(copiedResume);
    const copyData = {
      ...resume,
      employeeId: user.id,
    };

    try {
      await mainCallerToken("resume/copy", "POST", copyData).then((res) => {
        if (res.statusCode === 200) {
          toast.success(res.message);
          getResumeData();
        } else {
          toast.warning(res.message);
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const deleteResume = async (id) => {
    if (resume && resume.id === id) {
      setResume("");
    }
    try {
      await mainCallerToken(`resume/deleteById/${id}`, "DELETE", null).then(
        (res) => {
          if (res.statusCode === 200) {
            toast.success(res.message);
            setResumes(resumes.filter((resume) => resume.id !== id));
          } else {
            toast.warning(res.message);
          }
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const getResumeData = () => {
    try {
      mainCallerWithOutToken(
        `resume/getByEmployeeId/${user.id}`,
        "GET",
        null
      ).then(({ data }) => {
        setResumes(data);
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    getResumeData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    console.log("PROFILE RESUME  ---------------> ", JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    setSection(initialTab);
  }, [initialTab]);

  return (
    <div className="profile-page">
      <div className="container">
        <BreadCrumb crumbName={"크리에이터"} />
        <ProfileTop setSection={setSection} section={section} user={user} />
      </div>
      <div className="page-body">
        <div className="container">
          <div className="page-content">
            <ProfileContentSwitcher
              section={section}
              setSection={setSection}
              resumes={resumes}
              setResumes={setResumes}
              resume={resume}
              setResume={setResume}
              deleteResume={deleteResume}
              copyResume={copyResume}
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
