import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import EasyActions from "../../components/easyActions";
import { mainCallerToken } from "../../api/mainCaller";
import {
  careerPeriod,
  classification,
  county,
  eduCategory,
  eduGraduation,
  eduLevel,
  formatKoreanPhoneNumber,
  honorAndProtect,
  imgURL,
  languages,
  level,
  months,
  years,
} from "../../constants/constants";
import { useEffect } from "react";
import CustomModal from "../../components/modals/CustomModal";
import CodeManager from "../../components/modals/CodeManager";
import { toast } from "react-toastify";

export default function SectionFiveUpdate({
  resume,
  setResumes,
  resumes,
  setResume,
  user,
  setSection,
}) {
  const [modal, setModal] = useState({
    isOpen1: false,
    number: null,
  });

  const newUserData = {
    username: user.username,
    name: user.name,
    email: user.email,
    birthday: user.birthday,
    gender: user.gender,
    eduLevel: user.eduLevel,
    phoneNumber: formatKoreanPhoneNumber(user.phoneNumber),
    address: user.address,
    addressDetails: user.addressDetails,
  };

  const { register, handleSubmit, reset, watch, setValue, formState: { errors }, } = useForm({
    defaultValues: newUserData,
    resume,
  });

  const [image, setImage] = useState();

  const [eduHistories, setEduHistories] = useState();
  const [interEduHistories, setInterEduHistories] = useState();
  const [careerDetails, setCareerDetails] = useState();
  const [licenses, setLicenses] = useState();
  const [occuNumber, setOccuNumber] = useState();

  const year = years();

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const addHistory = () => {
    setEduHistories([...eduHistories, {}]);
  };

  const addDetail = () => {
    setCareerDetails([...careerDetails, {}]);
  };
  const addLicenses = () => {
    setLicenses([...licenses, {}]);
  };

  const searchOccu = () => {
    setModal({
      ...modal,
      isOpen1: true,
      keyword: watch("searchOccupation"),
    });
  };

  const ym = (y, m) => {
    const yy = parseInt(String(y ?? ""), 10);
    const mm = parseInt(String(m ?? ""), 10);
    if (Number.isNaN(yy) || Number.isNaN(mm) || !yy || !mm) return 0;
    return yy * 100 + mm;
  };
  const validateChronology = (list = [], label = "학력") => {
  for (let i = 0; i < list.length; i++) {
    const it = list[i] || {};
    const from = ym(it.fromYear, it.fromMonth);
    const to = ym(it.toYear, it.toMonth);

    // мөрийн дотор
    if (from && to && from > to) {
      toast.error(`[${label}] №${i + 1}: 시작(From)이 종료(To)보다 늦습니다.`);
      return false;
    }

    // дараалал: өмнөх мөрийн эхлэл нь дараагийнхаасаа шинэ байх ёстой
    if (i < list.length - 1) {
      const next = list[i + 1] || {};
      const curStart = from;
      const nextStart = ym(next.fromYear, next.fromMonth);
      if (curStart && nextStart && curStart < nextStart) {
        toast.error(
          `[${label}] №${i + 1}의 시작이 №${i + 2}보다 최신이어야 합니다 (신→구 정렬).`
        );
        return false;
      }
    }
  }
  return true;
};

const validateAll = (values) => {
  if (values?.eduHistories?.length) {
    if (!validateChronology(values.eduHistories, "학력")) return false;
  }
  if (values?.interEduHistories?.length) {
    if (!validateChronology(values.interEduHistories, "해외연수")) return false;
  }
  if (values?.careerDetails?.length) {
    if (!validateChronology(values.careerDetails, "경력")) return false;
  }
  return true;
};

  useEffect(() => {
    if (modal.occupation) {
      if (occuNumber === 1) {
        setValue("careerShorts[0]", {
          occupation: modal.occupation.name,
        });
      } else if (occuNumber === 2) {
        setValue("careerShorts[1]", {
          occupation: modal.occupation.name,
        });
      } else if (occuNumber === 3) {
        setValue("careerShorts[2]", {
          occupation: modal.occupation.name,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occuNumber, modal.occupation]);

  const submit = async (values) => {
    if (!validateAll(values)) return;
    const updatedValues = { ...values, status: "WRITING" };
    try {
      if (resume.id) {
        await mainCallerToken("resume/update", "POST", updatedValues).then(
          (res) => {
            setResumes(
              resumes.map((item) => (item.id === resume.id ? res.data : item))
            );
            setSection(2);
            toast.success(res.message);
          }
        );
      } else {
        await mainCallerToken("resume/create", "POST", {
          ...updatedValues,
          employeeId: user.id,
        }).then((res) => {
          setResumes([...resumes, res.data]);
          setSection(2);
          toast.success(res.message);
        });
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
    setResume("");
  };

useEffect(() => {
  const sub = watch((value, { name }) => {
    if (
      name &&
      (name.startsWith("eduHistories") ||
        name.startsWith("interEduHistories") ||
        name.startsWith("careerDetails"))
    ) {
      validateAll(value);
    }
  });
  return () => sub && sub.unsubscribe && sub.unsubscribe();
}, [watch]);

  const onSubmit = async (values) => {
    if (!validateAll(values)) return;
    const updatedValues = { ...values, status: "EDITING" };

    try {
      if (resume.id) {
        await mainCallerToken("resume/update", "POST", updatedValues).then(
          (res) => {
            setResumes(
              resumes.map((item) => (item.id === resume.id ? res.data : item))
            );
            setSection(2);
            toast.success(res.message);
          }
        );
      } else {
        await mainCallerToken("resume/create", "POST", {
          ...updatedValues,
          employeeId: user.id,
        }).then((res) => {
          setResumes([...resumes, res.data]);
          setSection(2);
          toast.success(res.message);
        });
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
    setResume("");
  };

  useEffect(() => {
    reset(resume);
    setEduHistories(resume.eduHistories ?? [{}, {}, {}]);
    setCareerDetails(resume.careerDetails ?? [{}, {}, {}]);
    setInterEduHistories(resume.interEduHistories ?? [{}, {}]);
    setLicenses(resume.licenses ?? [{}, {}]);
    setImage(user.profilePicture);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

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
          <button className="btn back-btn flex-center backBtn" onClick={() => setSection(2)}>
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
                <img src={imgURL + user.profilePicture} alt="uploader" />
              ) : null}
              <div className="camera flex-center">
                <img src="/assets/icons/camera.svg" alt="camera" />
              </div>
            </div>
            <input
              disabled
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
                  placeholder="내용을 입력해주세요"
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
                    <option value="선택">선택</option>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
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
                  placeholder="내용을 입력해주세요"
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
                  placeholder="내용을 입력해주세요"
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
                  placeholder="내용을 입력해주세요"
                  {...register("email")}
                />
              </div>
              <div className="col-md-5 offset-md-1 ">
                <input
                  disabled
                  className="field"
                  placeholder="내용을 입력해주세요"
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
                  placeholder="내용을 입력해주세요"
                  {...register("nameEnglish", {
                    required: "영문 이름을 입력해 주세요",
                  })}
                />
                {errors.nameEnglish && (
                  <p className="error-message">영문 이름을 입력해 주세요</p>
                )}

              </div>
              <div className="col-md-1 last-child">
                <p className="label">이름(한문)</p>
              </div>
              <div className="col-md-4 last-child">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register("nameChinese", { required: "한문 이름을 입력해 주세요" })}
                />
                {errors.nameChinese && (
                  <p className="error-message">한문 이름을 입력해 주세요</p>
                )}
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
                  placeholder="내용을 입력해주세요"
                  {...register("religion")}
                />
              </div>
              <p className="label">취미</p>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register("hobby")}
                />
              </div>
              <p className="label">특기</p>
              <div className="col-md-3">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
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
              <div className="col-md-6 first">
                <p className="label top">재학 기간</p>
              </div>
              <div className="col-md-1">
                <p className="label top">학교명</p>
              </div>
              <div className="col-md-1">
                <p className="label top">학력 구분</p>
              </div>
              <div className="col-md-1">
                <p className="label top">졸업 구분</p>
              </div>
              <div className="col-md-2">
                <div className="flex-between">
                  <p className="label top">전공학과</p>
                  <p className="label top" style={{ marginRight: "20px" }}>
                    학점
                  </p>
                </div>
              </div>
              <div className="col-md-1 last">
                <p className="label top">소재지</p>
              </div>

              {eduHistories?.map((item, i) => {
                return (
                  <div className="section-add-row" key={i}>
                    <div className="col-md-6 first">
                      <div className="flex-box flex-center">
                        {dynamicComponents(
                          `eduHistories[${i}].fromYear`,
                          year,
                          item.fromYear
                        )}
                        <p className="label">년</p>
                        {dynamicComponents(
                          `eduHistories[${i}].fromMonth`,
                          months,
                          item.fromMonth
                        )}
                        <p className="label">월 부터</p>
                        {dynamicComponents(
                          `eduHistories[${i}].toYear`,
                          year,
                          item.toYear
                        )}
                        <p className="label">년</p>
                        {dynamicComponents(
                          `eduHistories[${i}].toMonth`,
                          months,
                          item.toMonth
                        )}
                        <p className="label">월 까지</p>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <input
                        className="field"
                        placeholder="내용을 입력해주세요"
                        {...register(`eduHistories[${i}].schoolName`)}
                      />
                    </div>
                    <div className="col-md-1">
                      {dynamicComponents(
                        `eduHistories[${i}].education`,
                        eduCategory,
                        item.education
                      )}
                    </div>
                    <div className="col-md-1">
                      {dynamicComponents(
                        `eduHistories[${i}].graduation`,
                        eduGraduation,
                        item.graduation
                      )}
                    </div>
                    <div className="col-md-2">
                      <div className="flex-box">
                        <div className="first">
                          <input
                            className="field"
                            placeholder="내용 입력"
                            {...register(`eduHistories[${i}].specialty`)}
                          />
                        </div>
                        <div className="last">
                          <input
                            className="field"
                            placeholder="0"
                            {...register(`eduHistories[${i}].gpa`)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1 last">
                      <input
                        className="field"
                        placeholder="내용 입력"
                        {...register(`eduHistories[${i}].location`)}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="col-12">
                <div className="btn add-btn" onClick={addHistory}>
                  <img src="/assets/icons/plus-square.svg" alt="add-btn" />
                  학력 추가하기
                </div>
                <hr />
              </div>
            </div>

            <div className="row section-4">
              <div className="col-12">
                <h5 className="title">4. 해외연수/아카데미</h5>
              </div>
              <div className="col-md-6 first">
                <p className="label top">재학 기간</p>
              </div>
              <div className="col-md-2">
                <p className="label top">학교명</p>
              </div>
              <div className="col-md-2">
                <p className="label top">전공</p>
              </div>
              <div className="col-md-2 last">
                <p className="label top">졸업여부</p>
              </div>
              {interEduHistories?.map((item, i) => {
                return (
                  <div className="section-add-row" key={i}>
                    <div className="col-md-6 first">
                      <div className="flex-box flex-center">
                        {dynamicComponents(
                          `interEduHistories[${i}].fromYear`,
                          year,
                          item.fromYear
                        )}
                        <p className="label">년</p>
                        {dynamicComponents(
                          `interEduHistories[${i}].fromMonth`,
                          months,
                          item.fromMonth
                        )}
                        <p className="label">월 부터</p>
                        {dynamicComponents(
                          `interEduHistories[${i}].toYear`,
                          year,
                          item.toYear
                        )}
                        <p className="label">년</p>
                        {dynamicComponents(
                          `interEduHistories[${i}].toMonth`,
                          months,
                          item.toMonth
                        )}
                        <p className="label">월 까지</p>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <input
                        className="field"
                        placeholder="내용을 입력해주세요"
                        {...register(`interEduHistories[${i}].schoolName`)}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        className="field"
                        placeholder="내용을 입력해주세요"
                        {...register(`interEduHistories[${i}].specialty`)}
                      />
                    </div>
                    <div className="col-md-2 last">
                      {dynamicComponents(
                        `interEduHistories[${i}].status`,
                        eduGraduation
                      )}
                    </div>
                  </div>
                );
              })}

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
                  placeholder="내용 입력"
                  {...register("class1")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">병과</p>
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용 입력"
                  {...register("class2")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">면제사유</p>
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용 입력"
                  {...register("exemption")}
                />
              </div>
              <div className="col-md-1">
                <p className="label">병역기간</p>
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용 입력"
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
                <label htmlFor="exist" className="font13">
                  <input
                    name="myRadio"
                    id="exist"
                    type="radio"
                    value="true"
                    {...register("employmentHistory")}
                    defaultChecked={resume.employmentHistory}
                  />
                  있음
                </label>
                <label htmlFor="noExist" className="font13">
                  <input
                    name="myRadio"
                    id="noExist"
                    type="radio"
                    value="false"
                    defaultChecked={!resume.employmentHistory}
                    {...register("employmentHistory")}
                  />
                  없음
                </label>
              </div>
              <div className="col-md-6">
                <div className="flex-box">
                  <p className="label">경력 직종 첫 번째</p>
                  <input
                    className="field"
                    placeholder="내용을 입력해주세요"
                    {...register(`careerShorts[0].occupation`)}
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
                {dynamicComponents(`careerShorts[0].period`, careerPeriod)}
              </div>
              <div className="col-md-6 offset-md-3">
                <div className="flex-box">
                  <p className="label">경력 직종 첫 번째</p>
                  <input
                    className="field"
                    placeholder="내용을 입력해주세요"
                    {...register(`careerShorts[1].occupation`)}
                  />
                  <button
                    className="btn search-btn"
                    onClick={() => {
                      searchOccu();
                      setOccuNumber(2);
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
                {dynamicComponents(`careerShorts[1].period`, careerPeriod)}
              </div>
              <div className="col-md-6 offset-md-3">
                <div className="flex-box">
                  <p className="label">경력 직종 첫 번째</p>
                  <input
                    className="field"
                    placeholder="내용을 입력해주세요"
                    {...register(`careerShorts[2].occupation`)}
                  />
                  <button
                    className="btn search-btn"
                    onClick={() => {
                      searchOccu();
                      setOccuNumber(3);
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
                {dynamicComponents(`careerShorts[2].period`, careerPeriod)}
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-7">
              <div className="col-12">
                <h5 className="title">7. 경력 상세 사항</h5>
              </div>
              <div className="col-md-6 first">
                <p className="label top">경력기간</p>
              </div>
              <div className="col-md-6 last">
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
                  <div className="col-md-6 first">
                    <div className="flex-box flex-center">
                      {dynamicComponents(
                        `careerDetails[${i}].fromYear`,
                        year,
                        item.fromYear
                      )}
                      <p className="label">년</p>
                      {dynamicComponents(
                        `careerDetails[${i}].fromMonth`,
                        months,
                        item.fromMonth
                      )}
                      <p className="label">월 부터</p>
                      {dynamicComponents(
                        `careerDetails[${i}].toYear`,
                        year,
                        item.toYear
                      )}
                      <p className="label">년</p>
                      {dynamicComponents(
                        `careerDetails[${i}].toMonth`,
                        months,
                        item.toMonth
                      )}
                      <p className="label">월 까지</p>
                    </div>
                  </div>
                  <div className="col-md-6 last">
                    <div className="row">
                      <div className="col-md-2 first">
                        <input
                          className="field"
                          placeholder="내용 입력"
                          {...register(`careerDetails[${i}].companyName`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          placeholder="내용 입력"
                          {...register(`careerDetails[${i}].job`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          placeholder="내용 입력"
                          {...register(`careerDetails[${i}].responsibility`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          placeholder="내용 입력"
                          {...register(`careerDetails[${i}].jobType`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          type="number"
                          placeholder="내용 입력"
                          {...register(`careerDetails[${i}].salary`)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          className="field"
                          placeholder="내용 입력"
                          {...register(`careerDetails[${i}].reason`)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12">
                <div className="btn add-btn" onClick={addDetail}>
                  <img src="/assets/icons/plus-square.svg" alt="add-btn" />
                  경력 추가하기
                </div>
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
                {dynamicComponents("c4D", level)}
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
              {licenses?.map((item, i) => {
                return (
                  <>
                    <div className="col-md-1 first">
                      <p className="label">자격 및 면허명</p>
                    </div>
                    <div className="col-md-3">
                      <input
                        className="field ml"
                        placeholder="내용을 입력해주세요"
                        {...register(`licenses[${i}].name`)}
                      />
                    </div>
                    <div className="col-md-1">
                      <p className="label ml">취득일자</p>
                    </div>
                    <div className="col-md-3">
                      <div className="flex-box flex-center">
                        {dynamicComponents(
                          `licenses[${i}].year`,
                          year,
                          item.year
                        )}
                        <p className="label">년</p>
                        {dynamicComponents(
                          `licenses[${i}].month`,
                          months,
                          item.month
                        )}
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
                        {...register(`licenses[${i}].issuer`)}
                      />
                    </div>
                  </>
                );
              })}
              <div className="col-12">
                <div className="btn add-btn" onClick={addLicenses}>
                  <img src="/assets/icons/plus-square.svg" alt="add-btn" />
                  자격/면허 추가
                </div>
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
              <div className="col-md-2">
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

              <div className="col-md-2 first">
                {dynamicComponents(`languageGrades[0].languageName`, languages)}
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register(`languageGrades[0].testName`)}
                />
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register(`languageGrades[0].score`)}
                />
              </div>
              <div className="col-md-3">
                <div className="flex-box flex-center">
                  {dynamicComponents(`languageGrades[0].year`, year)}
                  <p className="label">년</p>
                  {dynamicComponents(`languageGrades[0].month`, months)}
                  <p className="label">월</p>
                </div>
              </div>
              <div className="col-md-1">
                {dynamicComponents(`languageGrades[0].writing`, level)}
              </div>
              <div className="col-md-1">
                {dynamicComponents(`languageGrades[0].speaking`, level)}
              </div>
              <div className="col-md-1 last">
                {dynamicComponents(`languageGrades[0].listening`, level)}
              </div>
              <div className="col-md-2 first">
                {dynamicComponents(`languageGrades[1].languageName`, languages)}
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register(`languageGrades[1].testName`)}
                />
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register(`languageGrades[1].score`)}
                />
              </div>
              <div className="col-md-3">
                <div className="flex-box flex-center">
                  {dynamicComponents(`languageGrades[1].year`, year)}
                  <p className="label">년</p>
                  {dynamicComponents(`languageGrades[1].month`, months)}
                  <p className="label">월</p>
                </div>
              </div>
              <div className="col-md-1">
                {dynamicComponents(`languageGrades[1].writing`, level)}
              </div>
              <div className="col-md-1">
                {dynamicComponents(`languageGrades[1].speaking`, level)}
              </div>
              <div className="col-md-1 last">
                {dynamicComponents(`languageGrades[1].listening`, level)}
              </div>

              <div className="col-md-2 first">
                {dynamicComponents(`languageGrades[2].languageName`, languages)}
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register(`languageGrades[2].testName`)}
                />
              </div>
              <div className="col-md-2">
                <input
                  className="field"
                  placeholder="내용을 입력해주세요"
                  {...register(`languageGrades[2].score`)}
                />
              </div>
              <div className="col-md-3">
                <div className="flex-box flex-center">
                  {dynamicComponents(`languageGrades[2].year`, year)}
                  <p className="label">년</p>
                  {dynamicComponents(`languageGrades[2].month`, months)}
                  <p className="label">월</p>
                </div>
              </div>
              <div className="col-md-1">
                {dynamicComponents(`languageGrades[2].writing`, level)}
              </div>
              <div className="col-md-1">
                {dynamicComponents(`languageGrades[2].speaking`, level)}
              </div>
              <div className="col-md-1 last">
                {dynamicComponents(`languageGrades[2].listening`, level)}
              </div>

              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="row section-11">
              <div className="col-12">
                <h5 className="title">11. 성장과정</h5>
                <textarea
                  maxLength={1000}
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
                  maxLength={1000}
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
                  maxLength={1000}
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
                  maxLength={1000}
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("technology")}
                />
                <hr />
              </div>
            </div>
            <div className="row section-11">
              <div className="col-12">
                <h5 className="title">15. 입사가능시기</h5>
                <textarea
                  maxLength={1000}
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("availableFrom")}
                />
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="flex-center bottom-buttons">
                  <button
                    className="btn cancel-btn"
                    onClick={() => setSection(2)}
                  >
                    취소
                  </button>
                  <button
                    className="btn panding-btn"
                    onClick={handleSubmit(submit)}
                  >
                    임시 저장
                  </button>
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
          
             <Link onClick={handleSubmit(onSubmit)} className="flex-center recruit">
                <span>이력서 저장</span>
                <img src="/assets/icons/check.svg" alt="recruit" />
            </Link>
            <Link onClick={handleSubmit(submit)} className="flex-center recruit ">
                <span>임시저장</span>
                <img src="/assets/icons/loader-2.svg" alt="panding" />
            </Link>
        </EasyActions>



        <EasyActions className="saver-buttons">
          <div className="content-buttons">
             


           
            
           
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
