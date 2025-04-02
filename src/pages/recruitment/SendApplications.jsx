import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function SendApplications({ selected }) {
  const user = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm({ defaultValues: user });

  const onSubmit = async (values) => {
    console.log(values);
    // try {
    // } catch (error) {
    //   alert(error.response.data.message);
    // }
  };

  return (
    <div className="send-apply">
      <hr />
      <h5 className="title">구직증명원 신청</h5>
      <div className="warning-box col-md-7 col-12">
        <h6 className="warning-title">신청 방법 안내</h6>
        <ul>
          <li>
            부정 발급자의 경우 모든 법적 책임은 발급 신청자 및 사용자에게
            있습니다.
          </li>
          <li>
            모든 입력 사항은 필수 기재입니다. 사용 용도는 구체적으로 기재하여
            주시기 바랍니다.
          </li>
          <li>
            E-mail, 연락처에 대한 정보 수정이 필요하신 경우 계정 정보에서
            수정하여 주시기 바랍니다.
          </li>
        </ul>
      </div>
      <div className="form-fields">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="field-box flex-center">
              <p className="label">발급신청자</p>
              <input
                disabled
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("name")}
              />
            </div>
            <div className="field-box flex-center">
              <p className="label">E-mail</p>
              <input
                disabled
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("email")}
              />
            </div>
            <div className="field-box flex-center">
              <p className="label">연락처</p>
              <input
                disabled
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("phoneNumber")}
              />
            </div>
            <div className="field-box flex-center">
              <p className="label">사용 용도</p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("goal")}
              />
              <p>(예: 은행제출용, 관공서제출용 등)</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <button className="btn apply-btn">신청</button>
    </div>
  );
}
