import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToChoosen } from "../../../actions/choosen";
import { useNavigate } from "react-router-dom";

export default function BookmarkButton({ content }) {
  const choosens = useSelector((state) => state.choosenList);
  const dispatch = useDispatch();
  const router = useNavigate();

  return (
    <button
      className={`bookmark-btn btn ${
        choosens.find((choice) => choice.id === content?.id) ? "active" : ""
      }`}
      onClick={() => {
        dispatch(addToChoosen(content));
        router("/recruitment");
      }}
    >
      스크랩
    </button>
  );
}
