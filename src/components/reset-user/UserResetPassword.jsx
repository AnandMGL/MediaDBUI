import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.scss";
import { toast } from "react-toastify";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { Button, CircularProgress } from "@mui/material";
import { validPassword } from "../../constants/constants";

export default function UserResetPassword({ userName, setResetPassword }) {
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordShow = () => {
    setHidePassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: userName,
  });

  const password = watch("password");

  const onSubmit = async (values) => {
    setIsUploading(true);
    const data = {
      password: values.password,
      userName: userName,
    };

    try {
      const res = await mainCallerWithOutToken(
        "sms/resetPassword",
        "POST",
        data
      );
      if (res.body.statusCode === 200) {
        toast.success(res.body.message);
        setIsUploading(false);
        setResetPassword(false);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      setIsUploading(false);
    }
  };

  return (
    <div className="kakao-content">
      <div className="content-body">
        <div className="form-your-id">
          <h2>회원님의 아이디는</h2>
          <div className="form-fields">
            <div className="user-name">{userName}</div>
          </div>
          <h2>입니다.</h2>
        </div>
        <div className="form-fields-pass">
          <h3>비밀번호</h3>
          <div>
            <div className="password-input-box">
              <input
                type={showPassword ? "text" : "password"}
                className="field-pass"
                placeholder="내용을 입력하여 주세요"
                {...register("password", validPassword)}
              />
              <div
                className="toggle-password-btn"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <img src="/assets/icons/eye.svg" alt="eye" />
                ) : (
                  <img src="/assets/icons/eye-off.svg" alt="eye-off" />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
          </div>
        </div>
        <div className="form-fields-pass">
          <h3>비밀번호 확인</h3>
          <div>
            <div className="password-input-box">
              <input
                type={hidePassword ? "text" : "password"}
                className="field-pass"
                placeholder="내용을 입력하여 주세요"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "비밀번호가 서로 일치하지 않아요",
                })}
              />
              <div
                className="toggle-password-btn"
                onClick={handleTogglePasswordShow}
              >
                {hidePassword ? (
                  <img src="/assets/icons/eye.svg" alt="eye" />
                ) : (
                  <img src="/assets/icons/eye-off.svg" alt="eye-off" />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

        <hr />
        <div className="helper-buttons flex-center">
          {isUploading ? (
            <Button>
              <CircularProgress />
            </Button>
          ) : (
            <button className="btn" onClick={handleSubmit(onSubmit)}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
