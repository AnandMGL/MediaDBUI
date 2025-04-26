export const isDesktop = window.innerWidth > 767;

// value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,

export const imgURL =
  // "https://mediadbglobaldev.s3.ap-northeast-2.amazonaws.com/";
  'https://creeknriver-mediadbglobaldev.s3.ap-northeast-2.amazonaws.com/'

export const validPorson = {
  required: true,
  pattern: {
    // value: /^[A-Za-z]+$/i,
    message: "이 필드에는 이름이 필요합니다.",
  },
  minLength: {
    value: 3,
    message: "이름 최소 길이 3",
  },
};

export const validRank = {
  required: true,
  pattern: {
    // value: /^[A-Za-z]+$/i,
    message: "이 필드는 이름이 필요합니다",
  },
  minLength: {
    value: 1,
    message: "이름 최소 길이 1",
  },
};


export const HeadhuntingAddVal = {
  required: true,
  minLength: {
    value: 6,
    message: "주소 최소 길이 6",
  },
  maxLength: {
    value: 500,
    message: "최대 길이에 대한 사용자 정의 오류 메시지 주소",
  },
};

export const validName = {
  required: ' 아이디를 입력해 주세요.',
  pattern: {
    // value: /^[A-Za-z]+$/i,
    message: "이 필드에는 이름이 필요합니다.",
  },
  maxLength: {
    value: 20,
    message: "최대 이름 길이 20",
  },
  minLength: {
    value: 3,
    message: "이름 최소 길이 3",
  },
};
export const validSelect = {
  required: true,
  pattern: {
    value: /^(?!other$).*/,
    message: " 학력을 선택해주세요.",
  },
};
export const validAddress = {
  required: '주소를 입력해 주세요',
  minLength: {
    value: 6,
    message: "주소 최소 길이 6",
  },
  maxLength: {
    value: 100,
    message: "최대 길이에 대한 사용자 정의 오류 메시지 주소",
  },
};
export const validPassword = {
  required: '"비밀번호를 입력해 주세요',
  minLength: {
    value: 10,
    message: "10자 이상 입력해 주세요",
  },
  maxLength: {
    value: 20,
    message: "비밀번호를 입력해주세요",
  },
};
export const emailValid = {
  required: '이메일을 입력해 주세요',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "입력한 값이 이메일 형식과 일치하지 않습니다.",
  },
};
export const valNumber = {
  pattern: /^[0-9]+$/,
  required: '휴대폰을 입력해주세요.',
  minLength: {
    value: 11,
    message: "최소 숫자 길이 11",
  },
  maxLength: {
    value: 12,
    message: "최대 숫자 길이 12",
  },
};

export const validPhoneNumber = {
  required: "전화번호를 입력해 주세요",
  pattern: {
    value: /^\d{3}-\d{3,4}-\d{4}$/,
    message: "유효한 전화번호 형식이 아닙니다."
  }
  
};

export const validateDate = (value) => {
  const inputDate = new Date(value);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - inputDate.getFullYear();
  const ageLimit = 18;
  if (age < ageLimit) {
    return "You must be at least " + ageLimit + " years old.";
  }
  return true;
};

export const dateConverter = (selected) => {
  if (selected && !isNaN(selected) && selected.$d) {
    const date = selected.$d.toLocaleDateString("en-US").split("/");
    return `${date[2]}-${date[0].length === 1 ? "0" + date[0] : date[0]}-${
      date[1].length === 1 ? "0" + date[1] : date[1]
    }`;
  }
  return selected;
};

export const scriptUrl =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
const dateOptions = { month: "long", day: "numeric", weekday: "long" };

export const toDayCountry = (country) =>
  new Date().toLocaleString(country, dateOptions);

export const list = [
  {
    id: 1,
    image: "/assets/images/recruitments/Rectangle 7 (1).png",
    compName: "업체명업체명업체명",
    description: "공고제목공고제목공고제목공고제목공고제목공고제목",
    jobType: "직무,직종직무,직종",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "경력 무관   ㅣ  학력 무관",
  },

  {
    id: 2,
    image: "/assets/images/recruitments/Rectangle 7 (1).png",
    compName: "SBS 미디어넷",
    description: "D콘텐츠사업팀 [Pick Up! 트렌드 스페셜] AD 모집",
    jobType: "방송/광고 운행",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "경력 무관   ㅣ  초대졸 부터",
  },
  {
    id: 3,
    image: "/assets/images/recruitments/Rectangle 13.png",
    compName: "서울경제TV",
    description: "제작팀 제작PD 모집",
    jobType: "방송/기술",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "5년 부터   ㅣ  학력 무관    ",
  },
  {
    id: 4,
    image: "/assets/images/recruitments/Rectangle 13 (1).png",
    compName: "미디어로그 ",
    description: "LG U+ 스포키앱 운영 모집(안양 평촌역) 4명 채용",
    jobType: "방송/방송사무",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "경력 무관   ㅣ  학력 무관",
  },
  {
    id: 5,
    image: "/assets/images/recruitments/Rectangle 8.png",
    compName: "메가스터디교육㈜",
    description: "컨텐츠제작팀 강의 라이브 송출 및 모니터링 (역삼)",
    jobType: "방송/송출/카메라",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "경력 무관   ㅣ  학력 무관 ",
  },
  {
    id: 6,
    image: "/assets/images/recruitments/Rectangle 7 (2).png",
    compName: "MBC                ",
    description: '예능국 "태어난김에 세계일주2" FD 모집',
    jobType: "방송/조연출",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "경력 무관   ㅣ  고졸 부터",
  },
  {
    id: 7,
    image: "/assets/images/recruitments/Rectangle 7 (3).png",
    compName: "미디어로그",
    description: "프로덕션툴즈 중계기술팀 중계차 영상감독/현장오디오감독",
    jobType: "방송/오디오",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "경력 무관   ㅣ  고졸 부터",
  },
  {
    id: 8,
    image: "/assets/images/recruitments/Rectangle 13 (2).png",
    compName: "SPOTV",
    description:
      "프로덕션툴즈 기술관리팀 스튜디오/중계카메라(KBO,KBL) 모집(남녀무관)",
    jobType: "방송/조연출",
    regDate: "2099 - 99 - 99 99:99",
    noticeDedline: "~ 99/99",
    backgroundType: "3년 부터   ㅣ  고졸 부터   ",
  },
];

export const gender = [
  {
    label: "남",
    value: "other",
  },
  {
    label: "male",
    value: "male",
  },
  {
    label: "female",
    value: "female",
  },
];

export const years = () => {
  const startYear = 2024;
  const endYear = 1930;
  const years = Array.from(
    { length: startYear - endYear + 1 },
    (_, index) => startYear - index
  );
  const yearsOptions = years.map((year) => ({ label: year, value: year }));
  return [
    {
      label: "선택",
      value: "",
    },
    ...yearsOptions,
  ];
};

export const months = [
  {
    label: "선택",
    value: "",
  },
  {
    label: "01",
    value: 1,
  },
  {
    label: "02",
    value: 2,
  },
  {
    label: "03",
    value: 3,
  },
  {
    label: "04",
    value: 4,
  },
  {
    label: "05",
    value: 5,
  },
  {
    label: "06",
    value: 6,
  },
  {
    label: "07",
    value: 7,
  },
  {
    label: "08",
    value: 8,
  },
  {
    label: "09",
    value: 9,
  },
  {
    label: "10",
    value: 10,
  },
  {
    label: "11",
    value: 11,
  },
  {
    label: "12",
    value: 12,
  },
];

export const certificateType = [
  {
    label: "선택",
    value: "",
  },
  {
    label: "재직증명서",
    value: "재직증명서",
  },
  {
    label: "경력증명서",
    value: "경력증명서",
  },
  {
    label: "퇴직증명서",
    value: "퇴직증명서",
  },
  {
    label: "경력확인서",
    value: "경력확인서",
  },
  {
    label: "원천징수영수증(이메일 발급)",
    value: "원천징수영수증(이메일 발급)",
  },
  {
    label: "갑종근로영수증(이메일 발급)",
    value: "갑종근로영수증(이메일 발급)",
  },
];

export const formatDate = (value) => {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "object" && value) {
    const year = value[0];
    const month = value[1];
    const date = value[2];
    const newStartDate = `${year || ""}.${month || ""}.${date || ""}`;
    return newStartDate;
  } else if (value === null) {
    return value;
  }
};

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (cleaned.length <= 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }

  // 11 оронтойгоос хэтэрвэл нэмэхгүй, харин бүрэн буцаа
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
};



export const formatKoreanPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ""; // Return empty string if phone number is not provided
  // Use regular expressions to insert hyphens at appropriate positions
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const formatDateCertificate = (value) => {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "object" && value) {
    const year = value[0];
    const month = value[1];
    const date = value[2];
    const newStartDate = `${year || ""}/${month || ""}/${date || ""}`;
    return newStartDate;
  } else if (value === null) {
    return value;
  }
};

export const formatDateCertificateDay = (value) => {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "object" && value) {
    const year = value[0];
    const month = value[1];
    const date = value[2];
    const newStartDate = `${year || ""}년 ${month || ""}월 ${date || ""}일 `;
    return newStartDate;
  } else if (value === null) {
    return value;
  }
};

////this date formatter will convert any type of date to "dd/MM/yyyy"
export const dateFormatter = (date) => {
  return new Date(date).toISOString().replace(/T.*$/, "");
};

export const formatDateUser = (dateStr) => {
  if (dateStr?.length !== 8) {
    return dateStr; // or return an error/placeholder text
  }

  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);

  return `${year}-${month}-${day}`; // format: YYYY-MM-DD
  // return `${day}-${month}-${year}`; // format: DD-MM-YYYY
  // return `${month}/${day}/${year}`; // format: MM/DD/YYYY
};

export const eduLevel = [
  {
    label: "선택",
    value: "",
  },
  {
    label: "고졸",
    value: "고졸",
    // value: "HighSchoolGraduate",
  },
  {
    label: "초대중퇴",
    value: "초대중퇴",
    // value: "NotEndedShortUniversity",
  },
  {
    label: "초대재",
    value: "초대재",
    // value: "ShortUniversityStudent",
  },
  {
    label: "초대휴학",
    value: "초대휴학",
    // value: "LeaveOfAbsenceShortUniversity",
  },
  {
    label: "초대졸",
    value: "초대졸",
    // value: "GraduatedShotUniversityStudent",
  },
  {
    label: "대학교중퇴",
    value: "대학교중퇴",
    // value: "NotEndedUniversity",
  },
  {
    label: "대학교재",
    value: "대학교재",
    // value: "UniversityStudent",
  },
  {
    label: "대학교휴학",
    value: "대학교휴학",
    // value: "UniversityLeaveOfAbsence",
  },
  {
    label: "대학교졸",
    value: "대학교졸",
    // value: "UniversityGraduate",
  },
  {
    label: "대학원중퇴",
    value: "대학원중퇴",
    // value: "NotEndedMasterDegreeUniversity",
  },
  {
    label: "대학원재",
    value: "대학원재",
    // value: "MasterDegreeStudent",
  },
  {
    label: "대학원휴학",
    value: "대학원휴학",
    // value: "LeaveOfAbsenceFromMasterDegree",
  },
  {
    label: "대학원졸",
    value: "대학원졸",
    // value: "MasterDegreeGraduateStudent",
  },
];

export const eduGraduation = [
  {
    label: "선택",
    value: "",
  },
  {
    label: "졸업 ",
    value: "졸업 ",
  },
  {
    label: "재학중",
    value: "재학중",
  },
  {
    label: "휴학",
    value: "휴학",
  },
  {
    label: "중퇴",
    value: "중퇴",
  },
  {
    label: "졸업예정",
    value: "졸업예정",
  },
  {
    label: "수료",
    value: "수료",
  },
];

export const languages = [
  { label: "선택", value: "" },
  { label: "영어", value: "영어" },
  { label: "일어", value: "일어" },
  { label: "중어", value: "중어" },
  { label: "독어", value: "독어" },
  { label: "러시아어", value: "러시아어" },
  { label: "스페인어", value: "스페인어" },
  { label: "베트남어", value: "베트남어" },
  { label: "이탈리아어", value: "이탈리아어" },
  { label: "기타", value: "기타" },
];

export const honorAndProtect = [
  { label: "선택", value: "" },
  { label: "비대상", value: "비대상" },
  { label: "대상", value: "대상" },
];

export const classification = [
  { label: "선택", value: "" },
  { label: "병역필", value: "병역필" },
  { label: "미필", value: "미필" },
  { label: "면제", value: "면제" },
  { label: "특례", value: "특례" },
  { label: "해당없음", value: "해당없음" },
];

export const county = [
  { label: "선택", value: "" },
  { label: "육군", value: "육군" },
  { label: "해군", value: "해군" },
  { label: "공군", value: "공군" },
  { label: "해병", value: "해병" },
  { label: "전경", value: "전경" },
  { label: "의경", value: "의경" },
  { label: "해경", value: "해경" },
  { label: "기타", value: "기타" },
  { label: "해당없음", value: "해당없음" },
];

export const isExist = [
  { label: "있음", value: true },
  { label: "없음", value: false },
];

export const careerPeriod = [
  { label: "선택", value: "" },
  { label: "없음", value: "없음" },
  { label: "3개월 미만", value: "3개월 미만" },
  { label: "3개월 이상", value: "3개월 이상" },
  { label: "6개월 이상", value: "6개월 이상" },
  { label: "1년 이상", value: "1년 이상" },
  { label: "2년 이상", value: "2년 이상" },
  { label: "3년 이상", value: "3년 이상" },
  { label: "4년 이상", value: "4년 이상" },
  { label: "5년 이상", value: "5년 이상" },
  { label: "6년 이상", value: "6년 이상" },
  { label: "7년 이상", value: "7년 이상" },
  { label: "8년 이상", value: "8년 이상" },
  { label: "9년 이상", value: "9년 이상" },
];

export const level = [
  { label: "선택", value: "" },
  { label: "상", value: "상" },
  { label: "중", value: "중" },
  { label: "하", value: "하" },
];

export const eduCategory = [
  {
    label: "선택",
    value: "",
  },
  {
    label: "고등학교",
    value: "고등학교",
  },
  {
    label: "대학(2년재)",
    value: "대학(2년재)",
  },
  {
    label: "대학교(4년재)",
    value: "대학교(4년재)",
  },
  {
    label: "대학원",
    value: "대학원",
  },
];

export const location = [
  {
    label: "선택",
    value: "",
  },
  {
    label: "서울 ",
    value: "서울 ",
  },
  {
    label: "인천",
    value: "인천",
  },
  {
    label: "대전",
    value: "대전",
  },
  {
    label: "대구",
    value: "대구",
  },
  {
    label: "울산",
    value: "울산",
  },
  {
    label: "부산",
    value: "부산",
  },
  {
    label: "광주",
    value: "광주",
  },
  {
    label: "경기도",
    value: "경기도",
  },
  {
    label: "강원도",
    value: "강원도",
  },
  {
    label: "경상남도",
    value: "경상남도",
  },
  {
    label: "경상북도",
    value: "경상북도",
  },
  {
    label: "충청남도",
    value: "충청남도",
  },
  {
    label: "충청북도",
    value: "충청북도",
  },
  {
    label: "전라남도",
    value: "전라남도",
  },
  {
    label: "전라북도",
    value: "전라북도",
  },
  {
    label: "제주도",
    value: "제주도",
  },
];

export const pageSize = [
  { label: "10개씩", value: 10 },
  { label: "50개씩", value: 50 },
  { label: "100개씩", value: 100 },
];

export const order = [
  { label: "정순", value: "DESC" },
  { label: "역순", value: "ASC" },
];
