import React from "react";
import { debounce } from "../../methods";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./index.scss";

import { useApp } from "../../context/JobsFilterContext";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";

export default function HashSearchField({ setHashIcon }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setSearchValue } = useApp();

  const getAllJobsFilter = async (value) => {
    const data = {
      keyword: value,
    };
    try {
      await mainCallerWithOutToken("home/recruitmentList", "POST", data).then(
        (res) => {
          setSearchValue(res.data);
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  function searchFn(keyword) {
    debounce(
      () => {
        getAllJobsFilter(keyword);
      },
      "inputQuery",
      500
    );
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setHashIcon(false);
      navigate("/#search");
    }
  };

  return (
    <div className="hash-search-filed">
      <img src="/assets/icons/search-2.svg" alt="search" />
      <input
        type="search"
        placeholder={t("검색어를 입력하여 주세요")}
        onKeyDown={handleKeyPress}
        onChange={(e) => {
          searchFn(e.target.value.trim());
        }}
      />
    </div>
  );
}
