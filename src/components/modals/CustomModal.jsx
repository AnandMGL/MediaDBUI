import React from "react";
import "./index.scss";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.4)",
    zIndex: 111,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 10px 35px 0px rgba(0, 0, 0, 0.05)",
    borderRadius: "20px",
  },
};

const CustomModal = ({ modal, setModal, title, children, className = "" }) => {
  return (
    <Modal
      closeTimeoutMS={1500}
      isOpen={modal.isOpen}
      shouldCloseOnOverlayClick={false}
      style={customStyles}
      className={className}
    >
      <div className="modal-top flex-between">
        <h5 className="title">{title}</h5> 
        <button
          className="close-modal-btn btn flex-center"
          onClick={() => setModal({ ...modal, isOpen: false })}
        >
          <img src="/assets/icons/x.svg" alt="close" />
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default CustomModal;
