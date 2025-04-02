import React from "react";
import { useForm } from "react-hook-form";
import { authUser } from "../../api/user";
import { toast } from "react-toastify";

const validations = { pattern: /^[A-Za-z]+$/i, required: true, maxLength: 20 };

export default function SectionFive({ setSection }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    console.log(values, "kakao token holboh");
  };

  return (
    <div className="page-content-one flex-center">
      <div className="rocket-box">
        <img src="/assets/images/rocket.svg" alt="rocket" />
      </div>
      <h3 className="title">Kakao</h3>
      <div className="form-fields">
        <input
          className="field"
          placeholder="아이디"
          {...register("username", validations)}
        />
        <input
          className="field"
          placeholder="비밀번호"
          type="password"
          {...register("password", { required: true })}
        />
      </div>
      <button className="btn submit" onClick={handleSubmit(onSubmit)}>
        로그인
      </button>
      <button className="btn kakao" onClick={() => setSection(3)}>
        <img src="/assets/icons/message.svg" alt="kakao" />
        카카오 로그인
      </button>
      <div className="helper-buttons flex-between">
        <button className="sign-up" onClick={() => setSection(2)}>
          회원가입
        </button>
        <div className="forgot-buttons">
          <button className="find">아이디 찾기</button>
          <button className="find">비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
}
