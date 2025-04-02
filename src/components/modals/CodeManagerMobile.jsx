import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { pageSize } from "../../constants/constants";
import "./code.manager.mobile.scss";
import { mainCallerToken } from "../../api/mainCaller";
import Pagination from "../pagination";
import { toast } from "react-toastify";

const initialQuery = {
  number: 1,
  size: 20,
  searchType: "",
};

export default function CodeManagerMobile({
  setModal,
  modal,
  apiUrl,
  modalKey,
  contentKey,
}) {
  const [query, setQuery] = useState({
    ...initialQuery,

    keyword: modal.keyword,
  });
  const [users, setUsers] = useState();

  const handleSizeChange = (e) => {
    setQuery({ ...query, size: parseInt(e.target.value) });
  };

  const { register, handleSubmit } = useForm({
    defaultValues: modal,
  });

  const setContent = (content) => {
    setModal((prevModal) => ({
      ...prevModal,
      [modalKey]: false,
      [contentKey]: content,
    }));
  };

  const getList = async () => {
    try {
      await mainCallerToken(`${apiUrl}`, "POST", query).then((res) => {
        setUsers(res.data);
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const submit = (value) => {
    setQuery({ ...query, ...value });
  };

  useEffect(() => {
    getList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="code-manager">
      <div className="top-search">
        <div className="form-fields">
          <div className="title">검색</div>
          <div className="flex-center">
            <input
              className="search-input"
              placeholder="내용을 입력하여 주세요"
            />
            <button className="btn" onClick={handleSubmit(submit)}>
              검색
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex col-12">
        <p className="label">검색조건 초기화</p>
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

      <div className="content-body">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">코드</th>
                <th scope="col">이름</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.content?.slice(0, 150).map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr key={index}>
                      <th
                        scope="row"
                        id={labelId}
                        onClick={() => setContent(user)}
                      >
                        {index + 1}
                      </th>
                      <th
                        scope="row"
                        id={labelId}
                        onClick={() => setContent(user)}
                      >
                        {user.code}
                      </th>
                      <th
                        scope="row"
                        id={labelId}
                        onClick={() => setContent(user)}
                      >
                        {user.name}
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {users && (
        <div className="code-pagination">
          <Pagination
            count={Math.ceil(users.totalElements / query.size)}
            size={query.number}
            handlePageClick={(e) => {
              setQuery({ ...query, number: +e.selected + 1 });
            }}
          />
        </div>
      )}
    </div>
  );
}
