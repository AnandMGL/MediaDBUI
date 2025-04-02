import React from "react";
import "./index.scss";

export default function UserNameResetModal({ userName }) {
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

        <hr />
        {/* <div className="helper-buttons flex-center">
          <button className="btn">본인인증 진행하기</button>
        </div> */}
      </div>
    </div>
  );
}
