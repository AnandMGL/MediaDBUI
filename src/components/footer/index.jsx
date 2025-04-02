import React from "react";
import "./index.scss";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import SocialMedia from "../social-media";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function Footer() {
  const match = useMediaQuery(767);
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="row">
            <div className="col-md-3 left">
              <Logo logo="/assets/images/creek-river.svg" />
              <div className="">
                <p>
                  (주)크릭앤리버엔터테인먼트 / 대표이사 김민철 <br />
                  사업자 등록번호 : 332-87-00567 <br />
                  통신판매업신고 : 2017-서울영등포-0048 <br />
                  직업정보제공사업신고 : J1204020170003
                </p>
                <a href="#">
                  <img src="/assets/icons/phone.svg" alt="phone" />

                  <span>
                    Tel: (82) 02-761-8901 <br /> FAX: (82) 02-761-8907
                  </span>
                </a>
              </div>
            </div>
            <div className="offset-md-1 col-md-2 middle">
              <h5>회사소개</h5>
              <Link to="https://www.crikorea.com:444/home/about/philosophy.html">
                기업이념
              </Link>
              <Link to="https://www.crikorea.com:444/home/about/ci.html">
                CI소개
              </Link>
              <Link to="https://www.crikorea.com:444/home/about/history.html">
                주요연혁
              </Link>
              <Link to="https://www.crikorea.com:444/home/about/location.html">
                오시는길/약도
              </Link>
            </div>
            <div className="col-md-2 middle">
              <h5>사업분야</h5>
              <Link to="https://www.crikorea.com:444/home/business/hr.html">
                HR/헤드헌팅
              </Link>
              <Link to="https://www.crikorea.com:444/home/works/works_list.html">
                웹툰, 웹소설, 전자출판
              </Link>
              <Link to="https://www.crikorea.com:444/home/works/movie_list.html">
                영화, 드라마
              </Link>
              <Link to="https://www.crikorea.com:444/home/works/publish_list.html">
                출판저작권
              </Link>
            </div>
            <div className="col-md-2 middle">
              <h5>방송취업정보</h5>
              <Link to="https://blog.naver.com/PostList.naver?blogId=crient5&categoryNo=28&from=postList&parentCategoryNo=28">
                현직 인터뷰
              </Link>
              <Link to="https://blog.naver.com/PostList.naver?blogId=crient5&categoryNo=13&from=postList&parentCategoryNo=13">
                취업정보
              </Link>
              <Link to="https://blog.naver.com/PostList.naver?blogId=crient5&categoryNo=26&from=postList&parentCategoryNo=26">
                직무소개
              </Link>
              <Link to="https://blog.naver.com/PostList.naver?blogId=crient5&categoryNo=34&from=postList&parentCategoryNo=34">
                방송소식
              </Link>
            </div>
            <div className="col-md-2 right">
              <h5>SNS</h5>
              <SocialMedia />
              {/* <span>© 2023 TailGrids.</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
