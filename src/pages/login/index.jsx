import React from "react";
import "./index.scss";
import LoginContentSwitcher from "./LoginContentSwitcher";
import BreadCrumb from "../../components/bread-crumb";
import Footer from "../../components/footer";

export default function Login() {
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
              <LoginContentSwitcher />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
