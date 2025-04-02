import { React } from "react";
import HeaderSwitcher from "./header";
import { Outlet } from "react-router-dom";

export default function LayoutNoFooter() {
  return (
    <>
      <HeaderSwitcher />
      <Outlet />
    </>
  );
}
