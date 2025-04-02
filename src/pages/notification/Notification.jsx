import React, { useEffect, useState } from "react";
import Pagination from "../../components/pagination";
import BreadCrumb from "../../components/bread-crumb";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { referAnnoun } from "../../methods";
import { mainCallerToken } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const initialQuery = {
  size: 10,
  page: 1,
  type:'announcement'
};

export default function Notification({ pathname }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState(initialQuery);

  const { handleSubmit, control, register } = useForm({
    defaultValues: initialQuery,
  });

  useEffect(() => {
    getNotification(query);
    console.log('notification 22 ----------> ');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getNotification = async (query) => {
    try {
      await mainCallerToken("notification", "POST", query).then((res) => {
        if (res.statusCode === 200) {
          setJobs(res.data);
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const submit = async (values) => {
    setQuery({ ...query, ...values });
  };

  return (
    <div className="reference-page">
      <div className="container">
        <BreadCrumb crumbName={"공지사항"} />
        <h5 className="title">{referAnnoun(pathname)}</h5>
      </div>
      <div className="page-body">
        <div className="container">
          <div className="page-content">
            <div className="search flex-between">
              <p className="label">검색</p>
              <input
                {...register("title")}
                control={control}
                className="field"
                placeholder="내용을 입력하여 주세요"
              />
              <button onClick={handleSubmit(submit)} className="btn search">
                검색
              </button>
            </div>
            <div className="reference-list">
              <table>
                <thead>
                  <tr>
                    <td>번호</td>
                    <td>등록일</td>
                    <td>제목</td>
                    <td>첨부 파일</td>
                    <td>조회</td>
                  </tr>
                </thead>
                <tbody>
                  {jobs.content?.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => navigate(`${pathname}/${item.id}`)}
                    >
                      <td>{index + 1}</td>
                      <td>{dayjs(item.createdDate).format("YYYY.MM.DD")}</td>
                      <td>{item.title}</td>
                      <td>
                        <Link to="#">{item.attachmentName}</Link>
                      </td>
                      <td>{"9999"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                count={Math.ceil(jobs.totalElements / query.size)}
                size={query.number}
                handlePageClick={(e) => {
                  setQuery({ ...query, number: +e.selected + 1 });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
