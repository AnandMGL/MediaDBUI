import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "" }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <button className="back-button btn" onClick={goBack}>
      <img src="/assets/icons/arrow-left-circle.svg" alt="back" />
      <span>{label}</span>
    </button>
  );
}
