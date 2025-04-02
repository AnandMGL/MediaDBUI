import React, { lazy } from "react";
import { useLocation } from "react-router-dom";
import { isDesktop } from "../../constants/constants";
const NotificationPage = lazy(() => import("./Notification"));
const NotificationPageMobile = lazy(() => import("./NotificationPageMobile"));

export default function Notification() {
  const { pathname } = useLocation();

  return isDesktop ? (
    <NotificationPage pathname={pathname} />
  ) : (
    <NotificationPageMobile pathname={pathname} />
  );
}
