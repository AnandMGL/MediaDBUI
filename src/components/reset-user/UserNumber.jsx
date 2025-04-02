import React, { useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";

const checkNumber = {
  phoneNumber: "전화 번호를 입력해 주세요",
};

export default function UserNumber({ UserNumberModalShow, setPhoneNumber }) {
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    let checkField = true;
    for (const property in values) {
      if (values[property] === undefined || values[property] === "") {
        toast.warning(checkNumber[property]);
        checkField = false;
        break;
      }
    }
    if (checkField) {
      setIsUploading(true);
      try {
        const res = await mainCallerWithOutToken(
          "sms/checkUser",
          "POST",
          values
        );
        if (res.body.statusCode === 200) {
          toast.success(res.body.message);
          setPhoneNumber(res.body.data);
          UserNumberModalShow();
          setIsUploading(false);
        } else {
          toast.warning(res.body.message);
          setIsUploading(false);
        }
      } catch (error) {
        toast.error(error.response?.data.message);
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="kakao-content">
      <div className="content-body">
        <p>휴대폰 본인인증을 진행하여 주세요.</p>
        <div className="form-your-id">
          <div className="form-fields">
            <input
              className="field"
              type="number"
              placeholder="전화 번호를 입력해 주세요"
              {...register("phoneNumber")}
            />
          </div>
        </div>
        <div className="helper-buttons flex-center">
          {isUploading ? (
            <Button>
              <CircularProgress />
            </Button>
          ) : (
            <button className="btn" onClick={handleSubmit(onSubmit)}>
              본인인증 진행하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
