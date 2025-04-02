import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toTop } from "../../../methods";
import {
  eduCategory,
  eduGraduation,
  eduLevel,
  location,
  months,
  years,
} from "../../../constants/constants";
import { useState } from "react";

export default function StepTwo({ setActiveStep, resume, setResume }) {
  const [eduHistories, setEduHistories] = useState();
  const [interEduHistories, setInterEduHistories] = useState();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: resume,
  });

  useEffect(() => {
    reset(resume);
    setEduHistories(resume.eduHistories ?? [{}]);
    setInterEduHistories(resume.interEduHistories ?? [{}, {}]);
    toTop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  const year = years();

  const addHistory = () => {
    setEduHistories([...eduHistories, {}]);
  };

  const onSubmit = (values) => {
    setResume(values);
    setActiveStep(3);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="step-two">
        <hr />
        <div className="content-body">
          <div className="form-fields">
            <h5 className="title">2. 신상 명세</h5>
            <div className="field-box">
              <p className="label">종교</p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("religion")}
              />
            </div>
            <div className="field-box">
              <p className="label">취미</p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("hobby")}
              />
            </div>
            <div className="field-box">
              <p className="label">특기</p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("specialty")}
              />
            </div>
            <h5 className="title">3. 학력 사항</h5>
            <span className="warning">
              {
                "*고등학교>대학교>대학원 순으로 입력해주세요. 학교명은 공식명으로 뒤에 고등학교 대학교 대학원은 제외하여 기재해주세요."
              }
            </span>
            {eduHistories?.map((item, i) => {
              return (
                <div key={i} className="field-box-bg">
                  <div className="field-box">
                    <p className="label">재학 기간</p>
                    <div className="field-box flex-between">
                      <div>
                        <p className="label">년</p>
                        {dynamicComponents(
                          `eduHistories[${i}].fromYear`,
                          year,
                          item.fromYear
                        )}
                      </div>
                      <div>
                        <p className="label">월 ~</p>
                        {dynamicComponents(
                          `eduHistories[${i}].fromMonth`,
                          months,
                          item.fromMonth
                        )}
                      </div>
                      <div>
                        <p className="label">년</p>
                        {dynamicComponents(
                          `eduHistories[${i}].toYear`,
                          year,
                          item.toYear
                        )}
                      </div>
                      <div>
                        <p className="label">월</p>
                        {dynamicComponents(
                          `eduHistories[${i}].toMonth`,
                          months,
                          item.toMonth
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-7">
                      <p className="label">학교명</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`eduHistories[${i}].schoolName`)}
                      />
                    </div>
                    <div className="col-4">
                      <p className="label">학력 구분</p>
                      {dynamicComponents(
                        `eduHistories[${i}].education`,
                        eduCategory,
                        item.education
                      )}
                    </div>
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-4">
                      <p className="label">학력 구분</p>
                      {dynamicComponents(
                        `eduHistories[${i}].graduation`,
                        eduGraduation,
                        item.graduation
                      )}
                    </div>

                    <div className="col-7">
                      <p className="label">전공학과</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`eduHistories[${i}].specialty`)}
                      />
                    </div>
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-4">
                      <p className="label">학점</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`eduHistories[${i}].gpa`)}
                      />
                    </div>
                    <div className="col-7">
                      <p className="label">소재지</p>
                      {dynamicComponents(
                        `eduHistories[${i}].location`,
                        location,
                        item.location
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <a className="btn add-btn flex-center" onClick={addHistory}>
              <img src="/assets/icons/plus-square.svg" alt="add-btn" />
              학력 사항 추가
            </a>
            <h5 className="title">4. 해외연수/아카데미</h5>
            {interEduHistories?.map((item, index) => {
              return (
                <div key={index} className="field-box-bg">
                  <div className="field-box">
                    <p className="label">재학 기간</p>
                    <div className="field-box flex-between">
                      <div>
                        <p className="label">년</p>
                        {dynamicComponents(
                          `interEduHistories[${index}].fromYear`,
                          year,
                          item.fromYear
                        )}
                      </div>
                      <div>
                        <p className="label">월 ~</p>
                        {dynamicComponents(
                          `interEduHistories[${index}].fromMonth`,
                          months,
                          item.fromMonth
                        )}
                      </div>
                      <div>
                        <p className="label">년</p>
                        {dynamicComponents(
                          `interEduHistories[${index}].toYear`,
                          year,
                          item.toYear
                        )}
                      </div>
                      <div>
                        <p className="label">월</p>
                        {dynamicComponents(
                          `interEduHistories[${index}].toMonth`,
                          months,
                          item.toMonth
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-7">
                      <p className="label">학교명</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`interEduHistories[${index}].schoolName`)}
                      />
                    </div>
                    <div className="col-4">
                      <p className="label fade">학력 구분</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`interEduHistories[${index}].specialty`)}
                      />
                    </div>
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-4">
                      <p className="label">졸업 구분</p>
                      {dynamicComponents(
                        `interEduHistories[${index}].status`,
                        eduGraduation,
                        item.status
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom-buttons flex-between">
          <button className="btn back" onClick={() => setActiveStep(1)}>
            취소
          </button>
          <button
            type="submit"
            className="btn submit"
            // onClick={() => setActiveStep(3)}
          >
            저장 후 다음
          </button>
        </div>
      </div>
    </form>
  );
}
