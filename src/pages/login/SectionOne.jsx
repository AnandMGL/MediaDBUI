import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUserData } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../components/modals/CustomModal";
import UserNumber from "../../components/reset-user/UserNumber";
import UserNameResetModal from "../../components/reset-user/UserNameResetModal";
import UserResetPassword from "../../components/reset-user/UserResetPassword";
import UserCode from "../../components/reset-user/UserCode";
import { toast } from "react-toastify";

// const validations = { pattern: /^[A-Za-z]+$/i, required: true, maxLength: 20 };

const checkLogin = {
  username: "아이디를 입력해 주세요",
  password: "비밀번호를 입력하세요",
};

export default function SectionOne({ setSection }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userNumber, setUserNumber] = useState({ isOpen: false });
  const [userCodeReset, setUserCodeReset] = useState({ isOpen: false });
  const [userNameReset, setUserNameReset] = useState({ isOpen: false });
  const [resetPassword, setResetPassword] = useState({ isOpen: false });
  const [phoneNumber, setPhoneNumber] = useState();
  const [userName, setUserName] = useState();
  const [modalTitle, setModalTitle] = useState(1);

  const { register, handleSubmit } = useForm();

  const userNumberShow = () => {
    setUserNumber({ isOpen: true });
    setModalTitle(1);
  };

  const userNameShow = () => {
    setUserNumber({ isOpen: true });
    setModalTitle(2);
  };

  const UserNumberModalShow = () => {
    setUserNumber(false);
    setUserCodeReset({ isOpen: true });
  };

  const UserCodeModalShow = () => {
    setUserNameReset(false);
    setUserCodeReset(false);
    setResetPassword({ isOpen: true });
  };

  const UserNameResetShow = () => {
    setUserCodeReset(false);
    setUserNameReset({ isOpen: true });
  };

  const onSubmit = async (values) => {
    let checkField = true;
    for (const property in values) {
      if (values[property] === undefined || values[property] === "") {
        toast.warning(checkLogin[property]);
        checkField = false;
        break;
      }
    }
    if (checkField) {
      try {
        await authUser(values)
          .then((user) => {
            if (user.statusCode === 200) {
              dispatch(setUserData(user.data));
              navigate("/");
            }
          })
          .catch((error) => {
            toast.warning(error.message);
          });
      } catch (error) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="page-content-one flex-center">
      <div className="rocket-box">
        <img src="/assets/images/rocket.svg" alt="rocket" />
      </div>
      <h3 className="title">Login</h3>
      <div className="form-fields">
        <input
          className="field"
          placeholder="아이디"
          {...register("username")}
        />
        <input
          className="field"
          placeholder="비밀번호"
          type="password"
          {...register("password")}
          onKeyPress={handleKeyPress}
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
          <button className="find" onClick={userNumberShow}>
            아이디 찾기
          </button>
          <button className="find" onClick={userNameShow}>
            비밀번호 찾기
          </button>
        </div>
      </div>

      {userNumber.isOpen && (
        <CustomModal
          modal={{ isOpen: userNumber.isOpen }}
          setModal={setUserNumber}
          title={modalTitle === 1 ? "아이디 찾기" : "비밀번호 찾기"}
        >
          <UserNumber
            UserNumberModalShow={UserNumberModalShow}
            setPhoneNumber={setPhoneNumber}
          />
        </CustomModal>
      )}

      {userCodeReset.isOpen && (
        <CustomModal
          modal={{ isOpen: userCodeReset.isOpen }}
          setModal={setUserCodeReset}
          title={modalTitle === 1 ? "아이디 찾기" : "비밀번호 찾기"}
        >
          <UserCode
            UserCodeModalShow={UserCodeModalShow}
            phoneNumber={phoneNumber}
            setUserName={setUserName}
            UserNameResetShow={UserNameResetShow}
            buttonText={modalTitle === 1 ? "북구된 ID 보기" : "비밀번호 재설정"}
            // buttonText2={modalTitle === 1 ? "아이디 찾기" : "비밀번호 재설정"}
          />
        </CustomModal>
      )}

      {resetPassword.isOpen && (
        <CustomModal
          modal={{ isOpen: resetPassword.isOpen }}
          setModal={setResetPassword}
          title="비밀번호 찾기"
        >
          <UserResetPassword
            userName={userName}
            setResetPassword={setResetPassword}
          />
        </CustomModal>
      )}

      {userNameReset.isOpen && (
        <CustomModal
          modal={{ isOpen: userNameReset.isOpen }}
          setModal={setUserNameReset}
          title="비밀번호 찾기"
        >
          <UserNameResetModal userName={userName} />
        </CustomModal>
      )}
    </div>
  );
}
