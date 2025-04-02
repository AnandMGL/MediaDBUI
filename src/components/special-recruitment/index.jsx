import React, { useEffect, useState } from "react";
import "./index.scss";
import RecruitmentCard from "../cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Grid, Pagination } from "swiper";
// import { list } from "../../constants/constants";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";

export default function SpecialRecruitment() {
  const [recruitmentData, setRecruitmentData] = useState();

  const getRecruitment = async () => {
    try {
      await mainCallerWithOutToken("home/specialRecruitment", "GET", null).then(
        (res) => {
          if (res.statusCode === 200) {
            setRecruitmentData(res.data);
          } else {
            toast.warning(res.message);
          }
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    getRecruitment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="special-recruitment">
      <div className="special-top">
        <h3 className="title">스페셜 채용관</h3>
        <p className="swiper-pagination"></p>
      </div>
      <div className="recruitment-list">
        <Swiper
          grid={{ rows: 2, fill: "row" }}
          pagination={{
            type: "fraction",
            el: ".swiper-pagination",
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            250: {
              slidesPerView: 2.1,
              spaceBetween: 8,
            },
            default: {
              slidesPerView: 1.1,
              spaceBetween: 4,
            },
          }}
          modules={[Grid, Pagination, A11y]}
          className="mySwiper"
        >
          {recruitmentData &&
            recruitmentData.content?.map((recruitment, i) => {
              return (
                <SwiperSlide key={i}>
                  <RecruitmentCard content={recruitment} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
