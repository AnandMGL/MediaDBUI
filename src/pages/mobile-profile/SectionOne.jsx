import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { eduLevel, imgURL, scriptUrl } from "../../constants/constants";
import { mainCallerFileWithToken } from "../../api/mainCaller";
import { setUserData } from "../../actions/user";
import { toast } from "react-toastify";
import { getCoordinatesByAddress } from "../../api/nominatium";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Box } from "@mui/material";

export default function SectionOne() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const open = useDaumPostcodePopup(scriptUrl);

  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const newUserData = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    birthday: user.birthday,
    gender: user.gender,
    eduLevel: user.eduLevel,
    phoneNumber: user.phoneNumber,
    address: user.address,
    addressDetails: user.addressDetails,
    idealAddress: user.idealAddress,
    profilePicture: "image",
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordShow = () => {
    setHidePassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: newUserData,
  });

  const password = watch("password");

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleComplete = async (data) => {
    const address = await getCoordinatesByAddress(data.addressEnglish);
    if (address) {
      setValue("address", address[0].address.addressLine1);
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  useEffect(() => {
    setImage(user.profilePicture);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append("file", image);

    try {
      await mainCallerFileWithToken("applicants/update", "POST", formData).then(
        (res) => {
          if (res.statusCode === 200) {
            dispatch(
              setUserData({
                ...values,
                token: user.token,
                profilePicture: res.data,
              })
            );
            toast.success(res.message);
          } else {
            toast.warning(res.message);
          }
          reset(setUserData());
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="page-content-one">
      <h4 className="title">계정 정보</h4>
      <div className="content-body">
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
            type="file"
            id="imageupload"
            style={{ display: "none" }}
            onChange={handleUploadImage}
            accept="image/*"
          />
        </label>
        <div className="form-fields">
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
              placeholder="내용을 입력하여 주세요"
              disabled
              {...register("birthday")}
            />
          </div>
          <div className="field-box flex-between">
            <div className="col-4">
              <p className="label">성별</p>
              <select className="field first" {...register("gender")} disabled>
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
            <div className="d-flex w-100">
              <input
                disabled
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("phoneNumber", { value: "010-2233-4455" })}
              />
            </div>
          </div>
          <div className="field-box">
            <p className="label">주소</p>
            <div className="d-flex w-100 mb-2">
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("address")}
              />
              <button className="btn search" onClick={handleClick}>
                검색
              </button>
            </div>
            <input
              className="field"
              placeholder="내용을 입력하여 주세요"
              {...register("addressDetails")}
            />
          </div>
          <div className="field-box">
            <p className="label">입사 희망 지역</p>
            <div className="d-flex w-100">
              <input
                className="field"
                placeholder="시,군,구 단위로 기재. 없을 시 ‘무관’으로 입력"
                {...register("idealAddress")}
              />
            </div>
          </div>
          <div className="field-box">
            <p className="label">이메일</p>
            <input
              className="field"
              placeholder="내용을 입력하여 주세요"
              {...register("email")}
            />
          </div>
          <div className="field-box">
            <p className="label">아이디</p>
            <input
              className="field"
              disabled
              placeholder="내용을 입력하여 주세요"
              {...register("username")}
            />
          </div>
          <hr />
        </div>
        <div className="form-fields">
          <div className="field-box">
            <p className="label">비밀번호</p>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                className="field"
                type={showPassword ? "text" : "password"}
                placeholder="내용을 입력하여 주세요"
                {...register("password")}
              />
              <Box
                sx={{
                  position: "absolute",
                  paddingRight: "8px",
                }}
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <img src="/assets/icons/eye.svg" alt="eye" width={20} />
                ) : (
                  <img
                    src="/assets/icons/eye-off.svg"
                    alt="eye-off"
                    width={20}
                  />
                )}
              </Box>
            </Box>
          </div>
          <div className="field-box">
            <p className="label">비밀번호 확인</p>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <input
                className="field"
                placeholder="내용을 입력하여 주세요"
                type={hidePassword ? "text" : "password"}
                {...register("verifyPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              <Box
                sx={{ position: "absolute", paddingRight: "8px" }}
                onClick={handleTogglePasswordShow}
              >
                {hidePassword ? (
                  <img src="/assets/icons/eye.svg" alt="eye" width={20} />
                ) : (
                  <img
                    src="/assets/icons/eye-off.svg"
                    alt="eye-off"
                    width={20}
                  />
                )}
              </Box>
            </Box>
            {errors.verifyPassword && (
              <p style={{ color: "#F72323", paddingTop: "8px" }}>
                {errors.verifyPassword.message}
              </p>
            )}
          </div>
          <hr />
        </div>
      </div>
      <div className="bottom-buttons flex-between">
        <button className="btn back" onClick={() => navigate("/")}>
          취소
        </button>
        <button className="btn submit" onClick={handleSubmit(onSubmit)}>
          저장
        </button>
      </div>
    </div>
  );
}
