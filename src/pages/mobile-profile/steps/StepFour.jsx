import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { languages, level, months, years } from "../../../constants/constants";
import { toTop } from "../../../methods";

export default function StepFour({ setActiveStep, resume, setResume }) {
  const [languageGrades, setLanguageGrades] = useState();
  const [licenses, setLicenses] = useState();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: resume,
  });

  const year = years();

  const addLicenses = () => {
    setLicenses([...licenses, {}]);
  };

  const onSubmit = (values) => {
    setResume(values);
    setActiveStep(5);
  };

  useEffect(() => {
    reset(resume);
    toTop();
    setLanguageGrades(resume.languageGrades ?? [{}, {}, {}]);
    setLicenses(resume.licenses ?? [{}, {}]);

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
      <div className="step-two step-four">
        <hr />
        <div className="content-body">
          <div className="form-fields">
            <h5 className="title">8. PC 활용 능력</h5>
            <hr />
            <p className="label">OA/문서작성</p>
            <div className="field-box flex-between">
              <div className="col-4">
                <p className="label">한글</p>
                {dynamicComponents("korean", level)}
              </div>
              <div className="col-4 middle">
                <p className="label">MS워드</p>
                {dynamicComponents("msWord", level)}
              </div>
              <div className="col-4">
                <p className="label">MS엑셀</p>
                {dynamicComponents("msExcel", level)}
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-4">
                <p className="label">파워포인트</p>
                {dynamicComponents("powerPoint", level)}
              </div>
              <div className="col-4 middle">
                <p className="label">전산,ERP</p>
                {dynamicComponents("erp", level)}
              </div>
              <div className="col-4">
                <p className="label">회계,전산회계</p>
                {dynamicComponents("pc", level)}
              </div>
            </div>
            <hr />
            <p className="label">OA/문서작성</p>
            <div className="field-box flex-between">
              <div className="col-4">
                <p className="label">포토샵</p>
                {dynamicComponents("photoshop", level)}
              </div>
              <div className="col-4 middle">
                <p className="label">일러스트</p>
                {dynamicComponents("illustrator", level)}
              </div>
              <div className="col-4">
                <p className="label">Maya</p>
                {dynamicComponents("maya", level)}
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-4">
                <p className="label">Nuke</p>
                {dynamicComponents("nuke", level)}
              </div>
              <div className="col-4 middle">
                <p className="label">3DMax</p>
                {dynamicComponents("threDMax", level)}
              </div>
              <div className="col-4">
                <p className="label">C4D</p>
                {dynamicComponents("c4D", level)}
              </div>
            </div>
            <hr />
            <p className="label">영상 편집</p>
            <div className="field-box flex-between">
              <div className="col-4">
                <p className="label">파이널컷</p>
                {dynamicComponents("finalCut", level)}
              </div>
              <div className="col-4 middle">
                <p className="label">EDIUS</p>
                {dynamicComponents("edius", level)}
              </div>
              <div className="col-4">
                <p className="label">AVID</p>
                {dynamicComponents("avid", level)}
              </div>
            </div>
            <div className="field-box flex-between">
              <div className="col-4">
                <p className="label">Premiere</p>
                {dynamicComponents("premiere", level)}
              </div>
              <div className="col-4 middle">
                <p className="label">애프터이펙트</p>
                {dynamicComponents("after", level)}
              </div>
              <div className="col-4" />
            </div>
            <hr />
            <p className="label">영상 촬영</p>
            <div className="field-box flex-between">
              <div className="col-6">
                <p className="label">촬영(6mm, DSSR)</p>
                {dynamicComponents("shooting", level)}
              </div>
              <div className="col-6">
                <p className="label">촬영(ENG,EFP)</p>
                {dynamicComponents("filming", level)}
              </div>
            </div>
            <hr />
            <h5 className="title bg">9. 자격/면허</h5>
            {licenses?.map((item, i) => {
              return (
                <div className="field-box-bg">
                  <div className="flex-between">
                    <div className="col-6">
                      <div className="field-box">
                        <p className="label">자격 및 면허명</p>
                        <div className="field-box flex-between">
                          <input
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register(`licenses[${i}].name`)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="field-box">
                        <p className="label">취득일자</p>
                        <div className="field-box flex-between">
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
                          {/* <p className="label">월</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field-box">
                    <p className="label">발급기관</p>
                    <input
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      {...register(`licenses[${i}].issuer`)}
                    />
                  </div>
                </div>
              );
            })}

            {/* <div className="field-box-bg">
              <div className="flex-between">
                <div className="col-6">
                  <div className="field-box">
                    <p className="label">자격 및 면허명</p>
                    <div className="field-box flex-between">
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register("licenses[1].name")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="field-box">
                    <p className="label">취득일자</p>
                    <div className="field-box flex-between">
                      {dynamicComponents("licenses[1].year", year)}
                      <p className="label">년</p>
                      {dynamicComponents("licenses[1].month", months)}
                      <p className="label">월</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-box">
                <p className="label">발급기관</p>
                <input
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("licenses[1].issuer")}
                />
              </div>
            </div> */}
            <div className="flex-between">
              <a className="btn add-btn flex-center" onClick={addLicenses}>
                <img src="/assets/icons/plus-square.svg" alt="add-btn" />
                자격/면허 추가
              </a>
            </div>
            <h5 className="title bg">10. 어학능력</h5>
            {languageGrades?.map((item, i) => {
              return (
                <div key={i} className="field-box-bg">
                  <div className="field-box flex-between">
                    <div className="col-6">
                      <p className="label">어학 구분</p>
                      {dynamicComponents(
                        `languageGrades[${i}].languageName`,
                        languages,
                        item.languageName
                      )}
                    </div>
                    <div className="col-6">
                      <p className="label">공인 시험명</p>
                      <input
                        className="field"
                        placeholder="내용을 입력하여 주세요"
                        {...register(`languageGrades[${i}].testName`)}
                      />
                    </div>
                  </div>
                  <div className="flex-between">
                    <div className="col-6">
                      <div className="field-box">
                        <p className="label">취득일자</p>
                        <div className="field-box flex-between">
                          <div>
                            <p className="label">년</p>
                            {dynamicComponents(
                              `languageGrades[${i}].year`,
                              year,
                              item.year
                            )}
                          </div>
                          <div>
                            <p className="label">월</p>
                            {dynamicComponents(
                              `languageGrades[${i}].month`,
                              months,
                              item.month
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 m-top">
                      <div className="field-box">
                        <p className="label">점수/급수</p>
                        <div className="field-box flex-between">
                          <input
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register(`languageGrades[${i}].score`)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field-box flex-between">
                    <div className="col-4">
                      <p className="label">작문</p>
                      {dynamicComponents(
                        `languageGrades[${i}].writing`,
                        level,
                        item.writing
                      )}
                    </div>
                    <div className="col-4 middle">
                      <p className="label">회화</p>
                      {dynamicComponents(
                        `languageGrades[${i}].speaking`,
                        level,
                        item.speaking
                      )}
                    </div>
                    <div className="col-4">
                      <p className="label">독해</p>
                      {dynamicComponents(
                        `languageGrades[${i}].listening`,
                        level,
                        item.listening
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom-buttons flex-between">
          <button className="btn back" onClick={() => setActiveStep(3)}>
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
    </form>
  );
}
