import React, { useEffect, useState } from "react";
import CustomModal from "../../components/modals/CustomModal";
import TermsModal from "../../components/modals/TermsModal";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NewTermsModal from "../../components/modals/NewTermsModal";
import NewCustomModal from "../../components/modals/NewCustomModal";

const initialTermsAll = {
  term1: true,
  term2: true,
  term3: true,
  term4: true,
  term5: true,
  term6: true,
};
const initialTerms = {
  term1: false,
  term2: false,
  term3: false,
  term4: false,
  term5: false,
  term6: false,
};

export default function SectionTwo({ setSection }) {
  const navigate = useNavigate();
  const [terms, setTerms] = useState(initialTerms);
  const [all, setAll] = useState(false);
  const [modal, setModal] = useState({ isOpen: false });
  const [modalTerm, setModalTerm] = useState({ isOpen: false });
  const [encData, setEncData] = useState();

  const validation = () => {
    if (all) {
      return false;
    } else if (terms.term1 && terms.term2 && terms.term4) {
      return false;
    }
    return true;
  };

  const showTerms = () => {
    setModal({ isOpen: true });
  };
  const showNewTerms = () => {
    setModalTerm({ isOpen: true });
  };

  useEffect(() => {
    if (Object.values(terms).every((term) => term)) {
      setAll(true);
    } else setAll(false);
  }, [terms]);

  useEffect(() => {
    if (all) {
      setTerms(initialTermsAll);
    }
  }, [all]);

  const handlePass = async () => {
    try {
      await mainCallerWithOutToken("checkMain", "GET", null).then((res) => {
        if (res.statusCode === 200) {
          setEncData(res.data);
        } else {
          navigate("/error");
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  function fnPopup() {
    window.open(
      "",
      "popupChk",
      "width=500, height=550, top=100, left=50, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
    );
    document.form_chk.action =
      "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
    document.form_chk.target = "popupChk";
    document.form_chk.submit();

    navigate("/pass-sign-up");
    // setSection(3);
  }

  useEffect(() => {
    if (encData) {
      fnPopup();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encData]);

  return (
    <div className="page-content-two flex-center">
      <form name="form_chk" method="post">
        <input type="hidden" name="m" value="checkplusService" />
        <input type="hidden" name="EncodeData" value={encData} />
      </form>
      <h3 className="title">회원가입</h3>
      <h5 className="terms">이용약관 및 개인 정보 취급 동의</h5>
      <div className="form-fields">
        <div className="field-box flex-center">
          <input
            id="all"
            className="field"
            type="checkbox"
            checked={all}
            disabled={Object.values(terms).every((term) => term)}
            onChange={() => setAll(!all)}
          />
          <label htmlFor="all">
            이용약관 전체 동의
            <span>
              선택 항목이 포함되어 있으며 동의하지 않아도 회원가입이 가능합니다.
            </span>
          </label>
        </div>
        <hr />
        <div className="field-box flex-center">
          <input
            id="term1"
            className="field"
            type="checkbox"
            checked={terms.term1}
            onChange={() => setTerms({ ...terms, term1: !terms.term1 })}
          />
          <label htmlFor="term1">이용약관 동의(필수)</label>
          <button className="btn read-more" onClick={showTerms}>
            상세보기
          </button>
        </div>
        <div className="field-box flex-center">
          <input
            id="term2"
            className="field"
            type="checkbox"
            checked={terms.term2}
            onChange={() => setTerms({ ...terms, term2: !terms.term2 })}
          />
          <label htmlFor="term2">개인정보 수집 및 이용에 대한 동의(필수)</label>
          <button className="btn read-more" onClick={showTerms}>
            상세보기
          </button>
        </div>
        <div className="field-box flex-center">
          <input
            id="term3"
            className="field"
            type="checkbox"
            checked={terms.term3}
            onChange={() => setTerms({ ...terms, term3: !terms.term3 })}
          />
          <label htmlFor="term3">개인정보 수집ㆍ이용에 대한 동의(선택)</label>
          <button className="btn read-more" onClick={showTerms}>
            상세보기
          </button>
        </div>
        <div className="field-box flex-center">
          <input
            id="term4"
            className="field"
            type="checkbox"
            checked={terms.term4}
            onChange={() => setTerms({ ...terms, term4: !terms.term4 })}
          />
          <label htmlFor="term4">개인정보의 제3자 제공 동의(필수)</label>
          <button className="btn read-more" onClick={showTerms}>
            상세보기
          </button>
        </div>
        <div className="field-box flex-center">
          <input
            id="term5"
            className="field"
            type="checkbox"
            checked={terms.term5}
            onChange={() => setTerms({ ...terms, term5: !terms.term5 })}
          />
          <label htmlFor="term5">개인정보의 제3자 제공 동의(선택)</label>
          <button className="btn read-more" onClick={showTerms}>
            상세보기
          </button>
        </div>

        <div className="field-box flex-center">
          <input
            id="term6"
            className="field"
            type="checkbox"
            checked={terms.term6}
            onChange={() => setTerms({ ...terms, term6: !terms.term6 })}
          />
          <label htmlFor="term5">
          개인정보 취급방침(선택)
          </label>
          <button className="btn read-more" onClick={showNewTerms}>
            상세보기
          </button>
        </div>
      </div>
      <hr />
      <div className="helper-buttons flex-center">
        <button className="find btn" onClick={() => setSection(1)}>
          취소
        </button>
        <button
          className="find btn"
          disabled={validation()}
          onClick={handlePass}
        >
          본인인증 진행하기
        </button>
        {/* <button
          className="find btn"
          disabled={validation()}
          onClick={() => setSection(3)}
        >
          본인인증 진행하기
        </button> */}
      </div>
      {modal.isOpen && (
        <CustomModal
          {...{ modal, setModal }}
          className="terms-modal"
          title="이용약관"
        >
          <TermsModal />
        </CustomModal>
      )}

      {modalTerm.isOpen && (
        <NewCustomModal
          {...{ modalTerm, setModalTerm }}
          className="terms-modal"
          title="개인정보취급방침"
        >
          <NewTermsModal />
        </NewCustomModal>
      )}
    </div>
  );
}
