import React from "react";

export default function ActionSteps({ activeStep }) {
  return (
    <div className="steps flex-center">
      <span className={`step flex-center ${activeStep >= 1 ? "active" : ""}`}>
        1
      </span>
      <span className={`step flex-center ${activeStep >= 2 ? "active" : ""}`}>
        2
      </span>
      <span className={`step flex-center ${activeStep >= 3 ? "active" : ""}`}>
        3
      </span>
      <span className={`step flex-center ${activeStep >= 4 ? "active" : ""}`}>
        4
      </span>
      <span className={`step flex-center ${activeStep >= 5 ? "active" : ""}`}>
        5
      </span>
    </div>
  );
}
