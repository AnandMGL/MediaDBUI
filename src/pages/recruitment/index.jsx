import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Recruitment from "./Recruitment";

export default function RecruitRoute() {
  const user = useSelector((state) => state.user);
  const { state } = useLocation();

  if (!user.token) {
    return <Navigate to="/login" />;
  }

  return <Recruitment initialTab={state ? state.tab : undefined} />;
}
