import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.scss";
import {
  eduLevel,
  scriptUrl,
  validName,
  valNumber,
  validSelect,
  emailValid,
  validAddress,
  validPassword,
  formatDateUser,
  formatPhoneNumber,
  validPhoneNumber,
} from "../../constants/constants";
import { createUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUserData } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { getCoordinatesByAddress } from "../../api/nominatium";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import Footer from "../../components/footer";

export default function PassSignUp({ setSection }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const open = useDaumPostcodePopup(scriptUrl);

  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [enCodeData, setEnCodeData] = useState();
  const [loader, setLoader] = useState(false);
  const [koPhoneNumber, setKoPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordShow = () => {
    setHidePassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    window.onmessage = function (e) {
      if (!(e.data.name === undefined)) {
        setEnCodeData(e.data);
        setLoader(false);
      }
    };
  }, [enCodeData]);

  const encDate = formatDateUser(enCodeData?.birthDate);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  // Check password event
  const password = watch("password");

  const handleComplete = async (data) => {
    const address = await getCoordinatesByAddress(data.addressEnglish);
    if (address) {
      setValue("address", `${data.roadAddress} ${data.buildingName ? `(${data.buildingName})` : ""}`);
      setPostalCode(data.zonecode);
    }
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setIsSuccess(false);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile?.type)) {
      setIsError(true);
      setErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
      return;
    }

    setIsError(false);
    setImage(selectedFile);
  };

  const handleChangeNumber = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const trimmed = input.slice(0, 11);
  
    setKoPhoneNumber(formatPhoneNumber(trimmed));
  };
  

  const onSubmit = async (values) => {

 

    if (isError) return;
    setErrorMsg("");

 
    setIsError(false);
    setIsSuccess(true);

    const userData = {
      ...values,
      profilePicture: "image",
      file: image || null,
      name: enCodeData?.name,
      gender: enCodeData?.gender,
      birthday: encDate,
      phoneNumber: koPhoneNumber.replace(/-/g, ""),
      postalCode: postalCode,
    };
    try {
      const res = await createUser(userData);
      if (res.statusCode === 200) {
        dispatch(
          setUserData({
            ...res.data,
            profilePicture: res.data.profilePicture,
          })
        );
        toast.success(res.message);
        navigation("/");
        reset();
      } else {
        toast.warning(res.message);
      }
    } catch (error) {
      toast.warning(error.response?.data.message);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="page-body">
          <div className="container">
            <div className="page-content-pass">
              {loader ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 520,
                  }}
                >
                  <Typography
                    sx={{ pb: "60px", color: "#3A3A3A", fontSize: "28px" }}
                  >
                    로딩중
                  </Typography>
                  <CircularProgress color="success" />
                </Box>
              ) : (
                <div className="page-content-four">
                  <h3 className="title">회원가입 정보 입력</h3>
                  <hr />

                  <div className="content-body flex-between">
                    <label htmlFor="imageupload">
                      <div className="image-box">
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="uploader"
                          />
                        ) : null}
                        <div className="camera flex-center">
                          <img src="/assets/icons/camera.svg" alt="camera" />
                        </div>
                      </div>
                      {isError && <p className="error-message">{errorMsg}</p>}
                      {isSuccess && (
                        <div
                          className="success-text"
                          style={{ color: "green" }}
                        >
                          {/* Valid File Type */}
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        id="imageupload"
                        style={{ display: "none" }}
                        onChange={handleUploadImage}
                      />
                    </label>

                    <div className="form-fields">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="field-box flex-center">
                            <p className="label">
                              이름(한글)<span>*</span>
                            </p>
                            <div className="w-100">
                              <input
                                disabled
                                className="field"
                                placeholder="내용을 입력하여 주세요"
                                defaultValue={enCodeData?.name}
                              />
                            </div>
                          </div>
                          <div className="field-box flex-center alignItemBase">
                            <p className="label desktop ">
                              성별<span>*</span>
                            </p>
                            <div className="d-flex w-100">
                              <div className="w-100">
                                <p className="label mobile">
                                  성별<span>*</span>
                                </p>
                                <select
                                  className="field first"
                                  defaultValue={enCodeData?.gender}
                                  disabled
                                >
                                  <option value={enCodeData?.gender}>
                                    {enCodeData?.gender}
                                  </option>
                                </select>
                              </div>

                              <p className="label label-padding desktop">
                                최종학력<span>*</span>
                              </p>
                              <div className="w-100">
                                <p className="label label-padding mobile">
                                  최종학력<span>*</span>
                                </p>
                                <select
                                  className="field"
                                  {...register("eduLevel", validSelect)}
                                >
                                  {eduLevel.map((level, index) => (
                                    <option value={level.value} key={index}>
                                      {level.label}
                                    </option>
                                  ))}
                                </select>
                                {errors.eduLevel && (
                                  <p className="error-message">
                                    {errors.eduLevel.message} 최종학력을 선택해 주세요
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="field-box flex-center mobile-margin alignItemBase">
                            <p className="label">
                              주소<span>*</span>
                            </p>
                            <div className="d-flex w-100">
                              <div className="w-100">
                                <input
                                  className="field"
                                  placeholder="주소를 입력해 주세요"
                                  {...register("address", validAddress)}
                                  value={watch("address")}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length > 150) {
                                      setErrorMsg("최대 길이에 대한 사용자 정의 오류 메시지 주소");
                                    } else {
                                      setErrorMsg("");
                                    }
                                    setValue("address", value);
                                  }}
                                />
                                {errors.address && (
                                  <p className="error-message">
                                    {errors.address.message}
                                  </p>
                                )}
                              </div>
                              <button
                                className="btn search"
                                onClick={handleClick}
                              >
                                검색
                              </button>
                            </div>
                          </div>
                          <div className="field-box flex-center">
                            <p className="label m-0" />
                            <input
                              className="field"
                              placeholder="상세 주소를 입력해 주세요"
                              {...register("addressDetails")}
                            />
                          </div>
                          <div className="field-box flex-center alignItemBase">
                            <p className="label">
                              비밀번호<span>*</span>
                            </p>
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
                                  type={showPassword ? "text" : "password"}
                                  placeholder="10자 이상 비밀번호를 입력해 주세요"
                                  {...register("password", validPassword)}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    paddingRight: "8px",
                                  }}
                                  onClick={handleTogglePassword}
                                >
                                  {showPassword ? (
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
                              {errors.password && (
                                <p className="error-message">
                                  {errors.password.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="field-box flex-center">
                            <p className="label label-mr">
                              생년월일<span>*</span>
                            </p>
                            <div className="w-100">
                              <input
                                disabled
                                className="field"
                                placeholder="YYYY-MM-DD"
                                type="text"
                                defaultValue={encDate}
                              />
                            </div>
                          </div>
                          <div className="field-box flex-center">
                            <p className="label label-mr">
                              휴대폰<span>*</span>
                            </p>
                            <div className="d-flex w-100">
                              <div className="w-100">
                                {/* <input
                                  className="field"
                                  placeholder="010-2233-4455"
                                  type="number"
                                  {...register("phoneNumber", valNumber)}
                                />
                                {errors.phoneNumber && (
                                  <p className="error-message">
                                    {errors.phoneNumber.message}
                                  </p>
                                )} */}
                                <input
                                  className="field"
                                  type="text"
                                  placeholder="010-2233-4455"
                                  name="phoneNumber"
                                  {...register("phoneNumber", validPhoneNumber)}
                                  value={koPhoneNumber}
                                  onChange={handleChangeNumber}
                                  disabled={false}
                                />
                                {errors.phoneNumber && (
                                  <p className="error-message">
                                    {errors.phoneNumber.message}
                                  </p>
                                )}
                               
                              </div>
                            </div>
                          </div>
                          <div className="field-box flex-center alignItemBase">
                            <p className="label label-mr">
                              이메일<span>*</span>
                            </p>
                            <div className="w-100">
                              <input
                                type="email"
                                className="field"
                                placeholder="이메일을 입력해 주세요"
                                {...register("email", emailValid)}
                              />
                              {errors.email && (
                                <p className="error-message">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="field-box flex-center alignItemBase">
                            <p className="label label-mr">
                              아이디<span>*</span>
                            </p>
                            <div className="w-100">
                              <input
                                className="field"
                                placeholder="아이디를 입력해주세요"
                                {...register("username", validName)}
                              />
                              {errors.username && (
                                <p className="error-message">
                                  {errors.username.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="field-box flex-center alignItemBase">
                            <p className="label label-mr">
                              비밀번호 확인<span>*</span>
                            </p>
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
                                  placeholder="10자 이상 비밀번호를 입력해 주세요"
                                  type={hidePassword ? "text" : "password"}
                                  {...register("verifyPassword", {
                                    required: true,
                                    validate: (value) =>
                                      value === password ||
                                      "비밀번호가 일치하지 않습니다",
                                  })}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    paddingRight: "8px",
                                  }}
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
                                <p className="error-message">
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
                    <button
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                     
                        padding: '12px 20px'
                      }} 
                    className="btn back" onClick={() => setSection(3)}>
                      뒤로가기
                    </button>
                    <button
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                         
                        padding: '12px 20px'
                      }}
                      className="btn submit"
                      onClick={handleSubmit(onSubmit)}
                    >
                      회원가입
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
