import React, { useEffect } from "react";
import BreadCrumb from "../../components/bread-crumb";
import { useState } from "react";
import Pagination from "../../components/pagination";
import ReferenceCard from "../../components/cards/ReferenceCard";
import "./mobile.scss";
import { referAnnoun } from "../../methods";
import { mainCallerToken } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const initialQuery = {
  size: 10,
  page: 1,
  type:'notification'
};

export default function ReferenceMobile({ pathname }) {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState(initialQuery);

  const { handleSubmit, control, register } = useForm({
    defaultValues: initialQuery,
  });

  useEffect(() => {
    getReference(query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getReference = async (query) => {
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
        <div className="page-content">
          <div className="container">
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
            <hr />
            <div className="reference-list">
              {jobs.content?.map((job, i) => (
                <ReferenceCard content={job} key={i} i={i} />
              ))}
            </div>
          </div>
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
  );
}
