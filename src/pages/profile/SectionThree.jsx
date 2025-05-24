import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mainCallerToken } from "../../api/mainCaller";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PDFViewer } from "@react-pdf/renderer";
import { ContentOfPdf } from "../../components/certificate/CertificatePDF";
import { certificateType } from "../../constants/constants";
import CustomModal from "../../components/modals/CustomModal";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Pagination from "../../components/pagination";

const checkCertificate = {
  type: "증명서 선택해 주세요",
  purposeOfUsage: "예:은행제출용, 관공서제출용 등",
  insuranceDate:
    "원천징수영수증, 갑종근로영수증 발급 시 기재(예:2020년, 2021년",
};

const initialQuery = {
  size: 5,
  page: 1,
};

export default function SectionThree() {
  const user = useSelector((state) => state.user);
  const [applications, setApplications] = useState();
  const [certificate, setCertificate] = useState();
  const [modal, setModal] = useState({ isOpen: false });
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState();

  const certificateModalShow = () => {
    setModal({ isOpen: true });
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      type: "",
      purposeOfUsage: "",
      insuranceDate: "",
    },
  });

  useEffect(() => {
    getApplicantList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getApplicantList = async () => {
    const data = {
      id: user.id,
      ...query,
    };
    try {
      await mainCallerToken(`certificate/getById`, "POST", data).then(
        (result) => {
          if (result.statusCode === 200) {
            setApplications(result?.data);
            setPage(result.additionalData);
          } else {
            toast.warning(result.message);
          }
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const onSubmit = async (values) => {
    let checkField = true;

    for (const property in values) {
      if (property === "insuranceDate") {
        continue;
      }
      if (values[property] === "undefined" || values[property] === "") {
        toast.warning(checkCertificate[property]);
        checkField = false;
        break;
      }
    }

    const data = {
      userId: user.id,
      type: values.type,
      purposeOfUsage: values.purposeOfUsage,
      insuranceDate: values.insuranceDate,
    };

    if (checkField) {
      try {
        const res = await mainCallerToken("certificate/create", "POST", data);
        if (res.statusCode === 200) {
          toast.success(res.message);
          reset({ type: "", purposeOfUsage: "", insuranceDate: "" });
          getApplicantList();
        } else {
          toast.warning(res.message);
        }
      } catch (error) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      {modal.isOpen && (
        <CustomModal
          {...{ modal, setModal }}
          className="certificate"
          title="Certificate"
        >
          <PDFViewer style={{ width: "100%", height: "80vh" }}>
            <ContentOfPdf data={{ ...certificate }} />
          </PDFViewer>
        </CustomModal>
      )}

      <div className="page-content-three">
        <div className="application-list">
          <h5 className="title">신청 내역</h5>
          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>신청일자</td>
                <td>처리일자</td>
                <td>종류</td>
                <td>용도</td>
                <td>처리 상태</td>
              </tr>
            </thead>
            <tbody>
              {applications?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{dayjs(item.createdDate).format("YYYY.MM.DD")}</td>
                  <td>{dayjs(item.updatedDate).format("YYYY.MM.DD")}</td>
                  <td>{item.type}</td>
                  <td>{item.purposeOfUsage}</td>
                  {item.type !== "원천징수영수증(이메일 발급)" &&
                  item.type !== "갑종근로영수증(이메일 발급)" &&
                  item.status === "APPROVED" ? (
                    <td
                      className="certificate-approved"
                      onClick={() => {
                        setCertificate(item);
                        certificateModalShow();
                      }}
                    >
                      <Link>{item.status === "APPROVED" && "허가"}</Link>
                      
                    </td>
                  ) : (
                    <td>
                      {(item.status === "REQUESTED" && "대기") ||
                        (item.status === "DENIED" && "불가")}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          count={Math.ceil(page?.totalCount / query.size)}
          list={applications}
          size={query.number}
          handlePageClick={(e) => {
            setQuery({ ...query, number: +e.selected + 1 });
          }}
        />
        <h5 className="title">제증명 신청</h5>
        <div className="info-box">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="left-side">
                <h6 className="info-title">신청 방법 안내</h6>
                <ul>
                  <li>
                    재직자의 경우 <span>‘재직증명서’</span>만 신청할 수가
                    있습니다.
                  </li>
                  <li>
                    <span>‘경력증명서’</span>는 퇴사 이후 발급 신청이
                    가능합니다.
                  </li>
                  <li>
                    부정 발급자의 경우 모든 법적 책임은 발급 신청자 및
                    사용자에게 있습니다.
                  </li>
                  <li>
                    모든 입력 사항은 필수 기재입니다. 사용 용도는 구체적으로
                    기재하여 주시기 바랍니다.
                  </li>
                  <li>
                    2개 이상(재직, 원천 등) 제증명 발급을 원하시는 분은 각각
                    신청하여야 누락되지 않습니다.
                  </li>
                  <li>
                    E-mail, 연락처에 대한 정보 수정이 필요하신 경우 계정
                    정보에서 수정하여 주시기 바랍니다.
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="right-side">
                <div className="field-box flex-center">
                  <p className="label">발급신청자</p>
                  <input
                    disabled
                    className="field"
                    placeholder="홍길동"
                    // {...register("username")}
                    value={user.name}
                  />
                </div>
                <div className="field-box flex-center">
                  <p className="label">E-mail</p>
                  <input
                    // disabled
                    className="field"
                    placeholder="hong123@gmail.com"
                    // {...register("email")}
                    value={user.email}
                  />
                </div>
                <div className="field-box flex-center">
                  <p className="label">연락처</p>
                  <input
                    // disabled
                    className="field"
                    placeholder="010-2233-4455"
                    // {...register("phone")}
                    value={user.phoneNumber}
                  />
                </div>
                <div className="field-box flex-center">
                  <p className="label">증명서 종류</p>
                  <select className="field first" {...register("type")}>
                    {certificateType.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field-box flex-center">
                  <p className="label near">사용 용도</p>
                  <div>
                    <input
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      {...register("purposeOfUsage")}
                    />
                    <span className="warning">
                      (예:은행제출용, 관공서제출용 등)
                    </span>
                  </div>
                </div>
                <div className="field-box flex-center">
                  <p className="label near">원천징수발급연도</p>
                  <div>
                    <input
                      className="field"
                      placeholder="내용을 입력하여 주세요"
                      {...register("insuranceDate")}
                    />
                    <span className="warning">
                      * 원천징수영수증, 갑종근로영수증 발급 시 기재(예:2020년,
                      2021년)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <button className="btn apply-btn" onClick={handleSubmit(onSubmit)}>
            신청
          </button>
        </div>
      </div>
    </>
  );
}
