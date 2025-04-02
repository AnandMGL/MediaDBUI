import React from "react";
import "../login/index.scss";

import Footer from "../../components/footer";
import BreadCrumb from "../../components/bread-crumb";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigation = useNavigate();

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
              <div className="page-content-one page-content-three flex-center">
                <h3 className="title">오류 발생</h3>
                <h5 className="method">다시 등록해 주세요</h5>
                <hr />

                <Button
                  variant="contained"
                  sx={{ bgcolor: "#98A6AD", mb: "60px", color: "#fff", px: 3 }}
                  onClick={() => navigation("/login")}
                >
                  뒤로가기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
