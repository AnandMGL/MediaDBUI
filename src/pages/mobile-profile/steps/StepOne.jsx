import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toTop } from "../../../methods";
import { eduLevel, imgURL } from "../../../constants/constants";

export default function StepOne({ setActiveStep, setResume, resume }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  let newUser = {
    username: user.name,
    birthday: user.birthday,
    name: user.name,
    gender: user.gender,
    eduLevel: user.eduLevel,
    address: user.address,
    addressDetails: user.addressDetails,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: newUser,
    resume,
  });

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (values) => {
    setResume(values);
    setActiveStep(2);
  };

  useEffect(() => {
    reset(resume);
    setImage(user.profilePicture);
    toTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="step-one">
        <hr />
        <div className="content-body">
          <div className="form-fields">
            <div className="field-box">
              <h5 className="title">이력서 제목</h5>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("title")}
              />
              <span className="warning">
                * 이력서 제목은 제출처에 노출되지 않습니다.
              </span>
            </div>
            <hr />
            <h5 className="title">1. 기본 정보</h5>
            <label htmlFor="imageupload">
              <div className="image-box">
                {image ? (
                  <img
                    src={imageUrl || imgURL + user.profilePicture}
                    alt="uploader"
                  />
                ) : null}
                <div className="camera flex-center">
                  <img src="/assets/icons/camera.svg" alt="camera" />
                </div>
              </div>
              <input
                disabled
                type="file"
                id="imageupload"
                style={{ display: "none" }}
                onChange={handleUploadImage}
              />
            </label>
            <div className="field-box">
              <p className="label">이름(한글)</p>
              <input
                className="field"
                disabled
                placeholder="내용을 입력하여 주세요"
                {...register("name")}
              />
            </div>
            <div className="field-box">
              <p className="label">생년월일</p>
              <input
                className="field"
                disabled
                placeholder="내용을 입력하여 주세요"
                {...register("birthday")}
              />
            </div>
            <div className="field-box flex-between">
              <div className="col-4">
                <p className="label">성별</p>
                <select
                  className="field first"
                  {...register("gender")}
                  disabled
                >
                  <option value="선택">선택</option>
                  <option value="남자">남자</option>
                  <option value="여자">여자</option>
                </select>
              </div>
              <div className="col-7">
                <p className="label">최종학력</p>
                <select className="field" disabled {...register("eduLevel")}>
                  {eduLevel?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field-box">
              <p className="label">휴대폰</p>
              <input
                disabled
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("phoneNumber")}
              />
            </div>
            <div className="field-box">
              <p className="label">주소</p>
              <div className="d-flex w-100 mb-2">
                <input
                  disabled
                  className="field"
                  placeholder="내용을 입력하여 주세요"
                  {...register("address")}
                />
              </div>
              <input
                disabled
                className="field"
                placeholder="상세주소를 입력하여 주세요"
                {...register("addressDetails")}
              />
            </div>
            <div className="field-box">
              <p className="label">이메일</p>
              <input
                disabled
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("email")}
              />
            </div>
            <div className="field-box">
              <p className="label">아이디</p>
              <input
                className="field mb-2"
                disabled
                placeholder="내용을 입력하여 주세요"
                {...register("username")}
              />
              <span className="warning">
                * 이미지 및 기본 정보 수정은 계정 정보탭에서 가능합니다.
              </span>
            </div>
            <hr />
            <div className="field-box">
              <p className="label">이름(영문)</p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("nameEnglish")}
              />
            </div>
            <div className="field-box">
              <p className="label">이름(한자)</p>
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("nameChinese")}
              />
            </div>
            <hr />
          </div>
        </div>
        <div className="bottom-buttons flex-between">
          <button className="btn back" onClick={() => navigate("/")}>
            취소
          </button>
          <button className="btn submit" type="submit">
            저장 후 다음
          </button>
        </div>
      </div>
    </form>
  );
}
