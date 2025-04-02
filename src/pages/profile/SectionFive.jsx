/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import EasyActions from "../../components/easyActions";
import { mainCallerToken } from "../../api/mainCaller";
import {
  careerPeriod,
  classification,
  county,
  eduGraduation,
  eduLevel,
  honorAndProtect,
  isExist,
  languages,
  level,
  months,
  years,
} from "../../constants/constants";
import CustomModal from "../../components/modals/CustomModal";
import CodeManager from "../../components/modals/CodeManager";
import { toast } from "react-toastify";

export default function SectionFive({ user, resume, resumes, setResumes }) {
  const [eduHistories, setEduHistories] = useState();
  const [careerDetails, setCareerDetails] = useState();
  const [languageSkills, setLanguageSkills] = useState();
  const [interEduHistories, setInterEduHistories] = useState();
  const [modal, setModal] = useState({
    isOpen1: false,
    number: null,
  });
  const [occuNumber, setOccuNumber] = useState(0);

  const year = years();

  let newUser = {
    username: user.name,
    birthday: user.birthday,
    name: user.name,
    gender: user.gender,
    eduLevel: user.eduLevel,
    address: user.address,
    addressDetails: user.addressDetails,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: newUser,
    resume,
  });
  const [image, setImage] = useState("");

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const addHistory = () => {
    setEduHistories([...eduHistories, {}]);
  };

  const addDetail = () => {
    setCareerDetails([...careerDetails, {}]);
  };

  const searchOccu = () => {
    setModal({
      ...modal,
      isOpen1: true,
      keyword: watch("searchOccupation"),
    });
  };

  useEffect(() => {
    if (modal.occupation) {
      if (occuNumber === 1) {
        setValue("careerShorts[0]", {
          occupation: modal.occupation.name,
          period: resume.careerShorts[0]?.period || "",
        });
      } else if (occuNumber === 2) {
        setValue("careerShorts[1]", {
          occupation: modal.occupation.name,
          period: resume.careerShorts[1]?.period || "",
        });
      } else if (occuNumber === 3) {
        setValue("careerShorts[2]", {
          occupation: modal.occupation.name,
          period: resume.careerShorts[2]?.period || "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occuNumber, modal.occupation]);

  useEffect(() => {
    setEduHistories(eduHistories ?? [{}]);
    setCareerDetails(careerDetails ?? [{}]);
    setLanguageSkills(languageSkills ?? [{}, {}, {}]);
    setInterEduHistories(interEduHistories ?? [{}, {}]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    let newEduHistories = [];
    let newCareerDetails = [];
    let newLanguageSkills = [];
    let newInterEduHistories = [];

    eduHistories?.map((item, index) => {
      let newObj = {
        simpleDate: values[`simpleDate${index}`] || "",
        fromYear: values[`thirdPeriodFromYear${index}`],
        fromMonth: values[`thirdPeriodFromMonth${index}`],
        toYear: values[`thirdPeriodToYear${index}`],
        toMonth: values[`thirdPeriodToMonth${index}`],
        schoolName: values[`thirdPeriodSchoolName${index}`],
        education: values[`thirdPeriodEducation${index}`],
        graduation: values[`thirdPeriodGraduation${index}`],
        specialty: values[`thirdPeriodSpecialty${index}`],
        gpa: values[`thirdPeriodGpa${index}`],
        location: values[`thirdPeriodLocation${index}`],
      };
      newEduHistories.push(newObj);
    });

    careerDetails?.map((item, i) => {
      let newObj = {
        fromYear: values[`careerDetailsFromYear${i}`],
        fromMonth: values[`careerDetailsFromMonth${i}`],
        toYear: values[`careerDetailsToYear${i}`],
        toMonth: values[`careerDetailsToMonth${i}`],
        companyName: values[`careerDetailsCompanyName${i}`],
        job: values[`careerDetailsJob${i}`],
        responsibility: values[`careerDetailsResp${i}`],
        jobType: values[`careerDetailsJobType${i}`],
        salary: values[`careerDetailsSalary${i}`],
        reason: values[`careerDetailsReason${i}`],
      };
      newCareerDetails.push(newObj);
    });

    languageSkills?.map((item, i) => {
      let newObj = {
        languageName: values[`languageName${i}`],
        testName: values[`langTestName${i}`],
        score: values[`langScore${i}`],
        year: values[`langYear${i}`],
        month: values[`langMonth${i}`],
        writing: values[`langWriting${i}`],
        speaking: values[`langSpeaking${i}`],
        listening: values[`langListening${i}`],
      };
      newLanguageSkills.push(newObj);
    });

    interEduHistories?.map((item, i) => {
      let newObj = {
        fromYear: values[`interFromYear${i}`],
        fromMonth: values[`interFromMonth${i}`],
        toYear: values[`interToYear${i}`],
        toMonth: values[`interToMonth${i}`],
        schoolName: values[`interSchoolName${i}`],
        specialty: values[`interSpecialty${i}`],
        status: values[`interStatus${i}`],
      };
      newInterEduHistories.push(newObj);
    });

    let resumeCreateData = {
      employeeId: user.id,
      title: values.title,
      status: values.status || "EDITING",
      religion: values.religion,
      hobby: values.hobby,
      specialty: values.specialty,
      eduHistories: newEduHistories,
      interEduHistories: newInterEduHistories,

      honor: values.honor,
      protection: values.protection,
      classification: values.classification,
      county: values.country || "",
      class1: values.class1,
      class2: values.class2,
      exemption: values.exemption,
      period: values.period,
      employmentHistory: values.employmentHistory,
      careerShorts: [
        {
          occupation: values.careerShortsOccupation0,
          period: values.careerShortsPeriod0,
        },
        {
          occupation: values.careerShortsOccupation1,
          period: values.careerShortsPeriod1,
        },
        {
          occupation: values.careerShortsOccupation2,
          period: values.careerShortsPeriod2,
        },
      ],
      careerDetails: newCareerDetails,
      korean: values.korean,
      msWord: values.msWord,
      msExcel: values.msExcel,
      powerPoint: values.powerPoint,
      erp: values.erp,
      pc: values.pc,
      photoshop: values.photoshop,
      illustrator: values.illustrator,
      maya: values.maya,
      threDMax: values.threDMax,
      C4D: values.C4D,
      finalCut: values.finalCut,
      edius: values.edius,
      avid: values.avid,
      premiere: values.premiere,
      after: values.after,
      shooting: values.shooting,
      filming: values.filming,
      licenses: [
        {
          name: values.licensesName,
          year: values.licensesYear,
          month: values.licensesMonths,
          issuer: values.licensesIssuer,
        },
        {
          name: values.licensesName2,
          year: values.licensesYear2,
          month: values.licensesMonths2,
          issuer: values.licensesIssuer2,
        },
      ],
      languageGrades: newLanguageSkills,
      growthProcess: values.growthProcess,
      personality: values.personality,
      motive: values.motive,
      technology: values.technology,
    };

    try {
      await mainCallerToken("resume/create", "POST", resumeCreateData).then(
        (res) => {
          setResumes([...resumes, res.data]);
          toast.success(res.message);
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const dynamicComponents = (keyParam, keyList, val) => {
    return (
      <select className="field" {...register(keyParam)} defaultValue={val}>
        {keyList?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <div className="page-content-five">
        <div className="content-top flex-between">
          <button className="btn back-btn flex-center">
            <img src="/assets/icons/arrow-left-circle.svg" alt="back" />
            이력서 작성
          </button>
          <button className="btn list-btn flex-center">
            <img src="/assets/icons/align-justify.svg" alt="align-justify" />
            목록보기
          </button>
        </div>
        <hr className="hr-1" />
        <div className="form-fields">
          <div className="field-box flex-center title-box">
            <p className="label">이력서 제목</p>
            <input
              className="field"
              placeholder="내용을 입력하여 주세요"
              {...register("title")}
            />
            <span>* 이력서 제목은 제출처에 노출되지 않습니다.</span>
          </div>
        </div>
        <div className="content-body flex-between">
          <label htmlFor="imageupload">
            <div className="image-box">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="uploader" />
              ) : null}
              <div className="camera flex-center">
                <img src="/assets/icons/camera.svg" alt="camera" />
              </div>
            </div>
            <input
              type="file"
              id="imageupload"
              style={{ display: "none" }}
              onChange={handleUploadImage}
            />
          </label>
          <div className="form-fields">
            <div className="row section-1">
              <div className="col-12">
                <h5 className="title">1. 기본 정보</h5>
              </div>
              <div className="col-md-1">
                <p className="label">이름(한글)</p>
              </div>
              <div className="col-md-5">
                <input
                  disabled
                  className="field"
                  placeholder="홍길동"
                  {...register("name")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">생년월일</p>
              </div>
              <div className="col-md-5">
                <input
                  disabled
                  className="field"
                  placeholder="생년월일"
                  {...register("birthday")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">성별</p>
              </div>
              <div className="col-md-5">
                <div className="d-flex w-100">
                  <select disabled className="field" {...register("gender")}>
                    <option value="female">남</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                  </select>
                  <p className="label middle">최종학력</p>

                  <select className="field" disabled {...register("eduLevel")}>
                    {eduLevel?.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-1">
                <p className="label">휴대폰</p>
              </div>
              <div className="col-md-5">
                <input
                  disabled
                  className="field"
                  placeholder="홍길동"
                  {...register("phoneNumber")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">주소</p>
              </div>
              <div className="col-md-5">
                <input
                  disabled
                  className="field"
                  placeholder="홍길동"
                  {...register("address")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">이메일</p>
              </div>
              <div className="col-md-5">
                <input
                  disabled
                  className="field"
                  placeholder="홍길동"
                  {...register("email")}
                />
              </div>
              <div className="col-md-5 offset-md-1 ">
                <input
                  disabled
                  className="field"
                  placeholder="홍길동"
                  {...register("addressDetails")}
                />
              </div>
              <div className="col-md-6">
                <span className="label">
                  * 이미지 및 기본 정보 수정은 계정 정보탭에서 가능합니다.
                </span>
              </div>
              <div className="col-md-1 last-child">
                <p className="label">이름(영문)</p>
              </div>
              <div className="col-md-4 last-child">
                <input
                  className="field"
                  placeholder="홍길동"
                  {...register("nameEnglish")}
                />
              </div>
              <div className="col-md-1 last-child">
                <p className="label">이름(한자)</p>
              </div>
              <div className="col-md-4 last-child">
                <input
                  className="field"
                  placeholder="홍길동"
                  {...register("nameChinese")}
                />
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-2">
              <div className="col-12">
                <h5 className="title">2. 신상 명세</h5>
              </div>
              <p className="label first">종교</p>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="홍길동"
                  {...register("religion")}
                />
              </div>
              <p className="label">취미</p>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="홍길동"
                  {...register("hobby")}
                />
              </div>
              <p className="label">특기</p>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="홍길동"
                  {...register("specialty")}
                />
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-3">
              <div className="col-12">
                <div className="flex-center">
                  <h5 className="title">3. 학력 사항</h5>
                  <span className="label">
                    {
                      "*고등학교>대학교>대학원 순으로 입력해주세요. 학교명은 공식명으로뒤에 고등학교 대학교 대학원은 제외하여 기재해주세요."
                    }
                  </span>
                </div>
              </div>
              <div className="col-md-5 first">
                <p className="label top">재학 기간</p>
              </div>
              <div className="col-md-2">
                <p className="label top">학교명</p>
              </div>
              <div className="col-md-1">
                <p className="label top">학력 구분</p>
              </div>
              <div className="col-md-1">
                <p className="label top">졸업 구분</p>
              </div>
              <div className="col-md-2">
                <div className="flex-box">
                  <div className="first">
                    <p className="label top">전공학과</p>
                  </div>
                  <div className="last">
                    <p className="label top">학점</p>
                  </div>
                </div>
              </div>
              <div className="col-md-1 last">
                <p className="label top">전공학과</p>
              </div>
              {eduHistories?.map((item, i) => (
                <div className="section-add-row" key={i}>
                  <div className="col-md-5 first">
                    <div className="flex-box flex-center">
                      {dynamicComponents(`thirdPeriodFromYear${i}`, year)}
                      <p className="label">년</p>
                      {dynamicComponents(`thirdPeriodFromMonth${i}`, months)}
                      <p className="label">월 부터</p>
                      {dynamicComponents(`thirdPeriodToYear${i}`, year)}
                      <p className="label">년</p>
                      {dynamicComponents(`thirdPeriodToMonth${i}`, months)}
                      <p className="label">월 까지</p>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <input
                      className="field"
                      placeholder="내용을 입력해주세요"
                      {...register(`thirdPeriodSchoolName${i}`)}
                    />
                  </div>
                  <div className="col-md-1">
                    {dynamicComponents(`thirdPeriodEducation${i}`, eduLevel)}
                  </div>
                  <div className="col-md-1">
                    {dynamicComponents(
                      `thirdPeriodGraduation${i}`,
                      eduGraduation
                    )}
                  </div>
                  <div className="col-md-2">
                    <div className="flex-box">
                      <div className="first">
                        <input
                          className="field"
                          placeholder="내용을 입력해주세요"
                          {...register(`thirdPeriodSpecialty${i}`)}
                        />
                      </div>
                      <div className="last">
                        <input
                          className="field"
                          placeholder="0"
                          {...register(`thirdPeriodGpa${i}`)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1 last">
                    <input
                      className="field"
                      placeholder="고등학교"
                      {...register(`thirdPeriodLocation${i}`)}
                    />
                  </div>
                </div>
              ))}
              <div className="col-12">
                <a className="btn add-btn flex-center" onClick={addHistory}>
                  <img src="/assets/icons/plus-square.svg" alt="add-btn" />
                  이력서 추가하기
                </a>
                <hr />
              </div>
            </div>
            <div className="row section-4">
              <div className="col-12">
                <h5 className="title">4. 해외연수/아카데미</h5>
              </div>
              <div className="col-md-5 first">
                <p className="label top">재학 기간</p>
              </div>
              <div className="col-md-3">
                <p className="label top">학교명</p>
              </div>
              <div className="col-md-2">
                <p className="label top">전공</p>
              </div>
              <div className="col-md-2 last">
                <p className="label top">졸업여부</p>
              </div>
              {interEduHistories?.map((item, i) => (
                <div className="section-add-row" key={i}>
                  <div className="col-md-5 first">
                    <div className="flex-box flex-center">
                      {dynamicComponents(`interFromYear${i}`, year)}
                      <p className="label">년</p>
                      {dynamicComponents(`interFromMonth${i}`, months)}
                      <p className="label">월 부터</p>
                      {dynamicComponents(`interToYear${i}`, year)}
                      <p className="label">년</p>
                      {dynamicComponents(`interToMonth${i}`, months)}
                      <p className="label">월 까지</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <input
                      className="field"
                      placeholder="내용을 입력해주세요"
                      {...register(`interSchoolName${i}`)}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      className="field"
                      placeholder="고등학교"
                      {...register(`interSpecialty${i}`)}
                    />
                  </div>
                  <div className="col-md-2 last">
                    {dynamicComponents(`interStatus${i}`, eduGraduation)}
                  </div>
                </div>
              ))}

              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-5">
              <div className="col-12">
                <h5 className="title">5. 병역 사항</h5>
              </div>
              <div className="col-md-1">
                <p className="label">국가보훈</p>
              </div>
              <div className="col-md-2">
                {dynamicComponents("honor", honorAndProtect)}
              </div>
              <div className="col-md-1">
                <p className="label">생활보호대상</p>
              </div>
              <div className="col-md-2">
                {dynamicComponents("protection", honorAndProtect)}
              </div>
              <div className="col-md-1">
                <p className="label">병역구분</p>
              </div>
              <div className="col-md-2">
                {dynamicComponents("classification", classification)}
              </div>
              <div className="col-md-1">
                <p className="label">군별</p>
              </div>
              <div className="col-md-2">
                {dynamicComponents("county", county)}
              </div>
              <div className="col-md-1">
                <p className="label">계급</p>
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("class1")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">병과</p>
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("class2")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">면제사유</p>
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("exemption")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">병역기간</p>
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("period")}
                />
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-6">
              <div className="col-12">
                <h5 className="title">6. 대표 경력 사항</h5>
              </div>
              <div className="col-md-1">
                <p className="label">취업 경력</p>
              </div>
              <div className="col-md-2 d-flex">
                {isExist?.map((item, i) => {
                  return (
                    <div key={item.value} className="flex-center col-md-5">
                      <input
                        id="exist"
                        type="radio"
                        value={item.value}
                        {...register("employmentHistory")}
                      />
                      <label htmlFor="exist">{item.label}</label>
                    </div>
                  );
                })}
                {/* <input
                  id="exist"
                  type="radio"
                  value="Has exist"
                  {...register("employmentHistory")}
                />
                <label htmlFor="exist">있음</label>
                <input
                  id="noExist"
                  type="radio"
                  value="Doesn't exist"
                  {...register("employmentHistory")}
                />
                <label htmlFor="noExist">없음</label> */}
              </div>
              <div className="col-md-6">
                <div className="flex-box">
                  <p className="label">경력 직종 첫 번째</p>
                  <input
                    className="field"
                    placeholder="홍길동"
                    {...register("careerShortsOccupation0")}
                  />
                  <button
                    className="btn search-btn"
                    onClick={() => {
                      searchOccu();
                      setOccuNumber(1);
                    }}
                  >
                    검색
                  </button>
                </div>
              </div>
              <div className="col-md-1">
                <p className="label">경력기간</p>
              </div>
              <div className="col-md-2">
                {dynamicComponents("careerShortsPeriod0", careerPeriod)}
              </div>
              <div className="col-md-6 offset-md-3">
                <div className="flex-box">
                  <p className="label">경력 직종 첫 번째</p>
                  <input
                    className="field"
                    placeholder="홍길동"
                    {...register("careerShortsOccupation1")}
                  />
                  <button className="btn search-btn">검색</button>
                </div>
              </div>
              <div className="col-md-1">
                <p className="label">경력기간</p>
              </div>
              <div className="col-md-2">
                {dynamicComponents("careerShortsPeriod1", careerPeriod)}
              </div>
              <div className="col-md-6 offset-md-3">
                <div className="flex-box">
                  <p className="label">경력 직종 첫 번째</p>
                  <input
                    className="field"
                    placeholder="홍길동"
                    {...register("careerShortsOccupation2")}
                  />
                  <button className="btn search-btn">검색</button>
                </div>
              </div>
              <div className="col-md-1">
                <p className="label">경력기간</p>
              </div>
              <div className="col-md-2">
                {dynamicComponents("careerShortsPeriod2", careerPeriod)}
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-7">
              <div className="col-12">
                <h5 className="title">7. 경력 상세 사항</h5>
              </div>
              <div className="col-md-5 first">
                <p className="label top">재학 기간</p>
              </div>
              <div className="col-md-7 last">
                <div className="row">
                  <div className="col-md-2 first">
                    <p className="label top">근무업체명</p>
                  </div>
                  <div className="col-md-2">
                    <p className="label top">부서/직무</p>
                  </div>
                  <div className="col-md-2">
                    <p className="label top">주요 업무</p>
                  </div>
                  <div className="col-md-2">
                    <p className="label top">고용 형태</p>
                  </div>
                  <div className="col-md-2">
                    <p className="label top">연봉(만원)</p>
                  </div>
                  <div className="col-md-2">
                    <p className="label top">퇴직 사유</p>
                  </div>
                </div>
              </div>

              {careerDetails?.map((item, i) => (
                <div key={i} className="section-add-row">
                  <div className="col-md-5 first">
                    <div className="flex-box flex-center">
                      {dynamicComponents(`careerDetailsFromYear${i}`, year)}
                      <p className="label">년</p>
                      {dynamicComponents(`careerDetailsFromMonth${i}`, months)}
                      <p className="label">월 부터</p>
                      {dynamicComponents(`careerDetailsToYear${i}`, year)}
                      <p className="label">년</p>
                      {dynamicComponents(`careerDetailsToMonth${i}`, months)}
                      <p className="label">월 까지</p>
                    </div>
                  </div>
                  <div className="col-md-7 last">
                    <div className="row">
                      <div className="col-md-2 first">
                        <input
                          className="field"
                          placeholder="내용을 입력해주세요"
                          {...register(`careerDetailsCompanyName${i}`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          {...register(`careerDetailsJob${i}`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          placeholder="내용을 입력해주세요"
                          {...register(`careerDetailsResp${i}`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          {...register(`careerDetailsJobType${i}`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          type="number"
                          {...register(`careerDetailsSalary${i}`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          {...register(`careerDetailsReason${i}`)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12">
                <a className="btn add-btn flex-center" onClick={addDetail}>
                  <img src="/assets/icons/plus-square.svg" alt="add-btn" />
                  학력 사항 추가
                </a>
                <span className="label">*수행 프로젝트 및 기타 경력사항</span>
                <hr />
              </div>
            </div>
            <div className="row section-8">
              <div className="col-12">
                <h5 className="title">8. PC 활용 능력</h5>
              </div>
              <div className="col-md-2">
                <p className="label">OA/문서작성</p>
              </div>
              <div className="col-md-2">
                <p className="label">한글</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("korean", level)}
              </div>
              <div className="col-md-2">
                <p className="label middle">MS워드</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("msWord", level)}
              </div>
              <div className="col-md-1">
                <p className="label">MS엑셀</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("msExcel", level)}
              </div>
              <div className="col-md-1">
                <p className="label">파워포인트</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("powerPoint", level)}
              </div>
              <div className="col-md-2 offset-md-2">
                <p className="label">전산,ERP</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("erp", level)}
              </div>
              <div className="col-md-2">
                <p className="label middle">회계, 전산회계</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("pc", level)}
              </div>
              <div className="col-12">
                <hr />
              </div>
              <div className="col-md-2">
                <p className="label">영상디자인</p>
              </div>
              <div className="col-md-2">
                <p className="label">포토샵</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("photoshop", level)}
              </div>
              <div className="col-md-2">
                <p className="label middle">일러스트</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("illustrator", level)}
              </div>
              <div className="col-md-1">
                <p className="label">Maya</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("maya", level)}
              </div>
              <div className="col-md-1">
                <p className="label">Nuke</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("nuke", level)}
              </div>
              <div className="col-md-2 offset-md-2">
                <p className="label">3DMax</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("threDMax", level)}
              </div>
              <div className="col-md-2">
                <p className="label middle">C4D</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("C4D", level)}
              </div>
              <div className="col-12">
                <hr />
              </div>
              <div className="col-md-2">
                <p className="label">영상 편집</p>
              </div>
              <div className="col-md-2">
                <p className="label">파이널컷</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("finalCut", level)}
              </div>
              <div className="col-md-2">
                <p className="label middle">EDIUS</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("edius", level)}
              </div>
              <div className="col-md-1">
                <p className="label">AVID</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("avid", level)}
              </div>
              <div className="col-md-1">
                <p className="label">Premiere</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("premiere", level)}
              </div>
              <div className="col-md-2 offset-md-2">
                <p className="label">애프터이펙트</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("after", level)}
              </div>
              <div className="col-12">
                <hr />
              </div>
              <div className="col-md-2">
                <p className="label">영상 촬영</p>
              </div>
              <div className="col-md-2">
                <p className="label">촬영(6mm,DSLR)</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("shooting", level)}
              </div>
              <div className="col-md-2">
                <p className="label middle">촬영(ENG,EFP)</p>
              </div>
              <div className="col-md-1 p-0">
                {dynamicComponents("filming", level)}
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-9">
              <div className="col-12">
                <h5 className="title">9. 자격/면허</h5>
              </div>
              <div className="col-md-1 first">
                <p className="label">자격 및 면허명</p>
              </div>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register("licensesName")}
                />
              </div>
              <div className="col-md-1">
                <p className="label text-center">취득일자</p>
              </div>
              <div className="col-md-3">
                <div className="flex-box flex-center">
                  {dynamicComponents("licensesYear", year)}
                  <p className="label">년</p>
                  {dynamicComponents("licensesMonths", months)}
                  <p className="label">월</p>
                </div>
              </div>
              <div className="col-md-1">
                <p className="label text-center">발급기관</p>
              </div>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register("licensesIssuer")}
                />
              </div>
              <div className="col-md-1 first">
                <p className="label">자격 및 면허명</p>
              </div>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register("licensesName2")}
                />
              </div>
              <div className="col-md-1">
                <p className="label text-center">취득일자</p>
              </div>
              <div className="col-md-3">
                <div className="flex-box flex-center">
                  {dynamicComponents("licensesYear2", year)}
                  <p className="label">년</p>
                  {dynamicComponents("licensesMonths2", months)}
                  <p className="label">월</p>
                </div>
              </div>
              <div className="col-md-1">
                <p className="label text-center">발급기관</p>
              </div>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register("licensesIssuer2")}
                />
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-10">
              <div className="col-12">
                <h5 className="title">10. 어학 능력</h5>
              </div>
              <div className="col-md-2 first">
                <p className="label top">어학 구분</p>
              </div>
              <div className="col-md-3">
                <p className="label top">공인 시험명</p>
              </div>
              <div className="col-md-2">
                <p className="label top">점수/급수</p>
              </div>
              <div className="col-md-2">
                <p className="label top">취득일자</p>
              </div>
              <div className="col-md-1">
                <p className="label top">작문</p>
              </div>
              <div className="col-md-1">
                <p className="label top">회화</p>
              </div>
              <div className="col-md-1 last">
                <p className="label top">독해</p>
              </div>
              {languageSkills?.map((item, i) => (
                <div className="section-add-row" key={i}>
                  <div className="col-md-2 first">
                    {dynamicComponents(`languageName${i}`, languages)}
                  </div>
                  <div className="col-md-3">
                    <input
                      className="field"
                      placeholder="내용을 입력해주세요"
                      {...register(`langTestName${i}`)}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      className="field"
                      placeholder="고등학교"
                      {...register(`langScore${i}`)}
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="flex-box flex-center">
                      {dynamicComponents(`langYear${i}`, year)}
                      <p className="label">년</p>
                      {dynamicComponents(`langMonth${i}`, months)}
                      <p className="label">월</p>
                    </div>
                  </div>
                  <div className="col-md-1">
                    {dynamicComponents(`langWriting${i}`, level)}
                  </div>
                  <div className="col-md-1">
                    {dynamicComponents(`langSpeaking${i}`, level)}
                  </div>
                  <div className="col-md-1 last">
                    {dynamicComponents(`langListening${i}`, level)}
                  </div>
                </div>
              ))}

              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-11">
              <div className="col-12">
                <h5 className="title">11. 성장과정</h5>
                <textarea
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("growthProcess")}
                />
                <hr />
              </div>
            </div>
            <div className="row section-11">
              <div className="col-12">
                <h5 className="title">12. 성격의 장/단점</h5>
                <textarea
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("personality")}
                />
                <hr />
              </div>
            </div>
            <div className="row section-11">
              <div className="col-12">
                <h5 className="title">13. 지원동기</h5>
                <textarea
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("motive")}
                />
                <hr />
              </div>
            </div>
            <div className="row section-11">
              <div className="col-12">
                <h5 className="title">14. 보유기술</h5>
                <textarea
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("technology")}
                />
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="flex-center bottom-buttons">
                  <button className="btn cancel-btn">취소</button>
                  <button className="btn panding-btn">임시 저장</button>
                  <button
                    className="btn submit-btn"
                    onClick={handleSubmit(onSubmit)}
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EasyActions className="saver-buttons">
          <div className="content-buttons">
            <button
              className="complete btn flex-center"
              onClick={handleSubmit(onSubmit)}
            >
              <img src="/assets/icons/check.svg" alt="complete" />
            </button>
            <button
              className="panding btn flex-center"
              onClick={handleSubmit(onSubmit)}
            >
              <img src="/assets/icons/loader-2.svg" alt="panding" />
            </button>
          </div>
        </EasyActions>
      </div>

      {modal.isOpen1 && (
        <CustomModal modal={{ isOpen: modal.isOpen1 }} setModal={setModal}>
          <CodeManager
            modal={modal}
            setModal={setModal}
            contentKey="occupation"
            apiUrl="occupation"
            modalKey="isOpen1"
          />
        </CustomModal>
      )}
    </>
  );
}
