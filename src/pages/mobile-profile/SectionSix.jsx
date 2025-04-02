import React, { useEffect, useState } from "react";
// import SimpleCheckbox from "../../components/inputs/SimpleCheckbox";
// import SendApplications from "../recruitment/SendApplications";
// import CustomModal from "../../components/modals/CustomModal";
import StatusCard from "../../components/cards/StatusCard";
import Pagination from "../../components/pagination";
import "../../components/modals/sand.applications.modal.scss";
import { mainCallerToken } from "../../api/mainCaller";
import RecruitmentCertificatePDF from "../../components/certificate/RecruitmentCertificatePDF";
import { toast } from "react-toastify";

const initialQuery = {
  size: 10,
  page: 1,
};
export default function SectionSix({ user }) {
  const [list, setList] = useState([]);
  // const [modal, setModal] = useState({ isOpen: false });
  const [certificate, setCertificate] = useState();
  const [certificateModal, setCertificateModal] = useState(false);
  const [query, setQuery] = useState(initialQuery);

  // const selectAll = (e) => {
  //   setList(list.map((item) => ({ ...item, isChecked: e.target.checked })));
  // };

  const select = (e, id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, isChecked: e.target.checked } : item
      )
    );
  };

  // const openModal = () => {
  //   if (list.some((item) => item.isChecked)) return setModal({ isOpen: true });
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

  return (
    <>
      <RecruitmentCertificatePDF
        user={user}
        data={certificate}
        modal={certificateModal}
        setModal={setCertificateModal}
      />
      <div className="page-content-six">
        <h4 className="title">지원 현황 </h4>
        <div className="application-list">
          <div className="list-top flex-between">
            {/* <SimpleCheckbox
              checked={list.every((item) => item.isChecked)}
              onChange={selectAll}
              label="모두 선택"
            />
            <div className="buttons flex-center">
              <button className="btn cancel-btn">지원 취소</button>
              <button
                className="btn apply-btn"
                onClick={openModal}
                disabled={!list.some((item) => item.isChecked)}
              >
                구직증명원 신청
              </button>
            </div> */}
          </div>
          {list.map((item, index) => (
            <StatusCard
              content={item}
              key={index}
              select={select}
              setModal={setCertificateModal}
              setCertificate={setCertificate}
            />
          ))}
          <Pagination
            list={list}
            size={1}
            handlePageClick={(e) => {
              setQuery({ ...query, page: +e.selected + 1 });
            }}
          />
          {/* <CustomModal
            modal={modal}
            setModal={setModal}
            title="구직증명원 신청"
            className="send-appliaction"
            children={
              <SendApplications
                selected={list.filter((item) => item.isChecked)}
              />
            }
          /> */}
        </div>
      </div>
    </>
  );
}
