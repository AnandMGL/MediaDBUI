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
  const [isSuccess, setIsSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [enCodeData, setEnCodeData] = useState();
  const [loader, setLoader] = useState(true);
  const [koPhoneNumber, setKoPhoneNumber] = useState("");

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
      setValue("address", address[0].address.addressLine1);
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
    const phoneNumber = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    if (phoneNumber.length <= 12) {
      setKoPhoneNumber(formattedPhoneNumber);
    }
  };

  const onSubmit = async (values) => {
    if (isError) return;
    setErrorMsg("");
    if (!image) {
      setIsError(true);
      setErrorMsg("Please select a image.");
      return;
    }
    setIsError(false);
    setIsSuccess(true);

    const userData = {
      ...values,
      profilePicture: "image",
      file: image,
      name: enCodeData?.name,
      gender: enCodeData?.gender,
      birthday: encDate,
      phoneNumber: koPhoneNumber.replace(/-/g, ""),
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
                          Valid File Type
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
                                {/* <input
                                  disabled
                                  className="field"
                                  placeholder="내용을 입력하여 주세요"
                                  defaultValue={enCodeData?.gender}
                                /> */}
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
                                    {errors.eduLevel.message} Please select a
                                    valid
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
                                  placeholder="내용을 입력하여 주세요"
                                  {...register("address", validAddress)}
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
                              placeholder="내용을 입력하여 주세요"
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
                                  placeholder="내용을 입력하여 주세요"
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
                                  value={koPhoneNumber}
                                  onChange={handleChangeNumber}
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
                                placeholder="내용을 입력하여 주세요"
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
                                placeholder="내용을 입력하여 주세요"
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
                                  placeholder="내용을 입력하여 주세요"
                                  type={hidePassword ? "text" : "password"}
                                  {...register("verifyPassword", {
                                    required: true,
                                    validate: (value) =>
                                      value === password ||
                                      "The passwords do not match",
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
                    <button className="btn back" onClick={() => setSection(3)}>
                      뒤로가기
                    </button>
                    <button
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
