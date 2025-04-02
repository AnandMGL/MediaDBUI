import React from "react";
import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
import "./headhunting.modal.scss";
import SimpleCheckbox from "../inputs/SimpleCheckbox";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import {
  HeadhuntingAddVal,
  emailValid,
  valNumber,
  validPorson,
} from "../../constants/constants";
import { toast } from "react-toastify";

export default function HeadhuntingModal() {
  // const user = useSelector((state) => state.user);
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
    <div className="head-hunting-form">
      <hr />
      <div className="warning-box col-md-7 col-12">
        <h2 className="text-title">
          아래 서식을 통해 문의주시면 담당자가 친절히 응대 드리도록 하겠습니다.
          문의사항은 아래 연락처로 문의 주시면 더욱 빠른 상담이 가능합니다.
        </h2>
        <div className="ellipse">
          <img src="/assets/images/ellipse.png" alt="" />
          <h6 className="warning-title">02-2090-1548 / 02-2090-1580</h6>
        </div>
        <div className="ellipse">
          <img src="/assets/images/ellipse-2.png" alt="" />
          <h6 className="warning-title">pjm@crikorea.com</h6>
        </div>
      </div>
      <hr />
      <div className="form-fields">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="field-box flex-center">
              <div className="flex-between">
                <p className="label">
                  담당자명 <font>*</font>
                </p>
                <p className="label">
                  <font>*</font> 항목은 필수 입력 사항입니다.
                </p>
              </div>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("personInCharge", validPorson)}
              />
              {errors.personInCharge && (
                <p className="error-message">{errors.personInCharge.message}</p>
              )}
            </div>
            <div className="field-box flex-center">
              <p className="label">
                직급 <font>*</font>
              </p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("position", validPorson)}
              />
              {errors.position && (
                <p className="error-message">{errors.position.message}</p>
              )}
            </div>
            <div className="field-box flex-center">
              <p className="label">
                휴대폰 <font>*</font>
              </p>
              <input
                type="number"
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("phoneNumber", valNumber)}
              />
              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="field-box flex-center">
              <p className="label">
                E-mail <font>*</font>
              </p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("email", emailValid)}
                onBlur={handleTrim}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            <div className="field-box flex-center">
              <p className="label">
                회사명 <font>*</font>
              </p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("companyName", validPorson)}
              />
              {errors.companyName && (
                <p className="error-message">{errors.companyName.message}</p>
              )}
            </div>
            <div className="field-box flex-center">
              <p className="label">전화번호(내선)</p>
              <input
                type="number"
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("telePhoneNumber")}
              />
            </div>
            <div className="field-box flex-center">
              <p className="label">홈페이지</p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("webAddress")}
              />
            </div>

            <div className="field-box flex-center">
              <p className="label">
                구인 의뢰 내용 <font>*</font>
              </p>
              <textarea
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("detail", HeadhuntingAddVal)}
              />
              {errors.detail && (
                <p className="error-message">{errors.detail.message}</p>
              )}
            </div>

            <SimpleCheckbox label="개인정보 수집 및 이용 안내에 동의합니다." />
            <h5 className="title-info">개인정보 수집 이용 안내</h5>
            <br />
            <h5 className="warning">
              문의에 대한 처리 및 답변을 위해 성명, 연락처, 이메일 정보가
              수집되며, 수집된 정보는 3년간 보관합니다. <br />
              이에 동의하지 않을 경우 문의/제안/신고 등록이 불가하며, 선택
              항목은 입력하지 않더라도 서비스 이용에 제한을 두지 않습니다.
            </h5>
          </div>
        </div>
      </div>
      <button className="btn headhunting-btn" onClick={handleSubmit(onSubmit)}>
        의뢰하기
      </button>
    </div>
  );
}
