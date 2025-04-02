import React, { useEffect } from "react";
import { debounce } from "../../methods";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/JobsFilterContext";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";

export default function SearchField({ setActiveMenu }) {
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

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -60;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  function searchFn(value) {
    debounce(
      () => {
        getAllJobsFilter(value);
      },
      "inputQuery",
      500
    );
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate("/#search");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setActiveMenu({ isOpen: false });
        const targetElement = document.getElementById("search");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-filed">
      <HashLink to="/#search" scroll={scrollWithOffset}>
        <img
          src="/assets/icons/search-2.svg"
          alt="search"
          onClick={() => setActiveMenu({ isOpen: false })}
        />
      </HashLink>
      <input
        type="search"
        placeholder={t("검색어를 입력해주세요....")}
        onChange={(e) => {
          searchFn(e.target.value.trim());
        }}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
