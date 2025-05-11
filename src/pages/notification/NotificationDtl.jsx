import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../components/bread-crumb";
import BackButton from "../../components/buttons/BackButton";
import LinkButton from "../../components/buttons/link-button";
import "./detail.scss";
import ReferenceCard from "../../components/cards/ReferenceCard";
import { referAnnoun } from "../../methods";
import { mainCallerToken } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { imgURL } from "../../constants/constants";
import dayjs from "dayjs";

export default function NotificationDtl() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [notifData, setNotifData] = useState([]);

  // const handleDownloadClick = () => {
  //   const downloadLink = imgURL + notifData?.attachment;

  //   const newTab = window.open(downloadLink, "_blank");
  //   newTab.focus();
  // };

//   const handleDownloadClick = (fileName) => {
//     console.log('file -name- ----->' , fileName);
//     const downloadLink = imgURL + notifData?.attachment;

//     const link = document.createElement("a");
//     link.href = downloadLink;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// };

const handleDownloadClick = (fileName) => {
  const downloadLink = imgURL + notifData?.attachment;
  const link = document.createElement("a");
  link.href = downloadLink;
  link.download = fileName || "default.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  useEffect(() => {
    getNotifDetail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotifDetail = async () => {
    try {
      await mainCallerToken(`notification/getById/${id}`, "GET", null).then(
        (res) => {
          if (res.statusCode === 200) {
            setNotifData(res.data);
          }
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="reference-announce-detail">
      <div className="container">
        <BreadCrumb crumbName={"공지사항"} />
        <h5 className="title">
          {pathname === `/reference/${id}` ? "자료실" : "공지사항"}
        </h5>
      </div>
      <div className="page-body">
        <div className="container">
          <div className="page-content">
            <div className="content-top flex-between">
              <BackButton
                label={pathname === `/reference/${id}` ? "자료실" : "공지사항"}
              />
              <Link to={pathname} className="btn link-button">
                <img
                  src="/assets/icons/align-justify.svg"
                  alt="align-justify"
                />
                목록보기
              </Link>
            </div>
            <div className="desktop">
              <hr />
              <div className="content-box flex-between">
                <div className="left-side">
                  <div className="top flex-between">
                    <h5>제목</h5>
                    <h5>{notifData.title}</h5>
                  </div>
                  <div className="bottom flex-between">
                    <h5>첨부파일</h5>
                    <h5>
                      <Link to="#" onClick={()=>handleDownloadClick(notifData.attachmentName)}>
                        {notifData.attachmentName}
                      </Link>
                    </h5>
                  </div>
                </div>
                <div className="right-side">
                  <div className="top flex-between">
                    <h5>등록일</h5>
                    <h5>{dayjs(notifData.createdDate).format("YYYY.MM.DD")}</h5>
                  </div>
                  <div className="bottom flex-between">
                    <h5>조회</h5>
                    <h5>9999</h5>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="mobile">
              <ReferenceCard content={notifData} i={""} />
            </div>
            <div className="big-box">
              {notifData.notificationDetail &&
                parse(notifData.notificationDetail)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
