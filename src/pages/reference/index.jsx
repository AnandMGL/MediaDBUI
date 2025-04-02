import React, { lazy } from "react";
import { useLocation } from "react-router-dom";
import { isDesktop } from "../../constants/constants";
const ReferenceAnnoun = lazy(() => import("./Reference"));
const ReferenceAnnounMobile = lazy(() => import("./ReferenceMobile"));

export default function Reference() {
  const { pathname } = useLocation();

  return isDesktop ? (
    <ReferenceAnnoun pathname={pathname} />
  ) : (
    <ReferenceAnnounMobile pathname={pathname} />
  );
}
