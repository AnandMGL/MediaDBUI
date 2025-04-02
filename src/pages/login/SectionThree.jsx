import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mainCallerWithOutToken } from "../../api/mainCaller";

import { useNavigate } from "react-router-dom";

export default function SectionThree({ setSection }) {
  const [kakaoUrl, setKakaoUrl] = useState("");
  const router = useNavigate();

  useEffect(() => {}, []);

  const onSpringBoot = async () => {
    try {
      const result = await mainCallerWithOutToken("home/kakaoLogin", "GET");
      window.location.replace(result);
      router(result);
      setKakaoUrl(result);
    } catch (error) {
      console.log("error ---> ", error);
    }
  };

  return (
    <div className="page-content-one page-content-three flex-center">
      <h3 className="title">회원가입</h3>
      <h5 className="method">회원가입 방법 선택</h5>
      <button className="btn submit" onClick={() => setSection(4)}>
        일반 회원가입
      </button>

      <button className="btn kakao" onClick={() => onSpringBoot()}>
        <Link
        // to={kakaoUrl}
        >
          <img src="/assets/icons/message.svg" alt="kakao" />
          카카오로 회원가입
        </Link>
      </button>
    </div>
  );
}
