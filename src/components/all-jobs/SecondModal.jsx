import React, { useState } from "react";
import "./second.modal.scss";

export default function SecondModal({
  setSecondModal,
  applyToJob,
  openFirstModal,
}) {
  const [selectedResume, setSelectedResume] = useState(1);

  const handleResumeClick = () => {
    setSelectedResume(selectedResume === 1 ? 0 : 1);
  };

  return (
    <div className="second-content">
      <div className="content-body">
        <div className="body-title">
          <h5 className="title">입사지원</h5>
          <h6 className="title">선택한 이력서로 지원하시겠습니까?</h6>
        </div>
        <div className="body-box">
          <h6 className="title">[채용서류 반환에 관한 고지]</h6>

          <p>
            「채용절차의 공정화에 관한 법률」 제11조에 근거하여 최종합격자 발표
            후 채용을 위해 제출한 서류일체는 반환 요청할 수 있음.
          </p>
          <ul>
            <li>
              단, 최종합격하여 입사한 자, 채용전용사이트 또는 전자우편을 통해
              제출한 서류는 대상에서 제외되며, 보관기간 (채용서류의 반환을
              청구하지 않는 경우 반환 청구기간, 채용서류의 반환을 청구한 경우
              구인자가 특수취급우편물을 발송하거나 전달한 시점까지의 기간) 이
              경과한 증빙서류는 모두 파기.
            </li>
          </ul>

          <p>* 반환청구기간 : 최종합격자 발표일 이후 30일 이내</p>
          <p>
            * 반환청구방법 : ‘채용서류 반환청구서’ 양식(홈페이지 공지사항 양식
            첨부)을 작성하여 wjpark@crikorea.com으로 신청하고,
          </p>
          <p>
            접수 후 14일 이내 특수취급우편물로 발송 또는 방문수령 가능 (단,
            채용서류를 특수취급우편물로 송달하는 경우 소요비용은 응시자가 부담할
            수 있음)
          </p>
        </div>

        <div
          className={`${selectedResume === 1 ? "unchecked" : "checked"}`}
          onClick={() => handleResumeClick()}
        >
          {selectedResume === 1 ? (
            <img
              className="circle"
              src="/assets/icons/square.svg"
              alt="check"
            />
          ) : (
            <img
              className="circle"
              src="/assets/icons/check-done.svg"
              alt="check"
            />
          )}
          <span className="text">
            내용을 확인 하였으며, 이력서 제출에 동의합니다.
          </span>
        </div>
        <hr />

        <div className="helper-buttons flex-center">
          <button
            className="find btn"
            onClick={() => {
              setSecondModal(false);
              openFirstModal();
            }}
          >
            이력서 다시 선택하기
          </button>
          {selectedResume === 1 ? (
            <button disabled className="find btn">
              지원하기
            </button>
          ) : (
            <button className="find btn" onClick={applyToJob}>
              지원하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
