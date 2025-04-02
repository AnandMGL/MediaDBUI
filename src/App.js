import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.scss";
import Layout from "./components/Layout";
import Modal from "react-modal";
import Job from "./pages/job";
import Login from "./pages/login";
import LayoutNoFooter from "./components/LayoutNoFooter";
import RecruitRoute from "./pages/recruitment";
// import { isDesktop } from "./constants/constants";
import DotsLoader from "./components/loaders/DotsLoader";
import ReferAnnounDetail from "./pages/reference/ReferDetail";
import HeadHunting from "./pages/head-hunting";
import useMediaQuery from "./hooks/useMediaQuery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignUp from "./pages/sign-up";
import Success from "./pages/success";
import Error from "./pages/error";
import PassSignUp from "./pages/login/PassSignUp";

import NotificationDtl from "./pages/notification/NotificationDtl";

const ProfileRoute = lazy(() => import("./pages/profile"));
const ProfileRouteMobile = lazy(() => import("./pages/mobile-profile"));
const ReferenceAnnoun = lazy(() => import("./pages/reference"));

const NotificationPage = lazy(() => import("./pages/notification"))


Modal.setAppElement("#root");

const theme = createTheme({
  palette: {
    primary: {
      main: "#935be3",
      second: "#ae84ea",
    },
    secondary: {
      main: "#c9adf1",
      second: "#faf7fe",
    },
    info: {
      main: "#a1a1a1",
      second: "#f7f7f7",
    },
  },
  transitions: {
    duration: {
      enteringScreen: 500,
      leavingScreen: 500,
    },
  },
});

function App() {
  const match = useMediaQuery(767);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
        <Suspense fallback={<DotsLoader />}>
          <Routes>
            <Route path="*" element={<LayoutNoFooter />}>
              <Route path="login" element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="success" element={<Success />} />
              <Route path="pass-sign-up" element={<PassSignUp />} />
              <Route path="error" element={<Error />} />
            </Route>
            <Route path="*" element={<Layout />}>
              <Route path="" element={<Home />} />

              <Route
                path="profile"
                element={match ? <ProfileRouteMobile /> : <ProfileRoute />}
              />

              <Route path="recruitment" element={<RecruitRoute />} />
              <Route path="#" element={<ReferenceAnnoun />} />
              <Route path="announcement" element={<ReferenceAnnoun />} />
              <Route path="headhunting" element={<HeadHunting />} />
              <Route path="job/:id" element={<Job />} />
              {/* <Route path="reference/:id" element={<ReferAnnounDetail />} /> */}
              <Route path="announcement/:id" element={<ReferAnnounDetail />} />

              <Route path="reference" element={<NotificationPage />} />
              <Route path="reference/:id" element={<NotificationDtl />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
