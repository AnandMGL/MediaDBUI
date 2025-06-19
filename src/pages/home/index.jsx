import React, { useEffect, useState } from "react";
import Gallery from "../../components/gallery";
import SpecialRecruitment from "../../components/special-recruitment";
import "./index.scss";
import CareerInsights from "../../components/career-insights";
import AllJobs from "../../components/all-jobs";
// import Search from "../../components/search";
import EasyActions from "../../components/easyActions";
import LinkButtons from "../../components/easyActions/LinkButtons";
import { mainCallerWithOutToken } from "../../api/mainCaller";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../actions/user";
import ReusablePopup from "../../components/popup/ReusablePopup";
import PopupList from "../../components/popup/ReusablePopup";

// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import CloseIcon from "@mui/icons-material/Close";
// import DialogTitle from "@mui/material/DialogTitle";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

export default function Home() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [careerCategory, setCareerCategory] = useState();
    const [calendarJobList, setCalendarJobList] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState(null);

    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
    // const handleClose = () => {
    //   setOpen(false);
    // };

    useEffect(() => {
        careerInsightsMenu();
        getCalendarJobList && getCalendarJobList();

        if (searchParams.get("code") != null) {
            callBack();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const dismissedToday = localStorage.getItem("home_popup_dismissed");
        const today = new Date().toDateString();

        if (dismissedToday === today) return;
        getPopupData();
    }, []);

    const getPopupData = async () => {
        try {
            const response = await mainCallerWithOutToken(
                "home/popup",
                "GET",
                null
            );
            console.log("pop res =", JSON.stringify(response));
            if (response.statusCodeValue === 200) {
                console.log("response.body =", JSON.stringify(response.body));
                setPopupData(response.body);
                setShowPopup(true);
            }
        } catch (error) {
            console.error("Error fetching popup data:", error);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const callBack = async () => {
        const code = searchParams.get("code");

        try {
            const response = await mainCallerWithOutToken(
                `home/login-callback/${code}`,
                "GET",
                null
            );
            if (response.statusCode === 200) {
                dispatch(setUserData(response.data));
            }
        } catch (error) {
            console.log("kakao login error:", error);
        }
    };

    const getCalendarJobList = async () => {
        try {
            await mainCallerWithOutToken(
                "home/calendarJobList",
                "GET",
                null
            ).then((result) => {
                if (result.statusCode === 200) {
                    setCalendarJobList(result.data.content);
                }
            });
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    const careerInsightsMenu = async () => {
        try {
            await mainCallerWithOutToken("jobCategories", "GET", null, {
                Authorization: `Bearer ${user.token}`,
            }).then((result) => {
                setCareerCategory(result.data);
            });
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    // useEffect(() => {
    //   const today = new Date().getTime();
    //   const popTimer = new Date("popupTimer").getTime();

    //   if (popTimer) {
    //     if (today > popTimer) {
    //       setTimeout(() => {
    //         setOpen(true);
    //       }, 1000);
    //     }
    //   } else {
    //     setTimeout(() => {
    //       setOpen(true);
    //     }, 1000);
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const handleClose = () => {
    //   setOpen(false);
    // };

    return (
        <div className="home-page">
            <div className="container">
                <Gallery />

                {/* <div>
          <Search />
        </div> */}

                <SpecialRecruitment />
                <CareerInsights careerCategory={careerCategory} />
            </div>
            <div className="container-fluid">
                <div className="container" id="search">
                    <AllJobs calendarJobList={calendarJobList} />
                </div>
            </div>
            <EasyActions>
                <LinkButtons />
            </EasyActions>

            {/* <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modal title
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          ></IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment> */}

            {showPopup && popupData && (
                // <ReusablePopup
                //     title={popupData.title}
                //     content={
                //         <img
                //             src={`https://creeknriver-mediadbglobaldev.s3.ap-northeast-2.amazonaws.com/${popupData.imagePath}`}
                //             alt="Popup"
                //             width={popupData.imageWidth || 300}
                //             style={{
                //                 display: "block",
                //                 maxWidth: "100%",
                //                 height: "auto",
                //             }}
                //             onClick={() =>
                //                 window.open(popupData.landingUrl, "_blank")
                //             }
                //         />
                //     }
                //     onClose={closePopup}
                // />
                <PopupList popupDataList={popupData} />

            )}
        </div>
    );
}
