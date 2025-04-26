import React from "react";
import {
    BlobProvider,
    Document,
    Font,
    Image,
    PDFDownloadLink,
    Page,
    Text,
    View,
} from "@react-pdf/renderer";
import { Box, Button, Modal, Typography } from "@mui/material";
import { formatDateCertificate } from "../../constants/constants";

Font.register({
    family: "pretendard",
    fonts: [
        {
            src: `/assets/fonts/pretendart/Pretendard-Regular.otf`,
        },
        {
            src: `/assets/fonts/pretendart/Pretendard-Bold.otf`,
        },
    ],
});

export const ContentOfPdf = ({ data }) => {
    console.log('darta----> ', JSON.stringify(data));
    const currentDate = new Date();
    const formattedDate =
        currentDate.getFullYear() +
        "년 " +
        ("0" + (currentDate.getMonth() + 1)).slice(-2) +
        "월 " +
        ("0" + currentDate.getDate()).slice(-2) +
        "일";

    return (
        <Document>
            <Page>
                <View
                    style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "4px solid #F5F5F5",
                        margin: "10px",
                    }}
                >
                    <Text
                        style={{
                            textAlign: "start",
                            fontSize: "14px",
                            color: "#2A2A2A",
                            fontFamily: "pretendard",
                        }}
                    >
                          제 1- {currentDate.getFullYear()}{currentDate.getMonth()+1}{data.id}호
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "30px",
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: "32px",
                                color: "#2A2A2A",
                                fontFamily: "pretendard",
                                
                                width: "100%",
                            }}
                        >
                            {data.type} 
                        </Text>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "80%",
                        }}
                    >
                        <Image
                            style={{
                                width: "55%",
                            }}
                            source="/assets/images/Layer_1-2.png"
                        />
                        <View style={{ position: "absolute", top: "120px" }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <View style={{ width: "100%" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                width: 168,
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                textAlign: "left",
                                                fontSize: "14px",
                                            }}
                                        >
                                            <Text>성</Text>
                                            <Text>명 :</Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                
                                                textAlign: "left",
                                            }}
                                        >
                                            {data.fullName}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                textAlign: "left",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                width: 170,
                                                letterSpacing: "3px",
                                                fontSize: "14px",
                                            }}
                                        >
                                            주민등록번호 :
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                textAlign: "left",
                                                fontFamily: "pretendard",
                                                
                                                fontSize: "14px",
                                            }}
                                        >
                                            {data.registrationNumber}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                width: 168,
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                textAlign: "left",
                                            }}
                                        >
                                            <Text>주</Text>
                                            <Text>소 :</Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                
                                                fontSize: "14px",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data.address}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                width: 168,
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                textAlign: "left",
                                            }}
                                        >
                                            <Text>부</Text>
                                            <Text>서 :</Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data.department} / {data.companyName}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                width: 168,
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                textAlign: "left",
                                            }}
                                        >
                                            <Text>직</Text>
                                            <Text>무 :</Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                
                                                fontSize: "14px",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data.job}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                width: 168,
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                textAlign: "left",
                                            }}
                                        >
                                            <Text>직</Text>
                                            <Text>책 :</Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                
                                                fontSize: "14px",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data.position}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                width: 170,
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                textAlign: "left",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    letterSpacing: "5.8px",
                                                }}
                                            >
                                                입 사 일 자:
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                
                                                textAlign: "left",
                                            }}
                                        >
                                            {formatDateCertificate(
                                                data.createdDate
                                            )}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                                width: 168,
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                fontSize: "14px",
                                                paddingLeft: "40px",
                                                paddingRight: "28px",
                                                textAlign: "left",
                                            }}
                                        >
                                            <Text>용</Text>
                                            <Text>도 :</Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#2A2A2A",
                                                fontFamily: "pretendard",
                                                
                                                fontSize: "14px",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data.purposeOfUsage}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "pretendard",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        paddingTop: "36px",
                                    }}
                                >
                                    상기용도 이외 사용시에는 무효처리함.
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: "pretendard",
                                        
                                        fontSize: "14px",
                                        textAlign: "center",
                                        paddingTop: "36px",
                                    }}
                                >
                                    {(data.type === "재직증명서" &&
                                        "상기인은 당사의 재직자임을 증명함.") ||
                                        (data.type === "경력증명서" &&
                                            "상기인은 상기 입사일로 부터 [현재년월일] 까지 당사에 근무한 이력이 있음을 증명함.") ||
                                        (data.type === "퇴직증명서" &&
                                            "상기인은 [퇴사년월일] 부로 당사를 퇴직한 자임을 증명함.") ||
                                        (data.type === "경력확인서" &&
                                            "상기인은 상기 입사일로 부터 [현재년월일] 까지 당사에 근무한 이력이 있음을 증명함.")}
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: "pretendard",
                                        
                                        fontSize: "14px",
                                        textAlign: "center",
                                        paddingTop: "12px",
                                    }}
                                >
                                    {formattedDate}
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        paddingTop: "60px",
                                    }}
                                >
                                    <View style={{ paddingRight: "40px" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text
                                                style={{
                                                    fontFamily: "pretendard",
                                                    
                                                    fontSize: "14px",
                                                    textAlign: "center",
                                                    paddingRight: "24px",
                                                }}
                                            >
                                                주식회사
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "pretendard",
                                                    
                                                    fontSize: "14px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                크릭앤리버 엔터테인먼트
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                paddingTop: "14px",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "pretendard",
                                                    
                                                    fontSize: "14px",
                                                    textAlign: "center",
                                                    paddingRight: "24px",
                                                }}
                                            >
                                              대표이사
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "pretendard",
                                                    
                                                    fontSize: "14px",
                                                    textAlign: "center",
                                                }}
                                            >
                                               김민철
                                            </Text>
                                        </View>
                                    </View>

                                    {/* <View
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: "#FFE8E8",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "pretendard",
                        
                        fontSize: "12px",
                        textAlign: "center",
                        color: "#BEBEBE",
                      }}
                    >
                      직인영역
                    </Text> */}
                                    <Image
                                        style={{
                                            width: 60,
                                            height: 60,
                                            marginLeft: "32px",
                                            marginRight: "48px",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                        source="/assets/images/dojang_new.png"
                                        
                                    />
                                    {/* </View> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        borderRadius: "10px",
                        backgroundColor: "#F5F5F5",
                        marginRight: "10px",
                        marginLeft: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            margin: "15px 0px",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                width: 62,
                                height: 33,
                                marginLeft: "32px",
                                marginRight: "48px",
                            }}
                            source="/assets/images/cre.png"
                        />
                        <Text
                            style={{
                                fontSize: "14px",
                                marginRight: "32px",
                                fontFamily: "pretendard",
                                color: "#5A5A5A",
                            }}
                        >
                            
                            ㈜크릭앤리버엔터테인먼트
                         
                            
                        </Text>
                        <View style={{ flexDirection: "column" }}>
                            <Text
                                style={{
                                    fontSize: "9px",
                                    fontFamily: "pretendard",
                                    color: "#5A5A5A",
                                }}
                            >
                                서울 영등포구 영등포로 150, C동 703호(당산동1가,
                                생각공장 당산)
                            </Text>
                            <Text
                                style={{
                                    fontSize: "9px",
                                    fontFamily: "pretendard",
                                    color: "#5A5A5A",
                                }}
                            >
                                전화 : 02-761-8901 | 팩스 : 02-761-8907
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default function CertificatePDF({ user, data, modal, setModal }) {
    // const [loading, setLoading] = useState(false);
    // const [modal, setModal] = useState(false);

    // const submit = async (blob) => {
    // setLoading(true);
    // const formData = new FormData();
    // formData.append("file", blob);
    // formData.append("applicantId", user.id);
    // sendResume(formData, token)
    //   .then(() => {
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     alert(error.response?.data.message);
    //     setLoading(false);
    //   });
    // };

    return (
        <>
            {modal && (
                <Modal open={modal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                            padding: "20px",
                            bgcolor: "#fff",
                            boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)",
                            borderRadius: "20px",
                            border: "none",
                        }}
                    >
                        <Button
                            sx={{
                                minWidth: "unset",
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                            }}
                            onClick={() => setModal(false)}
                        >
                            <img src="/assets/icons/close.svg" alt="close" />
                        </Button>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "700",
                                marginBottom: "10px",
                                color: "rgb(90, 90, 90)",
                            }}
                        >
                            이력서 출력/보내기
                        </Typography>
                        <Typography
                            sx={{ fontSize: "14px", color: "rgb(90, 90, 90)" }}
                        >
                            이력서를 PDF로 저장 또는 <br /> 이메일 보내기를
                            선택하여 주세요.
                        </Typography>
                        <Box display="flex" alignItems="center" mt="40px">
                            <BlobProvider
                                document={<ContentOfPdf data={{ ...user }} />}
                            >
                                {({ blob, loading, error }) => {
                                    return (
                                        <Button
                                            sx={{
                                                background: "#fff",
                                                color: "#212B36",
                                                fontSize: "12px",

                                                border: "1px solid #E9EDF9",
                                                padding: "8px",
                                                width: "130px",
                                            }}
                                            // onClick={() => submit(blob)}
                                            onClick={() => setModal(false)}
                                        >
                                            {loading
                                                ? "Loading..."
                                                : error
                                                ? "Error generating PDF"
                                                : "닫기"}
                                        </Button>
                                    );
                                }}
                            </BlobProvider>
                            <PDFDownloadLink
                                style={{
                                    background: "#9775fa",
                                    color: "#212B36",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    border: "1px solid transparent",
                                    textDecoration: "none",
                                    marginLeft: "10px",
                                    padding: "8px",
                                    width: "130px",
                                }}
                                document={<ContentOfPdf data={{ ...data }} />}
                                fileName={`${user.username}.pdf`}
                            >
                                {({ loading }) =>
                                    loading ? "LOADING..." : "저장하기"
                                }
                            </PDFDownloadLink>
                        </Box>
                    </Box>
                </Modal>
            )}
        </>
    );
}
