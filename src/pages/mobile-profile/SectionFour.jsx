import React, { useEffect } from "react";
import Pagination from "../../components/pagination";
import { useState } from "react";
import SalaryCard from "../../components/cards/SalaryCard";
import { mainCallerToken } from "../../api/mainCaller";
import { toast } from "react-toastify";

const initialQuery = {
  size: 10,
  page: 1,
};
export default function SectionFour({ user }) {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState();

  useEffect(() => {
    getSalaryHistory(query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getSalaryHistory = async (query) => {
    try {
      await mainCallerToken("salary/getUserSalaryByMonts", "POST", {
        id: user.id,
        query,
      }).then((res) => {
        if (res.statusCode === 200) {
          setJobs(res.data);
          setPage(res.additionalData);
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="page-content-four">
      <h4 className="title">급여 명세서</h4>
      <div className="application-list">
        <h5 className="title">급여 내역</h5>
        {jobs.map((card, i) => (
          <SalaryCard content={card} key={i} i={i} />
        ))}
        <Pagination
          count={Math.ceil(page?.totalCount / query.size)}
          list={jobs}
          size={query.number}
          handlePageClick={(e) => {
            setQuery({ ...query, number: +e.selected + 1 });
          }}
        />
      </div>
    </div>
  );
}
