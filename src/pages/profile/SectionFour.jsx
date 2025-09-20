import React from "react";
import { useForm } from "react-hook-form";
import Pagination from "../../components/pagination";
import { useState } from "react";
import { mainCallerToken } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { useEffect } from "react";
import dayjs from "dayjs";
import { order, pageSize } from "../../constants/constants";

const initialQuery = {
  size: 10,
  page: 1,
  order: "DESC",
};

function formatNumber(num) {
  return num.toLocaleString();
}

export default function SectionFour({ user }) {
  const [jobs, setJobs] = useState();
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState();

  const { register } = useForm({
    defaultValues: {},
  });

  const handleSizeChange = (e) => {
    setQuery({ ...query, size: parseInt(e.target.value) });
  };

  const handleOrderChange = (e) => {
    console.log(e.target.value);
    setQuery({ ...query, order: e.target.value });
  };

  useEffect(() => {
    getSalaryHistory(query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getSalaryHistory = async (query) => {
    try {
      await mainCallerToken("salary/getUserSalaryByMonts", "POST", {
        id: user.id,
        ...query,
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
      <div className="application-list">
        <div className="flex-between">
          <h5 className="title">급여 내역</h5>
          <div className="flex-between">
            <select
              className="field"
              {...register("order")}
              onChange={handleOrderChange}
              value={query.order}
            >
              {order.map((item, i) => {
                return (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <select
              className="field"
              {...register("name")}
              onChange={handleSizeChange}
              value={query.size}
            >
              {pageSize.map((item, i) => {
                return (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>번호</td>
              <td>급여년월</td>
              <td>근무지</td>
              <td>지급 총계</td>
              <td>공제 총계</td>
              <td>차인지급액</td>
              <td>지급일</td>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{dayjs(item.dateString).format("YYYY.MM")}</td>
                <td>{item.companyName}</td>
                <td>{formatNumber(item.sum)}</td>
                <td>{formatNumber(item.sub)}</td>
                <td>{formatNumber(item.sum - item.sub)}</td>
                <td>{dayjs(item.createdDate).format("YYYY.MM.DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(page?.totalCount / query.size)}
          size={query.number}
          handlePageClick={(e) => {
            setQuery({ ...query, number: +e.selected + 1 });
          }}
        />
      </div>
    </div>
  );
}
