import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toTop } from "../../../methods";
import { mainCallerToken } from "../../../api/mainCaller";
import { toast } from "react-toastify";

export default function StepFive({
  setActiveStep,
  resumes,
  setResumes,
  resume,
  setResume,
  setSection,
}) {
  const user = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: resume,
  });

  const onSubmit = (values) => {
    let newResome = {
      employeeId: user.id,
      ...values,
    };

    try {
      if (resume.id) {
        mainCallerToken("resume/update", "POST", newResome)
          .then((res) => {
            if (res.statusCode === 200) {
              setResumes(
                resumes.map((item) => (item.id === resume.id ? res.data : item))
              );
              toast.success(res.message);
              setSection(2);
            }
          })
          .catch((err) => {
            toast.warning(err.message);
          });
      } else {
        mainCallerToken("resume/create", "POST", newResome)
          .then((res) => {
            if (res.statusCode === 200) {
              setResumes([...resumes, res.data]);
              toast.success(res.message);
              setSection(2);
            }
          })
          .catch((err) => {
            toast.warning(err.message);
          });
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
    setResume("");
  };

  useEffect(() => {
    reset(resume);
    toTop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="step-five">
        <hr />
        <div className="content-body">
          <div className="form-fields">
            <h5 className="title">11. 성장과정</h5>
            <div className="field-box">
              <textarea
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("growthProcess")}
              />
            </div>
            <h5 className="title">12. 성격의 장/단점</h5>
            <div className="field-box">
              <textarea
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("personality")}
              />
            </div>
            <h5 className="title">13. 지원동기</h5>
            <div className="field-box">
              <textarea
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("motive")}
              />
            </div>
            <h5 className="title">14. 보유기술</h5>
            <div className="field-box">
              <textarea
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("technology")}
              />
            </div>
            <h5 className="title">15. 입사가능시기</h5>
            <div className="field-box">
              <textarea
                className="field"
                placeholder="내용을 입력하여 주세요"
                {...register("availableFrom")}
              />
            </div>
          </div>
        </div>
        <div className="bottom-buttons flex-between">
          <button className="btn back" onClick={() => setActiveStep(4)}>
            취소
          </button>
          <button className="btn submit" type="submit">
            저장
          </button>
        </div>
      </div>
    </form>
  );
}
