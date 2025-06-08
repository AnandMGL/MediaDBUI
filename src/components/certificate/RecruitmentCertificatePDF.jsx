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
              구직활동 증명서
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
            <View style={{ position: "absolute", top: "100px" }}>
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
                        width: 158,
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                        paddingLeft: "40px",
                        paddingRight: "28px",
                        textAlign: "left",
                        fontSize: "16px",
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
                      {data.name || "홍길동"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: "10px" }}>
                    <Text
                      style={{
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                        fontSize: "16px",
                        paddingLeft: "40px",
                        paddingRight: "28px",
                        textAlign: "left",
                        letterSpacing: "2px",
                        width: 160,
                      }}
                    >
                      생 년 월 일 :
                    </Text>

                    <Text
                      style={{
                        color: "#2A2A2A",
                        textAlign: "left",
                        fontFamily: "pretendard",
                      
                        fontSize: "14px",
                      }}
                    >
                      {data.birthDate || "1990년 01월 01일"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: "10px" }}>
                    <Text
                      style={{
                        width: 160,
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                        fontSize: "16px",
                        paddingLeft: "40px",
                        paddingRight: "28px",
                        textAlign: "left",
                        letterSpacing: "2px",
                      }}
                    >
                      모 집 부 분 :
                    </Text>
                    <Text
                      style={{
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                      
                        fontSize: "16px",
                        textAlign: "left",
                      }}
                    >
                     {data.title || ""}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: "10px" }}>
                    <Text
                      style={{
                        width: 160,
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                        fontSize: "16px",
                        paddingLeft: "40px",
                        paddingRight: "28px",
                        textAlign: "left",
                        letterSpacing: "2px",
                      }}
                    >
                      채 용 직 종 :
                    </Text>
                    <Text
                      style={{
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                        fontSize: "16px",
                      
                        textAlign: "left",
                      }}
                    >
                     {data.occupation || ""}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: "10px" }}>
                    <Text
                      style={{
                        width: 160,
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                        fontSize: "16px",
                        paddingLeft: "40px",
                        paddingRight: "28px",
                        textAlign: "left",
                        letterSpacing: "2px",
                      }}
                    >
                      지 원 일 시 :
                    </Text>
                    <Text
                      style={{
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                      
                        fontSize: "14px",
                        textAlign: "left",
                      }}
                    >
                      {data.applicationDate || ""}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: "10px" }}>
                    <Text
                      style={{
                        width: 160,
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                        fontSize: "16px",
                        paddingLeft: "40px",
                        paddingRight: "28px",
                        textAlign: "left",
                        letterSpacing: "2px",
                      }}
                    >
                      채용담당자 :
                    </Text>
                    <Text
                      style={{
                        color: "#2A2A2A",
                        fontFamily: "pretendard",
                      
                        fontSize: "16px",
                        textAlign: "left",
                      }}
                    >
                      {data.managerName || ""}
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
                    fontSize: "12px",
                    textAlign: "center",
                    paddingTop: "96px",
                  }}
                >
                  상기용도 이외 사용시에는 무효처리함.
                </Text>

                <Text
                  style={{
                    fontFamily: "pretendard",
                  
                    fontSize: "12px",
                    textAlign: "center",
                    paddingTop: "36px",
                    width: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  상기인은 ㈜크릭앤리버엔터테인먼트가 운영하는 미디어DB 채용
                  사이트를 통해 온라인 구직활동 하였음을 증명함.
                </Text>

                <Text
                  style={{
                    fontFamily: "pretendard",
                  
                    fontSize: "12px",
                    textAlign: "center",
                    paddingTop: "12px",
                  }}
                >
                  {formattedDate}
                </Text>

                <View style={{ flexDirection: "row", paddingTop: "60px" }}>
                  <View style={{ paddingRight: "40px" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "pretendard",
                        
                          fontSize: "12px",
                          textAlign: "center",
                          paddingRight: "24px",
                        }}
                      >
                        주식회사
                      </Text>
                      <Text
                        style={{
                          fontFamily: "pretendard",
                        
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        크릭앤리버 엔터테인먼트
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: "12px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "pretendard",
                        
                          fontSize: "12px",
                          textAlign: "center",
                          paddingRight: "24px",
                        }}
                      >
                        대표이사
                      </Text>
                      <Text
                        style={{
                          fontFamily: "pretendard",
                        
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        육연식
                      </Text>
                    </View>
                  </View>

                
                     <Image
                      style={{
                        width: 60,
                        // height: 60,
                        marginLeft: "32px",
                        marginRight: "48px",
                        display: "flex",
                        justifyContent: "center"
                      }}
                      source="/assets/images/dojang_new.png"
                    />
                
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
                fontSize: "12px",
                marginRight: "32px",
                fontFamily: "pretendard",
                color: "#5A5A5A",
              }}
            >
              크릭앤리버엔터테인먼트
            </Text>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: "9px",
                  fontFamily: "pretendard",
                  color: "#5A5A5A",
                }}
              >
                서울 영등포구 영등포로 160, C동 703호(당산동1가, 생각공장 당산)
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

export default function RecruitmentCertificatePDF({
  user,
  data,
  modal,
  setModal,
}) {
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
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "10px",
                color: "rgb(90, 90, 90)",
              }}
            >
              이력서 출력/보내기
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "rgb(90, 90, 90)" }}>
              이력서를 PDF로 저장 또는 <br /> 이메일 보내기를 선택하여 주세요.
            </Typography>
            <Box display="flex" alignItems="center" mt="40px">
              <BlobProvider document={<ContentOfPdf data={{ ...user }} />}>
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
                  fontSize: "12px",
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
                {({ loading }) => (loading ? "LOADING..." : "저장하기")}
              </PDFDownloadLink>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
