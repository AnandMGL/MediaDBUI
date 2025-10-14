import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Pagination,
    Paper,
    Stack,
    TableHead,
    Typography,
    Grid,
    TextField,
    Divider,
    Modal,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { mainCallerTokenPost } from "../../api/mainCaller";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../actions/user";
export default function UserStatusModal({
    setModal,
    modal,
    modalKey,
    contentKey,
    userId
}) {
    const { handleSubmit, control, watch, reset } = useForm({});
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [users, setUsers] = useState();
    const ref = useRef(null);
    const close = () => {
        setModal((prevModal) => ({
            ...prevModal,
            [modalKey]: false,
        }));
    };

    const submit = async () => {
        let formData = new FormData();
        formData.append("id", userId);
        try {
            await mainCallerTokenPost("user/changeStatus", "POST", formData).then(
                (res) => {
                    if (res.statusCode === 200) {
                        close();
                        dispatch(setUserData({}));
                        toast.success("회원 탈퇴가 완료되었습니다.");
                    } else {
                        toast.warning(res.message);
                    }
                }
            );
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    return (
        <Modal open={modal.isOpen} className="statusModal">
            <Box ref={ref}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "#fff",
                    borderRadius: "10px",
                    border: "none",
                    width: "408px",
                    height: "408px",
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    margin={"20px"}
                >
                    <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
                        탈퇴하기
                    </Typography>
                    <Button sx={{ minWidth: "unset" }} onClick={close}>
                        <img src="/assets/icons/close.svg" alt="close" />
                    </Button>
                </Box>
                <Box sx={{ padding: "0 20px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", textAlign: "center", color: "#6B7280", marginTop: "70px", fontFamily: "Preterdard" }}>
                        사원 이력이 있는 경우
                    </Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", textAlign: "center", color: "#A91515", fontFamily: "Preterdard" }}>
                        회원 탈퇴 시 증명서를 발급받을 수 없습니다.
                    </Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", textAlign: "center", color: "#6B7280", fontFamily: "Preterdard" }}>
                        그래도 탈퇴하시겠습니까?
                    </Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", textAlign: "center", color: "#6B7280", marginTop: "40px", fontFamily: "Preterdard" }}>
                        (사원 이력이 없는 회원은 즉시 탈퇴가 가능합니다.)
                    </Typography>
                    <div className="buttom-buttons flex-between" style={{ marginTop: "60px", justifyContent: "center" }}>
                        <div>
                            <Button sx={{
                                whiteSpace: "nowrap",
                                fontSize: "12px",
                                marginLeft: "10px",
                                lineHeight: "15px",
                                padding: "8px 26px",
                                color: "#fff",
                                backgroundColor: "#98A6AD",
                                '&:hover': {
                                    backgroundColor: "#98A6AD",
                                },
                            }} onClick={close}>
                                취소
                            </Button>
                            <Button
                                onClick={handleSubmit(submit)}
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "12px",
                                    marginLeft: "10px",
                                    lineHeight: "15px",
                                    padding: "8px 26px",
                                    color: "#fff",
                                    backgroundColor: "#8E66FF",
                                    '&:hover': {
                                        backgroundColor: "#8E66FF",
                                    },
                                }}>
                                확인
                            </Button>
                        </div>
                    </div>
                </Box>

            </Box>
        </Modal>
    );
}
