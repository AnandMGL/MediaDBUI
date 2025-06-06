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

      <style jsx>{`
        table {
          caption-side: bottom;
          border-collapse: collapse;
          border: 1px double #b3b3b3;
          border-spacing: 0;
          height: 100%;
          width: 100%;
        }
          table td, .ck-content .table table th {
            border: 1px solid #bfbfbf;
            min-width: 2em;
            padding: .4em;
        }
      `}</style>
    </Modal>

    
  );
};

export default CustomModal;
