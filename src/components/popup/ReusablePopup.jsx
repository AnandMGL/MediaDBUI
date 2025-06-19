import React, { useState } from "react";
import "./index.scss";

// Reusable Popup Component
const ReusablePopup = ({ popupData, onClose }) => {
    const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
    const [doNotShow, setDoNotShow] = useState(false);

    const { title, imagePath , landingUrl, isToNewWindow} = popupData[currentPopupIndex]; // Get the current popup data (title and image path)

    const handleClose = () => {
        if (doNotShow === true) {
            const today = new Date().toDateString();
            localStorage.setItem("home_popup_dismissed", today);
        }
        onClose();
    };

    const nextPopup = () => {
        setCurrentPopupIndex((prevIndex) =>
            prevIndex === popupData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevPopup = () => {
        setCurrentPopupIndex((prevIndex) =>
            prevIndex === 0 ? popupData.length - 1 : prevIndex - 1
        );
    };

      const handleImageClick = () => {
        if(isToNewWindow)
            window.open(landingUrl, "_blank"); // Open the landing URL in a new tab
        else 
            window.location.href = landingUrl; // Navigate to the landing URL in the same tab
    };

    return (
        <div className="popup-box">
            <div className="popup-body">
                <button className="close-btn" onClick={handleClose}>
                    ×
                </button>
                <p className="popup-title">{title}</p>
                <div className="popup-content">
                    {/* Image Slider */}
                    <div className="image-slider">
                        <button className="prev-btn" onClick={prevPopup}>
                            ←
                        </button>
                        <img
                            src={`https://creeknriver-mediadbglobaldev.s3.ap-northeast-2.amazonaws.com/${imagePath}`}
                            alt="Popup"
                            width={300}
                            style={{
                                display: "block",
                                maxWidth: "100%",
                                height: "auto",
                            }}
                            onClick={handleImageClick} 
                        />
                        <button className="next-btn" onClick={nextPopup}>
                            →
                        </button>
                    </div>
                </div>
                <div>
                    <label className="dismiss-checkbox">
                        <input
                            type="checkbox"
                            checked={doNotShow}
                            onChange={() => setDoNotShow(!doNotShow)}
                        />
                        <span>오늘 하루 보지 않기</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

// Popup List Component
const PopupList = ({ popupDataList }) => {
    const [showPopup, setShowPopup] = useState(true);

    const closePopup = () => setShowPopup(false);

    return (
        <div>
            {showPopup && popupDataList && popupDataList.length > 0 && (
                <ReusablePopup
                    popupData={popupDataList} // Pass the full list of popup data
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default PopupList;
