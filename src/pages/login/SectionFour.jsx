import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  eduLevel,
  scriptUrl,
  validateDate,
  validName,
  valNumber,
  validSelect,
  emailValid,
  validAddress,
  validPassword,
  dateConverter,
} from "../../constants/constants";
import { createUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUserData } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { getCoordinatesByAddress } from "../../api/nominatium";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { toast } from "react-toastify";
import { FormInputDate } from "../../components/form-components/FormInputDate";
import { Box, TextField } from "@mui/material";

export default function SectionFour({ setSection }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const open = useDaumPostcodePopup(scriptUrl);

  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
    const {postalCode, setPostalCode} = useState("");


  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordShow = () => {
    setHidePassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    control,
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
      setValue("address", `${data.sido} ${data.sigungu} ${data.roadname} ${data.roadAddress.split(' ').slice(-1)[0]}`);
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

  const onSubmit = async (values) => {
    // if (isError) return;
    // setErrorMsg("");
    // if (!image) {
    //   setIsError(true);
    //   setErrorMsg("Please select a image.");
    //   return;
    // }
    setIsError(false);
    setIsSuccess(true);

    const userData = {
      ...values,
      profilePicture: "image",
      file: image,
      birthday: dateConverter(values.birthday),
      postalCode : postalCode,
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
    <div className="page-content-four">
      <h3 className="title">회원가입 정보 입력</h3>
      <hr />
      <div className="content-body flex-between">
        <label htmlFor="imageupload">
          <div className="image-box">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="uploader" />
            ) : null}
            <div className="camera flex-center">
              <img src="/assets/icons/camera.svg" alt="camera" />
            </div>
          </div>
          {isError && <p className="error-message">{errorMsg}</p>}
          {isSuccess && (
            <div className="success-text" style={{ color: "green" }}>
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
                    className="field"
                    placeholder="내용을 입력하여 주세요"
                    {...register("name", validName)}
                  />
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}
                </div>
              </div>
              <div className="field-box flex-center">
                <p className="label desktop">
                  성별<span>*</span>
                </p>
                <div className="d-flex w-100">
                  <div className="w-100">
                    <p className="label mobile">
                      성별<span>*</span>
                    </p>
                    <select
                      className="field first"
                      defaultValue="other"
                      {...register("gender", validSelect)}
                    >
                      <option value="선택">선택</option>
                      <option value="남자">남자</option>
                      <option value="여자">여자</option>
                    </select>
                    {errors.gender && (
                      <p className="error-message">{errors.gender.message}</p>
                    )}
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
                        {errors.eduLevel.message} 학력을 선택해주세요.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="field-box flex-center mobile-margin">
                <p className="label">
                  주소<span>*</span>
                </p>
                <div className="d-flex w-100">
                  <div className="w-100">
                    <input
                      disabled
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      {...register("address", validAddress)}
                    />
                    {errors.address && (
                      <p className="error-message">{errors.address.message} </p>
                    )}
                  </div>
                  <button className="btn search" onClick={handleClick}>
                    검색 11
                  </button>
                </div>
              </div>
              <div className="field-box flex-center">
                <p className="label m-0" />
                <input
                  className="field"
                  placeholder="상세주소를 입력하여 주세요"
                  {...register("addressDetails")}
                />
              </div>
              <div className="field-box flex-center">
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
                  {errors.password && (
                    <p className="error-message">  {errors.password.message}</p>
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
                  <FormInputDate
                    name="birthday"
                    control={control}
                    placeholder="YYYY/MM/DD"
                    rules={{ validate: validateDate }}
                    renderInput={(params) => (
                      <TextField
                        color="info"
                        size="small"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                  {errors.birthday && (
                    <p className="error-message">{errors.birthday.message}</p>
                  )}
                </div>
              </div>
              <div className="field-box flex-center">
                <p className="label label-mr">
                  휴대폰<span>*</span>
                </p>
                <div className="d-flex w-100">
                  <div className="w-100">
                    <input
                      className="field"
                      placeholder="010-2233-4455"
                      type="number"
                      {...register("phoneNumber", valNumber)}
                    />
                    {errors.phoneNumber && (
                      <p className="error-message">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="field-box flex-center">
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
                    <p className="error-message">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="field-box flex-center">
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
                    <p className="error-message">{errors.username.message}</p>
                  )}
                </div>
              </div>
              <div className="field-box flex-center">
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
                        required: '비밀번호를 입력해주세요.',
                        validate: (value) =>
                          value === password || "비밀번호가 일치하지 않습니다. ",
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
        <button className="btn submit" onClick={handleSubmit(onSubmit)}>
          회원가입
        </button>
      </div>
    </div>
  );
}
