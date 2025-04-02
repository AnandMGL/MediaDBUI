import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import BreadCrumb from "../../components/bread-crumb";
import SimpleCheckbox from "../../components/inputs/SimpleCheckbox";
import CustomModal from "../../components/modals/CustomModal";
import HeadhuntingModal from "../../components/modals/HeadhuntingModal";
import {
  HeadhuntingAddVal,
  emailValid,
  valNumber,
  validPorson,
  validRank,
} from "../../constants/constants";
import Process from "./Process";
import "./index.scss";

export default function HeadHunting() {
  const [modal, setModal] = useState({ isOpen: false });

  const openModal = () => {
    setModal({ isOpen: true });
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleTrim = (e) => {
    const trimmedValue = e.target.value.trim();
    setValue("email", trimmedValue);
  };

  const onSubmit = async (values) => {
    try {
      const res = await mainCallerWithOutToken(
        "headhunting/create",
        "POST",
        values
      );
      if (res.statusCode === 200) {
        toast.success(res.message);
        reset({
          personInCharge: "",
          position: "",
          phoneNumber: "",
          email: "",
          companyName: "",
          telePhoneNumber: "",
          webAddress: "",
          detail: "",
        });
      } else {
        toast.warning(res.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <>
      <div className="head-hunting-page">
        <div className="container">
          <BreadCrumb crumbName={"헤드헌팅"} />
          <h5 className="title">헤드헌팅</h5>
        </div>
        <div className="page-body">
          <div className="container">
            <div className="page-content">
              <div className="req">
                <button
                  onClick={openModal}
                  className="btn request-button mobile flex-between"
                >
                  헤드헌팅 의뢰하기
                  <img src="/assets/icons/compass.svg" alt="compas" />
                </button>
              </div>

              <div className="page-content-one">
                <h5 className="title">서비스 소개</h5>
                <p className="subtitle">
                  미디어분야의 Global경쟁시대는 기업은 물론 개인에게도 전문성과
                  기술력을 요구 하고 있습니다.
                  <br />
                  급변하는 기업환경에 맞추어 전문인력이 필요한 때에, 기업은
                  핵심역량을 키우기 위하여 채용하고 있습니다.
                </p>
                <h6 className="info">
                  (주)크릭앤리버엔터테인먼트는 “미디업분야 전문 HR 에이전시
                  기업”으로서 <br />
                  기업이 필요로 하는 인재를 원하는 시기에 채용할 수 있도록
                  체계적인 <br />
                  ON-LINE 시스템과 OUT-SEARCH로 검증된 인재 DB, 인적 네트워크를
                  통해 <br />
                  (주)크릭앤리버엔터테인먼트만의 차별화된 헤드헌팅 서비스를
                  제공합니다.
                </h6>
                <p className="subtitle">
                  - 미디어 전문인력 분야에 대한 다양한 인재 정보 제공
                  <br />
                  - 계약직, 정규직 등 기업의 중요 직책, 중역 채용
                  <br />- 전직, 재취업, 채용서비스
                </p>
              </div>
              <div className="page-content-two">
                <h5 className="title">헤드헌팅 영역</h5>
                <div className="search-levels">
                  <div className="executive">
                    <p className="title">임원급을 대상으로 하는</p>
                    <h5 className="title">Executive Search</h5>
                    <div className="middle">
                      <p className="title">
                        부장급 이하의 과장과 대리급을 대상으로 하는
                      </p>
                      <h5 className="title">Middle Search</h5>
                      <div className="junior">
                        <p className="title">
                          신입사원 또는 3년 이하의 경력자를 대상으로 하는
                        </p>
                        <h5 className="title">Junior Search</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-content-three">
                <h5 className="title">프로세스</h5>
                <Process />
              </div>
              <div className="page-content-four desktop">
                <h5 className="title">헤드헌팅 의뢰하기</h5>
                <p className="subtitle">
                  아래 서식을 통해 문의주시면 담당자가 친절히 응대 드리도록
                  하겠습니다. <br />
                  문의사항은 아래 연락처로 문의 주시면 더욱 빠른 상담이
                  가능합니다.
                </p>
                <div className="contacts">
                  <div className="tel">
                    <img src="/assets/icons/tel.svg" alt="tel" />
                    <a href="tel:0220901524">02-2090-1524</a>/
                    <a href="tel:01042994314">010-4299-4314</a>
                  </div>
                  <div className="email">
                    <img src="/assets/icons/email.svg" alt="email" />
                    <a href="mailto:pjm@crikorea.com">pjm@crikorea.com</a>
                  </div>
                </div>
                <span className="warning">
                  <font>*</font> 항목은 필수 입력 사항입니다.
                </span>
                <div className="form-fields">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="field-box flex-center">
                        <p className="label">
                          담당자명 <font>*</font>
                        </p>
                        <div className="w-100">
                          <input
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("personInCharge", validPorson)}
                          />
                          {errors.personInCharge && (
                            <p className="error-message">
                              {errors.personInCharge.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="field-box flex-center">
                        <p className="label">
                          직급 <font>*</font>
                        </p>
                        <div className="w-100">
                          <input
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("position", validRank)}
                          />
                          {errors.position && (
                            <p className="error-message">
                              {errors.position.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="field-box flex-center">
                        <p className="label">
                          휴대폰 <font>*</font>
                        </p>
                        <div className="w-100">
                          <input
                            type="tel"
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("phoneNumber", valNumber)}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                          />
                          {errors.phoneNumber && (
                            <p className="error-message">
                              {errors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="field-box flex-center">
                        <p className="label">
                          E-mail <font>*</font>
                        </p>
                        <div className="w-100">
                          <input
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("email", emailValid)}
                            onBlur={handleTrim}
                          />
                          {errors.email && (
                            <p className="error-message">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="field-box flex-center">
                        <p className="label">
                          회사명 <font>*</font>
                        </p>
                        <div className="w-100">
                          <input
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("companyName", validPorson)}
                          />
                          {errors.companyName && (
                            <p className="error-message">
                              {errors.companyName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="field-box flex-center">
                        <p className="label">전화번호(내선)</p>
                        <div className="w-100">
                          <input
                            type="number"
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("telePhoneNumber")}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                          />
                        </div>
                      </div>
                      <div className="field-box flex-center">
                        <p className="label">홈페이지</p>
                        <div className="w-100">
                          <input
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("webAddress")}
                          />
                        </div>
                      </div>
                      <SimpleCheckbox label="개인정보 수집 및 이용 안내에 동의합니다." />

                      <span className="warning">
                        개인정보 수집 이용 안내
                        <br />
                        문의에 대한 처리 및 답변을 위해 성명, 연락처, 이메일
                        정보가 수집되며, 수집된 정보는 3년간 보관합니다. <br />
                        이에 동의하지 않을 경우 문의/제안/신고 등록이 불가하며,
                        선택 항목은 입력하지 않더라도 서비스 이용에 제한을 두지
                        않습니다.
                      </span>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="field-box flex-center">
                        <div className="col-2">
                          <p className="label">
                            구인 의뢰 내용 <font>*</font>
                          </p>
                        </div>
                        <div className="col-10">
                          <textarea
                            className="field"
                            placeholder="내용을 입력하여 주세요"
                            {...register("detail", HeadhuntingAddVal)}
                          />
                          {errors.detail && (
                            <p className="error-message">
                              {errors.detail.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button
                    className="btn apply-btn"
                    onClick={handleSubmit(onSubmit)}
                  >
                    의뢰하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal.isOpen && (
        <CustomModal
          {...{ modal, setModal }}
          title="구직증명원 신청"
          className="headhunting-modal"
          children={<HeadhuntingModal />}
        />
      )}
    </>
  );
}
