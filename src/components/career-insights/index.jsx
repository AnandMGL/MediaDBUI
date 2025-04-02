import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper";
import InsightCard from "../cards/InsightCard";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";

export default function CareerInsights(props) {
  const [insights, setInsights] = useState([]);
  const [active, setActive] = useState(1);

  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    getRecruitmentList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const getRecruitmentList = async () => {
    let data = { jobCategory: active };
    try {
      await mainCallerWithOutToken(
        "home/recruitmentWithCategory",
        "POST",
        data
      ).then((result) => {
        if (result.statusCode === 200) {
          setInsights(result.data.content);
        } else {
          toast.warning(result.message);
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleMouseDown = (e) => {
    setIsDown(true);
    sliderRef.current.classList.add("active");
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    sliderRef.current.classList.remove("active");
  };

  const handleMouseUp = () => {
    setIsDown(false);
    sliderRef.current.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll-fast
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="career-insigts">
      <div className="career-top">
        <h3 className="title">커리어 인사이트</h3>
        <p className="swiper-pagination1 mobile" />
      </div>

      <div
        className="insights-menu-list"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {props.careerCategory?.map((menu) => {
          return (
            menu.title && (
              <button
                key={menu.id}
                className={`btn menu-btn ${menu.id === active ? "active" : ""}`}
                onClick={() => {
                  setActive(menu.id);
                }}
              >
                {menu.title}
              </button>
            )
          );
        })}
      </div>
      <div className="insights-body">
        <Swiper
          breakpoints={{
            768: {
              slidesPerView: 5.5,
              spaceBetween: 20,
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
          pagination={{
            type: "fraction",
            el: ".swiper-pagination1",
          }}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          modules={[Navigation, Pagination, A11y]}
          className="mySwiper"
        >
          {insights?.map((content) => {
            return (
              <SwiperSlide key={content.id}>
                <InsightCard content={content} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button className="prev-btn btn">
          <img src="/assets/icons/slide-next.svg" alt="prev" />
        </button>
        <button className="next-btn btn">
          <img src="/assets/icons/slide-next.svg" alt="next" />
        </button>
      </div>
    </div>
  );
}
