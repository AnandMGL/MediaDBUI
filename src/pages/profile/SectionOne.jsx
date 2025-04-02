import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainCallerFileWithToken } from "../../api/mainCaller";
import {
  eduLevel,
  // formatKoreanPhoneNumber,
  formatPhoneNumber,
  imgURL,
  scriptUrl,
} from "../../constants/constants";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { getCoordinatesByAddress } from "../../api/nominatium";
import { setUserData } from "../../actions/user";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

export default function SectionOne() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const open = useDaumPostcodePopup(scriptUrl);

  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [koPhoneNumber, setKoPhoneNumber] = useState("");

  const formatKoreanPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return ""; // Return empty string if phone number is not provided
    // Use regular expressions to insert hyphens at appropriate positions
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const newUserData = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    birthday: user.birthday,
    gender: user.gender,
    eduLevel: user.eduLevel,
    // phoneNumber: formatKoreanPhoneNumber(user.phoneNumber),
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
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: newUserData,
  });

  // Check password event
  const password = watch("password");

  const handleComplete = async (data) => {
    const address = await getCoordinatesByAddress(data.addressEnglish);
    if (address) {
      setValue("address", address[0].address.addressLine1);
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeNumber = (event) => {
    const phoneNumber = event.target.value;
    const formattedPhoneNumber = formatKoreanPhoneNumber(phoneNumber);

    if (phoneNumber.length <= 12) {
      setKoPhoneNumber(formattedPhoneNumber);
    }
  };

  useEffect(() => {
    setImage(user.profilePicture);
    setKoPhoneNumber(formatKoreanPhoneNumber(user.phoneNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append("phoneNumber", koPhoneNumber.replace(/-/g, ""));
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
                phoneNumber: koPhoneNumber.replace(/-/g, ""),
              })
            );
            toast.success(res.message);
          } else {
            toast.warning(res.message);
          }
        }
      );
      reset(setUserData());
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="page-content-one">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="content-body flex-between">
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
            <div className="row">
              <div className="col-md-12 col-lg-6 col-12">
                <div className="field-box flex-center">
                  <p className="label">이름(한글)</p>
                  <input
                    className="field"
                    disabled
                    placeholder="내용을 입력하여 주세요"
                    {...register("name")}
                  />
                </div>
                <div className="field-box flex-center">
                  <p className="label">성별</p>
                  <div className="d-flex w-100">
                    <select
                      className="field first"
                      {...register("gender")}
                      disabled
                    >
                      <option value="선택">선택</option>
                      <option value="남자">남자</option>
                      <option value="여자">여자</option>
                    </select>
                    <p className="label">최종학력</p>
                    <select
                      className="field"
                      disabled
                      {...register("eduLevel")}
                    >
                      {eduLevel.map((level, index) => (
                        <option value={level.value} key={index}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field-box flex-center">
                  <p className="label">주소</p>
                  <div className="d-flex w-100">
                    <input
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      {...register("address")}
                    />
                    <button className="btn search" onClick={handleClick}>
                      검색
                    </button>
                  </div>
                </div>
                <div className="field-box flex-center">
                  <p className="label m-0" />
                  <input
                    className="field"
                    placeholder="내용을 입력하여 주세요"
                    {...register("addressDetails")}
                  />
                </div>

                <div className="field-box flex-center">
                  <p className="label">입사 희망 지역</p>
                  <input
                    className="field"
                    placeholder="시,군,구 단위로 기재. 없을 시 ‘무관’으로 입력"
                    {...register("idealAddress")}
                  />
                </div>

                <div className="field-box flex-center margin-top">
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
              </div>

              <div className="col-md-12 col-lg-6 col-12">
                <div className="field-box flex-center">
                  <p className="label label-mr">생년월일</p>
                  <input
                    className="field"
                    placeholder="내용을 입력하여 주세요"
                    disabled
                    {...register("birthday")}
                  />
                </div>
                <div className="field-box desktop">
                  <p className="label label-mr">휴대폰</p>
                  <div className="d-flex w-100">
                    <input
                      type="text"
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      value={koPhoneNumber}
                      onChange={handleChangeNumber}
                    />
                  </div>
                </div>
                <div className="field-box flex-center">
                  <p className="label label-mr">이메일</p>
                  <input
                    disabled
                    className="field"
                    placeholder="내용을 입력하여 주세요"
                    {...register("email")}
                  />
                </div>
                <div className="field-box flex-center">
                  <p className="label label-mr">아이디</p>
                  <input
                    className="field"
                    disabled
                    placeholder="내용을 입력하여 주세요"
                    {...register("username")}
                  />
                </div>
                <div className="field-box flex-center">
                  <p className="label label-mr">비밀번호 확인</p>
                  <div className="w-100">
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
                          <img
                            src="/assets/icons/eye.svg"
                            alt="eye"
                            width={20}
                          />
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="buttom-buttons flex-between">
          <button className="btn back" onClick={() => navigate("/")}>
            취소
          </button>
          <button className="btn submit" type="submit">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
