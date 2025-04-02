/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toTop } from "../../../methods";
import {
  careerPeriod,
  classification,
  county,
  honorAndProtect,
  months,
  years,
} from "../../../constants/constants";
import { useState } from "react";
import CustomModal from "../../../components/modals/CustomModal";
import CodeManagerMobile from "../../../components/modals/CodeManagerMobile";

export default function StepThree({ setActiveStep, resume, setResume }) {
  const [careerDetails, setCareerDetails] = useState();
  const [modal, setModal] = useState({
    isOpen1: false,
    number: null,
  });
  const [occuNumber, setOccuNumber] = useState();

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: resume,
  });

  const year = years();

  const addHistory = () => {
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

  const onSubmit = (values) => {
    setResume(values);
    setActiveStep(4);
  };

  useEffect(() => {
    reset(resume);
    toTop();
    setCareerDetails(resume.careerDetails ?? [{}, {}, {}]);

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
    <form>
      <div className="step-two step-three">
        <hr />
        <div className="content-body">
          <div className="form-fields">
            <h5 className="title">5. 병역 사항</h5>
            <div className="field-box flex-between">
              <div className="col-6">
                <p className="label">국가보훈</p>
                {dynamicComponents("honor", honorAndProtect)}
              </div>
              <div className="col-6">
                <p className="label">생활보호대상</p>
                {dynamicComponents("protection", honorAndProtect)}
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-6">
                <p className="label">계급</p>
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("class1")}
                />
              </div>
              <div className="col-6">
                <p className="label">병과</p>
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("class2")}
                />
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-6">
                <p className="label">병역구분</p>
                {dynamicComponents("classification", classification)}
              </div>
              <div className="col-6">
                <p className="label">군별</p>
                {dynamicComponents("county", county)}
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-6">
                <p className="label">면제사유</p>
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("exemption")}
                />
              </div>
              <div className="col-6">
                <p className="label">병역기간</p>
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("period")}
                />
              </div>
            </div>
            <h5 className="title bg">6. 대표 경력 사항</h5>
            <div className="field-box flex-between radios">
              <p className="label">취업 경력</p>
              <label htmlFor="exist">
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
              <label htmlFor="noExist">
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
            <div className="field-box flex-between">
              <div className="col-8">
                <p className="label">경력 1</p>
                <div className="flex-between">
                  <input
                    className="field"
                    placeholder="홍길동"
                    {...register("careerShorts[0].occupation")}
                  />
                  <a
                    className="btn search-btn"
                    onClick={() => {
                      searchOccu();
                      setOccuNumber(1);
                    }}
                  >
                    검색
                  </a>
                </div>
              </div>
              <div className="col-4">
                <p className="label">기간</p>
                {dynamicComponents("careerShorts[0].period", careerPeriod)}
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-8">
                <p className="label">경력 2</p>
                <div className="flex-between">
                  <input
                    className="field"
                    placeholder="홍길동"
                    {...register("careerShorts[1].occupation")}
                  />
                  <a
                    className="btn search-btn"
                    onClick={() => {
                      searchOccu();
                      setOccuNumber(2);
                    }}
                  >
                    검색
                  </a>
                </div>
              </div>
              <div className="col-4">
                <p className="label">기간</p>
                {dynamicComponents("careerShorts[1].period", careerPeriod)}
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-8">
                <p className="label">경력 3</p>
                <div className="flex-between">
                  <input
                    className="field"
                    placeholder="홍길동"
                    {...register("careerShorts[2].occupation")}
                  />
                  <a
                    className="btn search-btn"
                    onClick={() => {
                      searchOccu();
                      setOccuNumber(3);
                    }}
                  >
                    검색
                  </a>
                </div>
              </div>
              <div className="col-4">
                <p className="label">기간</p>
                {dynamicComponents("careerShorts[2].period", careerPeriod)}
              </div>
            </div>
            <h5 className="title bg">7. 경력 상세 사항</h5>
            {careerDetails?.map((item, i) => {
              return (
                <div key={i} className="field-box-bg">
                  <div className="field-box">
                    <p className="label">재학 기간</p>
                    <div className="field-box flex-between">
                      <div>
                        <p className="label">년</p>
                        {dynamicComponents(
                          `careerDetails[${i}].fromYear`,
                          year,
                          item.fromYear
                        )}
                      </div>
                      <div>
                        <p className="label">월 ~</p>
                        {dynamicComponents(
                          `careerDetails[${i}].fromMonth`,
                          months,
                          item.fromMonth
                        )}
                      </div>
                      <div>
                        <p className="label">년</p>
                        {dynamicComponents(
                          `careerDetails[${i}].toYear`,
                          year,
                          item.toYear
                        )}
                      </div>
                      <div>
                        <p className="label">월</p>
                        {dynamicComponents(
                          `careerDetails[${i}].toMonth`,
                          months,
                          item.toMonth
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="field-box">
                    <p className="label">근무업체명</p>
                    <input
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      {...register(`careerDetails[${i}].companyName`)}
                    />
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-6">
                      <p className="label">학력 구분</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`careerDetails[${i}].job`)}
                      />
                    </div>
                    <div className="col-6">
                      <p className="label">전공학과</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`careerDetails[${i}].responsibility`)}
                      />
                    </div>
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-6">
                      <p className="label">학점</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`careerDetails[${i}].jobType`)}
                      />
                    </div>
                    <div className="col-6">
                      <p className="label">소재지</p>
                      <input
                        type="number"
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`careerDetails[${i}].salary`)}
                      />
                    </div>
                  </div>
                  <div className="field-box">
                    <p className="label">근무업체명</p>
                    <input
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      {...register(`careerDetails[${i}].reason`)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex-between">
              <a className="btn add-btn flex-center" onClick={addHistory}>
                <img src="/assets/icons/plus-square.svg" alt="add-btn" />
                경력 사항 추가
              </a>
              <span className="warning">*수행 프로젝트 및 기타 경력사항</span>
            </div>
          </div>
        </div>
        <div className="bottom-buttons flex-between">
          <button className="btn back" onClick={() => setActiveStep(2)}>
            취소
          </button>
          <button
            className="btn submit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            저장 후 다음
          </button>
        </div>
      </div>
      {modal.isOpen1 && (
        <CustomModal modal={{ isOpen: modal.isOpen1 }} setModal={setModal}>
          <CodeManagerMobile
            modal={modal}
            setModal={setModal}
            contentKey="occupation"
            apiUrl="occupation"
            modalKey="isOpen1"
          />
        </CustomModal>
      )}
    </form>
  );
}
