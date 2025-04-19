import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToChoosen } from "../../../actions/choosen";

export default function FavouriteButton({ content }) {
  const choosens = useSelector((state) => state.choosenList);
  const dispatch = useDispatch();

  const favourite = (e) => {
    e.preventDefault();
    dispatch(addToChoosen(content));
  };
  const isActive = choosens.find((choice) => choice.id === content.id);

  return (
    <button
      className={`favourite-btn btn ${isActive ? "active" : ""}`}
      onClick={favourite}
      aria-label={isActive ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill={isActive ? "#FF4D4D" : "none"} // Softer red for active state
        stroke={isActive ? "none" : "#333333"} // Darker stroke for inactive state
        strokeWidth={isActive ? 0 : 1.5} // Slightly thicker stroke
        xmlns="http://www.w3.org/2000/svg"
        className="star-icon"
      >
        <path
          d="M18 3.5L22.5 12.5H32L24.5 19L27.5 29L18 23L8.5 29L11.5 19L4 12.5H13.5L18 3.5Z"
          strokeLinejoin="round" // Smoother edges
        />
      </svg>

      <style jsx>{`
        .favourite-btn {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease;
          border-radius: 50%; /* Rounded button */
        }

        .favourite-btn:hover {
          background-color: rgba(255, 77, 77, 0.1); /* Subtle hover background */
          transform: scale(1.1); /* Slight scale on hover */
        }

        .favourite-btn.active:hover {
          background-color: rgba(255, 77, 77, 0.2);
        }

        .star-icon {
          transition: fill 0.3s ease, stroke 0.3s ease, transform 0.3s ease;
        }

        .favourite-btn.active .star-icon {
          transform: rotate(360deg); /* Rotate when active */
        }

        @media (max-width: 768px) {
          .favourite-btn {
            padding: 6px;
          }
          .star-icon {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </button>
  );
}