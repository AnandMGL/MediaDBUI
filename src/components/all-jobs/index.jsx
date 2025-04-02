import React, { useState } from "react";
import "./index.scss";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import JobsAsCalendar from "./JobsAsCalendar";
import JobsAsList from "./JobsAsList";
import Pagination from "../pagination";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { useApp } from "../../context/JobsFilterContext";
import useMediaQuery from "../../hooks/useMediaQuery";

const initialPage = {
  number: 1,
  size: 10,
  order: "ASC",
  sort: "",
  searchType: "",
  keyword: "",
  dateFrom: "",
  dateTo: "",
};

export default function AllJobs({ calendarJobList }) {
  const match = useMediaQuery(767);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(initialPage);

  const { searchValue } = useApp();

  useEffect(() => {
    getAllRecruitment(page);
  }, [page]);

  const getAllRecruitment = async (page) => {
    try {
      await mainCallerWithOutToken(
        "recruitment/getAllForUser",
        "POST",
        page
      ).then((res) => {
        setJobs(res.data);
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="all-jobs">
      <Tabs defaultIndex={0}>
        <TabList>
          <div className="tabs">
            <Tab>
              <div className="img">
                <img src="/assets/icons/grid.svg" alt="list" />
              </div>
              <span>목록으로 보기</span>
            </Tab>
            <Tab>
              <div className="img">
                <img src="/assets/icons/calendar.svg" alt="calendar" />
              </div>
              <span>캘린더로 보기</span>
            </Tab>
          </div>
          <h3 className="title">전체 채용 정보</h3>
        </TabList>
        <div className="all-jobs-body">
          <div className="filter"></div>

          <TabPanel>
            {match && <p style={{ marginBottom: "10px" }}>{jobs.length} 건</p>}

            {searchValue?.content?.length > 0 ? (
              <JobsAsList jobs={searchValue} />
            ) : !searchValue && jobs ? (
              <JobsAsList jobs={jobs} />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  검색한 결과가 없습니다.
                </Typography>
              </Box>
            )}

            {jobs && !searchValue && (
              <Pagination
                count={Math.ceil(jobs.totalElements / page.size)}
                size={page.number}
                handlePageClick={(e) => {
                  setPage({ ...page, number: +e.selected + 1 });
                }}
              />
            )}

            {searchValue && (
              <Pagination
                count={Math.ceil(searchValue.totalElements / page.size)}
                size={page.number}
                handlePageClick={(e) => {
                  setPage({ ...page, number: +e.selected + 1 });
                }}
              />
            )}
          </TabPanel>

          <TabPanel>
            <JobsAsCalendar jobs={jobs} calendarJobList={calendarJobList} />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}
