import React from "react";
import "./index.scss";
import BreadCrumb from "../../components/bread-crumb";
import Footer from "../../components/footer";
import KakaoSignUp from "./KakaoSignUp";

export default function SignUp() {
  return (
    <>
      <div className="login-page">
        <div className="container">
          <div className="mobile">
            <BreadCrumb />
          </div>
        </div>
        <div className="page-body">
          <div className="container">
            <div className="page-content">
              <KakaoSignUp />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
