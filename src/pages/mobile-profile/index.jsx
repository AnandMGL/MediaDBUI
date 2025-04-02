import { useSelector } from "react-redux";
import Profile from "./Profile";
import { Navigate, useLocation } from "react-router-dom";

export default function ProfileRouteMobile() {
  const user = useSelector((state) => state.user);
  const { state } = useLocation();

  if (!user.token) {
    return <Navigate to="/login" />;
  }

  return <Profile initialTab={state ? state.tab : undefined} />;
}
