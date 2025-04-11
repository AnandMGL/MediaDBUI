import React from "react";
import "./terms.modal.scss";

export default function TermsModal({ content }) {
  return (
    <div className="terms-content">
      <hr />

      <div className="content-body">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
}
