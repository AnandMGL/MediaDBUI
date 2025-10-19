import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.scss";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";

const checkInput = {
  code: "인증 번호를 입력해 주세요",
};

export default function UserCode({
  UserCodeModalShow,
  phoneNumber,
  setUserName,
  UserNameResetShow,
  UserResetPasswordShow,
  buttonText 
}) {
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    let checkField = true;

    for (const property in values) {
      if (values[property] === undefined || values[property] === "") {
        toast.warning(checkInput[property]);
        checkField = false;
        break;
      }
    }

    const data = {
      code: values.code,
      phoneNumber: phoneNumber,
    };

    if (checkField) {
      try {
        const res = await mainCallerWithOutToken("sms/check", "POST", data);
        if (res.body.statusCode === 200) {
          toast.success(res.body.message);
          setUserName(res.body?.data);
          UserCodeModalShow();
        } else {
          toast.warning(res.body.message);
        }
      } catch (error) {
        toast.warning(error.response?.data.message);
        setIsUploading(false);
      }
    }
  };

  const onSubmitUserName = async (values) => {
    let checkField = true;

    for (const property in values) {
      if (values[property] === undefined || values[property] === "") {
        toast.warning(checkInput[property]);
        checkField = false;
        break;
      }
    }

    const data = {
      code: values.code,
      phoneNumber: phoneNumber,
    };

    if (checkField) {
      try {
        const res = await mainCallerWithOutToken("sms/check", "POST", data);
        if (res.body.statusCode === 200) {
          toast.success(res.body.message);
          setIsUploading(false);
          setUserName(res.body?.data);
          if(buttonText == '복구된 ID보기'){
              UserNameResetShow();
          }else{
              UserResetPasswordShow();
          }
          
        }
      } catch (error) {
        toast.warning(error.response?.data.message);
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="kakao-content">
      <div className="content-body">
        <div className="form-your-id">
          {/* <h2>회원님의 아이디는  </h2>  */}
          <div className="form-fields">
            <input
              className="field"
              // type="number"
              placeholder="인증 번호를 입력해 주세요"
              {...register("code")}
            />
          </div>
          {/* <h2>입니다.</h2> */}
        </div>

        <div className="helper-buttons flex-center">
          <button className="btn" onClick={handleSubmit(onSubmitUserName)}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
