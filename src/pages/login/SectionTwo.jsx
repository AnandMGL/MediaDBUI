import React, { useEffect, useState } from "react";
import CustomModal from "../../components/modals/CustomModal";
import TermsModal from "../../components/modals/TermsModal";
import { mainCallerWithOutToken, getTermsAndCondition } from "../../api/mainCaller";
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
  const [termsTitle, setTermsTitle] = useState("");
  const [termsContent, setTermsContent] = useState("");
  const [termsAndCondition, setTermsAndCondition] = useState([]);

  const validation = () => {
    
    const requiredTerms = termsAndCondition.filter(term =>
      term.title.includes("(필수)")
    );
    const allRequiredChecked = requiredTerms.every(term => {
      const key = `term${term.id}`;
      return terms[key]; 
    });
  
    return !allRequiredChecked; 
  };

  const showTerms = (title, content) => {
    setTermsTitle(title);
    setTermsContent(content);
    setModal({ isOpen: true });
  };
  const showNewTerms = () => {
    setModalTerm({ isOpen: true });
  };

  useEffect(() => {
    const allChecked =
      Object.keys(terms).length > 0 &&
      Object.values(terms).every((v) => v === true);
    setAll(allChecked);
  }, [terms]);

  useEffect(() => {
    if (termsAndCondition.length > 0) {
      const updated = {};
      termsAndCondition.forEach((term) => {
        updated[`term${term.id}`] = false; 
      });
      setTerms(updated);
    }
  }, [termsAndCondition]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const result = await getTermsAndCondition("termsList", "GET", null);
        if (result.statusCode === 200) {
          setTermsAndCondition(result.data);
        }
      } catch (error) {
        toast.error(error.response?.data.message || "약관 불러오기 오류");
      }
    };
  
    fetchTerms();
  }, []);

 

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

  const handleCheckAll = (checked) => {
  setAll(checked);
  const updated = {};
  termsAndCondition.forEach((term) => {
    updated[`term${term.id}`] = checked;
  });
  setTerms(updated);
};
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
            type="checkbox"
            checked={all}
            onChange={(e) => handleCheckAll(e.target.checked)}
          />
          <label htmlFor="all">
            이용약관 전체 동의
            <span>
              선택 항목이 포함되어 있으며 동의하지 않아도 회원가입이 가능합니다.
            </span>
          </label>
        </div>
        <hr />

        {termsAndCondition.map((term) => {
          const key = `term${term.id}`;
          return (
            <div className="field-box flex-center" key={key}>
              <input
                id={key}
                className="field"
                type="checkbox"
                checked={terms[key] || false}
                onChange={() =>
                  setTerms((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              />
              <label htmlFor={key}>
                {term.title}
              </label>
              <button
                className="btn read-more"
                onClick={() => showTerms(term.title, term.content)}
              >
                상세보기
              </button>
            </div>
          );
        })}

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
          title={termsTitle}
        >
          <TermsModal  content={termsContent} />
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
