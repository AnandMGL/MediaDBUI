/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import Banner from "../banner";
import "./index.scss";
import { imgURL } from "../../constants/constants";
import { toast } from "react-toastify";

export default function Gallery() {
    const [bannerOne, setBannerOne] = useState();
    const [bannerTwo, setBannerTwo] = useState();
    const [bannerThree, setBannerThree] = useState();

    useEffect(() => {
        getBanner();
    }, []);

    const getBanner = async () => {
        try {
            await mainCallerWithOutToken("banner/get", "GET", null).then(
                (res) => {
                    if (res.statusCode === 200) {
                        res.data.map((item) => {
                            if (item.position === 3) {
                                setBannerThree(item);
                            }
                            if (item.position === 2) {
                                setBannerTwo(item);
                            }
                            if (item.position === 1) {
                                setBannerOne(item);
                            }
                        });
                    }
                }
            );
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="gallery">
            <div className="row">
                <div className="col-md-6 col-12">
                    <Banner
                        image={
                            (bannerOne?.bannerImg &&
                                imgURL + bannerOne?.bannerImg) ||
                            "/assets/images/banners/banner1.jpg"
                        }
                    />
                    <div className="content">
                        <p
                            className="subtitle "
                            style={{ color: bannerOne?.bannerHeaderColor }}
                        >
                            {bannerOne?.bannerHeaderText}
                        </p>
                        <h4 style={{ color: bannerOne?.bannerTitleColor }}>
                            {bannerOne?.bannerTitle}
                        </h4>
                        {bannerOne?.isButtonShow && (
                            <a
                                className="btn know-more"
                                href={bannerOne?.landingUrl}
                                target="/"
                            >
                                {bannerOne?.buttonText}
                            </a>
                        )}
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row">
                        <div className="col-6">
                            <Banner
                                image={
                                    (bannerTwo?.bannerImg &&
                                        imgURL + bannerTwo?.bannerImg) ||
                                    "/assets/images/banners/banner2.jpg"
                                }
                            />
                            <div className="content">
                                <p
                                    className="subtitle"
                                    style={{
                                        color: bannerTwo?.bannerHeaderColor,
                                    }}
                                >
                                    {bannerTwo?.bannerHeaderText}
                                </p>
                                <h5
                                    style={{
                                        color: bannerTwo?.bannerTitleColor,
                                    }}
                                >
                                    {bannerTwo?.bannerTitle}
                                </h5>
                                {bannerTwo?.isButtonShow && (
                                    <a
                                        className="btn know-more"
                                        href={bannerTwo?.landingUrl}
                                        target="/"
                                    >
                                        {bannerTwo?.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <Banner
                                image={
                                    (bannerThree?.bannerImg &&
                                        imgURL + bannerThree?.bannerImg) ||
                                    "/assets/images/banners/banner3.jpg"
                                }
                            />
                            <div className="content">
                                <p
                                    className="subtitle"
                                    style={{
                                        color: bannerThree?.bannerHeaderColor,
                                    }}
                                >
                                    {bannerThree?.bannerHeaderText}
                                </p>
                                <h5
                                    style={{
                                        color: bannerThree?.bannerTitleColor,
                                    }}
                                >
                                    {bannerThree?.bannerTitle}
                                </h5>
                                {bannerThree?.isButtonShow && (
                                    <a
                                        className="btn know-more"
                                        href={bannerThree?.landingUrl}
                                        target="/"
                                    >
                                        {bannerThree?.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
