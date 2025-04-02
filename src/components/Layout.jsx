import { React } from "react";
import Footer from "./footer";
import HeaderSwitcher from "./header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <HeaderSwitcher />
      <Outlet />
      <Footer />
    </>
  );
}
