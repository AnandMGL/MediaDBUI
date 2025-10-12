import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    mainCallerFileWithToken,
    mainCallerWithOutToken,
    mainCallerFileWithTokenPost,
} from "../../api/mainCaller";
import BreadCrumb from "../../components/bread-crumb";
import BookmarkButton from "../../components/buttons/bookmark-button";
import LinkButton from "../../components/buttons/link-button";
import EasyActions from "../../components/easyActions";
import LinkButtons from "../../components/easyActions/LinkButtons";
import { toTop } from "../../methods";
import "./index.scss";
import CustomModal from "../../components/modals/CustomModal";
import FirstModal from "../../components/all-jobs/FirstModal";
import CustomSecondModal from "../../components/modals/CustomSecondModal";
import SecondModal from "../../components/all-jobs/SecondModal";
import { formatDate, imgURL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Job() {
    const { id } = useParams();
    const router = useNavigate();
    const user = useSelector((state) => state.user);
    const choosens = useSelector((state) => state.choosenList);

    const [jobData, setJobData] = useState();
    const [resumes, setResumes] = useState();
    const [resumeId, setResumeId] = useState();
    const [modal, setModal] = useState({ isOpen: false });
    const [secondModal, setSecondModal] = useState({ isOpen: false });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const openFirstModal = () => {
        setModal({ isOpen: true });
    };

    const openSecondModal = () => {
        setSecondModal({ isOpen: true });
    };

    const applyBtn = () => {
        if (user.id || jobData?.hasApplied) {
            openFirstModal();
        } else {
            router("/login");
        }
    };

    const handleDownloadClick = () => {
        const downloadLink = imgURL + jobData.attachmentPath;

        const newTab = window.open(downloadLink, "_blank");
        newTab.focus();
    };

    useEffect(() => {
        if (user.id) {
            getByResume();
        }
        getJobDetail();
        toTop();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getJobDetail = async () => {
        try {
            console.log('id', id);
            console.log('user.id', user.id);
            await mainCallerWithOutToken(
                `recruitment/getById/${id}/${user.id ? user.id : 0}`,
                "GET",
                null
            ).then((res) => {

                if (res.statusCode === 200) {
                    setJobData(res.data);
                }
            });
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    const getByResume = async () => {
        try {
            await mainCallerWithOutToken(
                `resume/getByEmployeeId/${user.id}`,
                "GET",
                null
            ).then(({ data }) => {
                setResumes(data);
            });
        } catch (error) {
            console.log(error, "resume ========>>>>>");
            // toast.error(error.response?.data.message);
        }
    };

    const applyToJob = async () => {
        let formData = new FormData();

        formData.append("name", user?.name);
        formData.append("situation", "REQUESTED");
        formData.append("applicantId", user.id);
        formData.append("recruitmentId", jobData.id);
        if (resumeId) {
            formData.append("resumeId", resumeId);
        }
        formData.append("file", resumeId ? null : selectedFile);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            await mainCallerFileWithTokenPost(
                "jobApplications/userApply",
                "POST",
                formData
            ).then((res) => {
                if (res.statusCode === 200) {
                    toast.success("저장되었습니다");
                    setSecondModal(false);
                    getJobDetail();
                } else {
                    toast.warning(res.response?.message);
                }
            });
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    // if (!jobData || !jobData.salaryConditions) {
    //   return null;
    // }

    // const formattedSalary = parseInt(jobData.salaryConditions).toLocaleString();
    // const formattedSalary = parseInt(jobData.salaryConditions).toLocaleString(
    //   "ko-KR",
    //   {
    //     style: "currency",
    //     currency: "KRW",
    //     minimumFractionDigits: 2,
    //   }
    // );

    return (
        <div className="job-page">
            <div className="container">
                <BreadCrumb crumbName={"채용공고 상세"} />
            </div>
            <div className="page-body">
                <div className="container">
                    <div className="page-content">
                        <div className="content-header flex-between">
                            <p className="reg-date">
                                등록 {formatDate(jobData?.periodFrom)} ~{" "}
                                {formatDate(jobData?.periodTo)}
                            </p>
                            <LinkButton link="/" label="목록보기" />
                        </div>
                        <hr />
                        <div className="content-body">
                            <h5 className="comp-name">
                                {jobData?.companyName}
                            </h5>
                            <h3 className="description">{jobData?.title}</h3>
                            <div className="job-info">
                                <div className="row">
                                    <div className="col-md-8 col-12">
                                        <div className="left-side">
                                            <div className="info">
                                                <p>
                                                    <img
                                                        src="/assets/icons/occupation.svg"
                                                        alt="briefcase"
                                                    />
                                                    직무/직종
                                                </p>
                                                <h6>
                                                    {jobData?.occupationName}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>
                                                    <img
                                                        src="/assets/icons/trello-career.svg"
                                                        alt="briefcase"
                                                    />
                                                    경력
                                                </p>
                                                <h6>
                                                    {jobData?.career || "무관"}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>
                                                    <img
                                                        src="/assets/icons/book-op.svg"
                                                        alt="briefcase"
                                                    />
                                                    학력
                                                </p>
                                                <h6>
                                                    {jobData?.eduHistoryFrom
                                                        ? jobData?.eduHistoryFrom +
                                                        " - " +
                                                        jobData?.eduHistoryTo
                                                        : "무관"}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>
                                                    <img
                                                        src="/assets/icons/dollar.svg"
                                                        alt="briefcase"
                                                    />
                                                    급여조건
                                                </p>
                                                {/* <h6>{jobData?.salaryConditions}</h6> */}
                                                <h6>
                                                    {jobData?.salaryConditions
                                                        .split("\n")
                                                        .map((line, index) => (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                {line}
                                                                {index <
                                                                    jobData?.salaryConditions.split(
                                                                        "\n"
                                                                    ).length -
                                                                    1 && (
                                                                        <br />
                                                                    )}
                                                            </React.Fragment>
                                                        ))}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>
                                                    <img
                                                        src="/assets/icons/tag-start.svg"
                                                        alt="briefcase"
                                                    />
                                                    채용형태
                                                </p>
                                                <h6>{jobData?.type}</h6>
                                            </div>
                                            <div className="info">
                                                <p>
                                                    <img
                                                        src="/assets/icons/user-all.svg"
                                                        alt="briefcase"
                                                    />
                                                    모집인원
                                                </p>
                                                <h6>
                                                    {jobData?.numberOfPeople}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>
                                                    <img
                                                        src="/assets/icons/map-pin-str.svg"
                                                        alt="briefcase"
                                                    />
                                                    근무지역
                                                </p>
                                                <h6>{jobData?.workingArea}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <div className="right-side flex-center">
                                            <h6 className="date">
                                                <img
                                                    src="/assets/icons/calendar.svg"
                                                    alt="briefcase"
                                                />
                                                모집 마감일
                                                <span>
                                                    {formatDate(
                                                        jobData?.periodTo
                                                    )}
                                                </span>
                                            </h6>

                                            {!jobData?.hasApplied ? (
                                                <button
                                                    className="btn apply-btn"
                                                    onClick={applyBtn}
                                                >
                                                    바로 지원하기
                                                </button>
                                            ) : (
                                                <button className="btn apply-btn-done">
                                                    <img
                                                        src="/assets/icons/check.svg"
                                                        alt="check"
                                                    />
                                                    지원 완료
                                                </button>
                                            )}

                                            <div className="extra-buttons flex-between">
                                                <button
                                                    className="btn download-btn"
                                                    onClick={handleDownloadClick}
                                                    disabled={!jobData?.attachmentPath || "logo/2024/logo/null" === jobData?.attachmentPath ? true : false}
                                                >
                                                    지원 양식 다운로드
                                                </button>




                                                {choosens.find(
                                                    (choice) =>
                                                        choice.id ===
                                                        jobData?.id
                                                ) ? (
                                                    <button className="like btn">
                                                        스크랩
                                                    </button>
                                                ) : (
                                                    <BookmarkButton
                                                        content={jobData}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <hr className="mobile" />
                                    </div>
                                </div>
                            </div>
                            <div className="job-info job-info-extra">
                                <div className="row">
                                    <div className="col-md-8 col-12">
                                        <div className="left-side">
                                            <h5 className="title">상세 요강</h5>
                                            <div className="info">
                                                <p>공고제목</p>
                                                <h6>{jobData?.title}</h6>
                                            </div>
                                            <div className="info">
                                                <p>업종</p>
                                                <h6>
                                                    {jobData?.companyIndustry}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>근무형태</p>
                                                <h6>
                                                    {jobData?.workingDepartment}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>급여조건</p>
                                                <h6>
                                                    {jobData?.salaryConditions}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>근무지역</p>
                                                <h6>{jobData?.workingArea}</h6>
                                            </div>
                                            <div className="info">
                                                <p>모집기간</p>
                                                <h6>
                                                    {jobData?.always ? "상시"
                                                        : `${formatDate(jobData?.periodFrom)} 부터 ${formatDate(jobData?.periodTo)} 까지`}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>근무시간</p>
                                                <h6>{jobData?.time}</h6>
                                            </div>
                                            <div className="info">
                                                <p>업체명</p>
                                                <h6>{jobData?.companyName}</h6>
                                            </div>
                                            <div className="info">
                                                <p>모집인원</p>
                                                <h6>
                                                    {jobData?.numberOfPeople}
                                                </h6>
                                            </div>
                                            <div className="info">
                                                <p>직종</p>
                                                <h6>
                                                    {jobData?.occupationName}
                                                </h6>
                                            </div>
                                            {/* <div className="info">
                        <p>근무부서</p>
                        <h6>{jobData?.workingDepartment}</h6>
                      </div> */}
                                            {/* <div className="info">
                        <p>채용성별</p>
                        <h6>{jobData?.gender}</h6>
                      </div> */}
                                            <div className="info">
                                                <p>경력사항</p>
                                                <h6>{jobData?.career}</h6>
                                            </div>
                                            <div className="info">
                                                <p>학력</p>
                                                <h6>
                                                    {jobData?.eduHistoryFrom
                                                        ? jobData?.eduHistoryFrom +
                                                        " - " +
                                                        jobData?.eduHistoryTo
                                                        : "무관"}
                                                </h6>
                                            </div>
                                            {/* <div className="info">
                        <p>채용연령</p>
                        <h6>{jobData?.ageFrom || jobData?.ageTo}</h6>
                      </div> */}
                                            <div className="info">
                                                <p>채용형태</p>
                                                <h6>{jobData?.type}</h6>
                                            </div>
                                            <hr className="mobile" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <div className="right-side flex-center">
                                            <div className="banner-box">
                                                <img
                                                    src={imgURL + jobData?.logo}
                                                    alt=""
                                                />
                                            </div>
                                            <p className="comp-description">
                                                {jobData?.aboutUs}
                                            </p>
                                            <div className="left-side">
                                                <h5 className="title">
                                                    기업정보
                                                </h5>
                                                <div className="info">
                                                    <p>회사명</p>
                                                    <h6>
                                                        {jobData?.companyName}
                                                    </h6>
                                                </div>
                                                <div className="info">
                                                    <p>홈페이지</p>
                                                    <h6 className="text-truncate">
                                                        {jobData?.homePage}
                                                    </h6>
                                                </div>
                                                <div className="info">
                                                    <p>업종</p>
                                                    <h6>
                                                        {
                                                            jobData?.companyIndustry
                                                        }
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="left-side">
                                                <h5 className="title">
                                                    채용 담당자 정보
                                                </h5>
                                                <div className="info">
                                                    <p>채용담당자/직책</p>
                                                    <h6>
                                                        {jobData?.managerName}
                                                    </h6>
                                                </div>
                                                <div className="info">
                                                    <p>채용담당부서</p>
                                                    <h6>
                                                        {
                                                            jobData?.managerDepartment
                                                        }
                                                    </h6>
                                                </div>
                                                <div className="info">
                                                    <p>문의전화</p>
                                                    <h6>
                                                        {
                                                            jobData?.managerInquiryCall
                                                        }
                                                    </h6>
                                                </div>
                                                <div className="info">
                                                    <p>관련메일</p>
                                                    <h6>
                                                        {jobData?.managerEmail}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rec-guidelines">
                                <h5 className="title">{jobData?.title}</h5>
                                <div className="guidelines-box">
                                    {jobData?.recruitmentDetail &&
                                        parse(jobData?.recruitmentDetail)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {modal.isOpen && (
                        <CustomModal
                            {...{ modal, setModal }}
                            className="first-modal"
                            title="이력서를 선택하여 주세요"
                        >
                            <FirstModal
                                resumes={resumes}
                                setResumeId={setResumeId}
                                setModal={setModal}
                                openSecondModal={openSecondModal}
                                handleFileChange={handleFileChange}
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                            />
                        </CustomModal>
                    )}

                    {secondModal.isOpen && (
                        <CustomSecondModal
                            {...{ secondModal, setSecondModal }}
                            className="last-modal"
                            title=""
                        >
                            <SecondModal
                                setSecondModal={setSecondModal}
                                applyToJob={applyToJob}
                                openFirstModal={openFirstModal}
                                managerMail={jobData?.managerEmail}
                            />
                        </CustomSecondModal>
                    )}
                </div>
            </div>
            <EasyActions>
                <LinkButtons />
            </EasyActions>
        </div>
    );
}
