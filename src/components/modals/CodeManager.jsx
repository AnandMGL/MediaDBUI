import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { pageSize } from "../../constants/constants";
import "./code.manager.scss";
import { mainCallerToken } from "../../api/mainCaller";
import Pagination from "../pagination";
import { toast } from "react-toastify";

const initialQuery = {
  number: 1,
  size: 20,
  searchType: "",
};

export default function CodeManager({
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
        <div className="title">검색</div>
        <input className="search-input" placeholder="내용을 입력하여 주세요" />
        <button className="btn" onClick={handleSubmit(submit)}>
          검색
        </button>
        <div className="title">검색조건 초기화</div>
      </div>
      <div style={{ margin: "30px 0" }} />
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
      <div className="content-body">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>코드</td>
                <td>이름</td>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.content?.slice(0, 20).map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr key={index}>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {index + 1}
                      </td>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {user.code}
                      </td>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {user.name}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>코드</td>
                <td>이름</td>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.content.length > 20 &&
                users.content.slice(20, 40).map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr key={index}>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {index + 21}
                      </td>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {user.code}
                      </td>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {user.name}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>코드</td>
                <td>이름</td>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.content.length > 40 &&
                users.content.slice(41).map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr key={index}>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {index + 41}
                      </td>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {user.code}
                      </td>
                      <td id={labelId} onClick={() => setContent(user)}>
                        {user.name}
                      </td>
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
