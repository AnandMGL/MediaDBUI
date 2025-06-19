import React, { useEffect } from "react";
import { useState } from "react";
// import SimpleCheckbox from "../../components/inputs/SimpleCheckbox";
import { Link } from "react-router-dom";
// import SendApplications from "./SendApplications";
import { mainCallerToken } from "../../api/mainCaller";
import { imgURL } from "../../constants/constants";
import CustomModal from "../../components/modals/CustomModal";
import { PDFViewer } from "@react-pdf/renderer";
import { ContentOfPdf } from "../../components/certificate/RecruitmentCertificatePDF";
import { toast } from "react-toastify";
import {statusSwitcher} from '../../utils/methods';
import dayjs from "dayjs";

export default function SectionOne({ user }) {
  const [list, setList] = useState();
  const [modal, setModal] = useState({ isOpen: false });
  const [certificate, setCertificate] = useState();

  const certificateModalShow = () => {
    setModal({ isOpen: true });
  };

  const handleDownloadClick = (file) => {
    const downloadLink = imgURL + file;

    const newTab = window.open(downloadLink, "_blank");
    newTab.focus();
  };

  // const selectAll = (e) => {
  //   setList(list.map((item) => ({ ...item, isChecked: e.target.checked })));
  // };

  // const select = (e, id) => {
  //   setList(
  //     list.map((item) =>
  //       item.id === id ? { ...item, isChecked: e.target.checked } : item
  //     )
  //   );
  // };

  useEffect(() => {
    getJobApplyedList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJobApplyedList = async () => {
    try {
      await mainCallerToken(
        `jobApplications/getByEmployeeId/${user.id}`,
        "GET",
        null
      ).then((res) => {
        if (res.statusCode === 200) {
          setList(res.data);
        } else {
          toast.warning(res.message);
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  
  const getCareerStageById = async (item) => {
    try {
      await mainCallerToken(
        `careerStage/getById/${item.employeeId}`,
        "GET",
        null
      ).then((res) => {
       
        if (res.statusCode === 200) {
          const careerData = res.data;
          console.log('res.data 11 =======> ', JSON.stringify(careerData));
          console.log('item 11 =======> ', JSON.stringify(item));
           const combinedCertificate = {
            // item-оос авсан мэдээлэл
            id: item.id,
            name: item.name,
            title: item.title,
            customerName: item.customerName,
            applicationDate: item.createdDate,
            situation: item.situation,
            status: item.status,
            managerName: item.managerName,

            // careerStage API-с авсан мэдээлэл
            phoneNumber: careerData.phoneNumber,
            address: careerData.address,
            email: careerData.email,
            registration: careerData.registration,
            joiningDate: careerData.joiningDate,
            birthDate: careerData.birthday,
            dateFrom: careerData.dateFrom,
            dateUntil: careerData.dateUntil,
            detailedTasks: careerData.detailedTasks,
            department: careerData.department?.name,
            occupation: item.occupationName,
            dispatchCode: careerData.dispatchCode?.name
            
            
          };

          setCertificate(combinedCertificate);
        } else {
          toast.warning(res.message);
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  // const onClickJobDetail = (id) => {
  //   console.log(id);
  //   if (id) {
  //     return <Link to="/getById/9" />;
  //   }
  // };

  

  return (
    <>
      {modal.isOpen && (
        <CustomModal
          {...{ modal, setModal }}
          className="certificate"
          title="Certificate"
        >
          {certificate ? 
          <PDFViewer style={{ width: "100%", height: "80vh" }}>
            <ContentOfPdf data={certificate}/>
          </PDFViewer>
          : <div className="text-center">Loading...</div>}
        </CustomModal>
      )}
      <div className="page-content-one">
        <div className="status-list">
          <h5 className="title">지원 현황 </h5>
          <table>
            <thead>
              <tr>
                <th>
                  {/* <SimpleCheckbox
                    checked={list?.every((item) => item.isChecked)}
                    onChange={selectAll}
                  /> */}
                  번호
                </th>
                <td>신청 일자</td>
                <td>업체명</td>
                <td>공고명</td>
                <td>모집 상태</td>
                <td>첨부 파일</td>
                <td>진행 여부</td>
                <td>구직 증명원 신청</td>
              </tr>
            </thead>
            {list?.map((item, inx) => {
              
              return (
                <tbody key={item.id}>
                  <tr>
                    <th>
                      {/* <SimpleCheckbox
                      onChange={(e) => select(e, item.id)}
                      checked={item.isChecked || false}
                    /> */}
                      {inx + 1}
                    </th>
                    <td>{dayjs(item.createdDate).format("YYYY.MM.DD")}</td>
                    <td>{item.customerName}</td>
                    <td className="d-inline-block text-truncate cursor-pointer">
                      <Link to={`/job/${item.id}`}>{item.title}</Link>
                    </td>
                    <td>{item.situation === "ACTIVE" ? "진행중" : "마감"}</td>
                    <td
                      className="d-inline-block text-truncate cursor-pointer"
                      onClick={() => handleDownloadClick(item.attachment)}
                    >
                      <Link to="#">{item.attachment}</Link>
                    </td>
                    <td>{statusSwitcher(item.status) }</td>
                    <td onClick={() => {getCareerStageById(item); certificateModalShow()}}>
                      <Link to="#">저장</Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          {/* <div className="bottom-buttons flex-center">
            <button className="btn cancel-btn">지원 취소</button>
            <button className="btn apply-btn">구직증명원 신청</button>
          </div>
          {list?.some((item) => item.isChecked) ? (
            <SendApplications
              selected={list.filter((item) => item.isChecked)}
            />
          ) : null} */}
        </div>
      </div>
    </>
  );
}
