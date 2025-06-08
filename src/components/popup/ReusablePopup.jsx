import React, { useState } from "react";
import "./index.scss";

const ReusablePopup = ({ title, content, onClose }) => {
    const [doNotShow, setDoNotShow] = useState(false);

    const handleClose = () => {
        console.log('doNotShow ==>', doNotShow);
        if (doNotShow === true) {
            const today = new Date().toDateString();
            localStorage.setItem("home_popup_dismissed", today);
        }
        onClose();
    };

    return (
        <div className="popup-box">
            <div className="popup-body">
                <button className="close-btn" onClick={handleClose}>×</button>
                <p className="popup-title">{title}</p>
                <div className="popup-content">{content}</div>
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

export default ReusablePopup;