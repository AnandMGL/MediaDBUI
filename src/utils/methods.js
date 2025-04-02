import * as XLSX from "xlsx";

export function getAge(bd) {
  if (bd) {
    const today = new Date();
    const getBirthYear = parseInt(bd.substring(0, 4));
    const getBirthMonth = parseInt(bd.substring(4, 6));
    const getBirthDay = parseInt(bd.substring(6));
    var calAge = today.getFullYear() - getBirthYear;
    const calAgeMonth = today.getMonth() + 1 - getBirthMonth;
    const calAgeDay = today.getDate() - getBirthDay;
    if (calAgeMonth < 0 || (calAgeMonth === 0 && calAgeDay < 0)) {
      calAge = calAge - 1;
    }
    return calAge;
  }
  return "";
}
export function addZero(num) {
  return num < 10 ? `0${num}` : num;
}
export const dateConverter = (selected) => {
  if (selected && !isNaN(selected) && selected.$d) {
    console.log(selected);
    const date = selected.$d.toLocaleDateString("en-US").split("/");
    return `${date[2]}-${date[0].length === 1 ? "0" + date[0] : date[0]}-${
      date[1].length === 1 ? "0" + date[1] : date[1]
    }`;
  }
  return selected;
};

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

export function getDaysOfMonth(date) {
  if (!date) date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getTomorrow(date = new Date()) {
  const tomorrow = new Date(date.getTime());
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow;
}

export function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);
  return previous;
}

export const handleSection = (section) => {
  var parts = section.split("/");
  const id = parts[parts.length - 1];
  switch (section) {
    case "/talent/job-seeker":
      return "구직자";
    case `/user-create`:
      return "회원가입";
    case "/talent/number-contacts":
      return "콘택트 인원";
    case "/talent/employee-waiting-list":
      return "사원 대기자";
    case `/talent/employee-waiting-list/${id}`:
      return "사원 대기자";
    case `/send-to-pending/${id}`:
      return "사원 대기자로 보내기";
    case "/talent/employee":
      return "사원";
    case `/talent/employee/${id}`:
      return "사원";
    case "/talent/waiting-list":
      return "퇴사 대기자";
    case `/talent/waiting-list/${id}`:
      return "퇴사 대기자";
    case "/talent/deceased":
      return "퇴사자";
    case `/talent/deceased/${id}`:
      return "퇴사자";
    case "/job-management/order-status":
      return "오더 현황";
    case `/job-management/order-status/${id}`:
      return "오더 현황";
    case "/job-management/all-jobs":
      return "전체 채용 정보";
    case "/job-management/reqirement-create":
      return "채용 등록";
    case `/job-management/reqirement-update/${id}`:
      return "전체 채용 정보";
    case "/job-management/set-up-career":
      return "커리어 인사이트 설정";
    case `/user-details/${id}`:
      return "구직자";
    case `/talent/number-contacts/${id}`:
      return "콘택트 인원";
    case "/talent/certificate-applicant":
      return "제증명 신청자";
    case "/account-management/business-management":
      return "업체 관리";
    case `/account-management/business-management/${id}`:
      return "업체 관리";
    case "/account-management/business-manager":
      return "파견 사업 관리 대장";
    case `/account-management/business-manager/${id}`:
      return "파견 사업 관리 대장";
    case "/account-management/business-management-ledger":
      return "사용 사업 관리 대장";
    case `/account-management/business-management-ledger/${id}`:
      return "사용 사업 관리 대장 ";
    default:
      return "대시보드";
  }
};

export const dateFormatter = (date) => {
  return new Date(date).toISOString().replace(/T.*$/, "");
};

export const getDateRange = (days) => {
  const today = new Date();
  const date = new Date().setDate(new Date().getDate() + days);
  return { from: dateFormatter(today), to: dateFormatter(date) };
};

const tasks = {};

export function debounce(callBack, nameTask, duration = 1000) {
  // get task
  let task = tasks[nameTask];

  // remove timeout if it has
  task && clearTimeout(task);

  // set new task or update
  tasks[nameTask] = setTimeout(callBack, duration);
}

export const copyContent = async (id) => {
  let text = document.getElementById(id).innerHTML;
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied! " + text);
  } catch (err) {
    alert("Failed to copy: ", err);
  }
};

export const checkJobDedline = (data) => {
  const today = new Date();
  const dedline = new Date(`${data.dedline}T23:59`);
  if (data.always) {
    return "진행중";
  }
  if (dedline < today) {
    return <font color="#2D9CDB">마감</font>;
  }
  return "진행중";
};

export const exportToExcel = (data, name) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, name);
  XLSX.writeFile(wb, `${name}.xlsx`);
};

export const exportDataToExcel = async (data, name) => {
  exportToExcel(data, name);
};


export const statusSwitcher = (value) => {
  switch (value) {
    case "SEEKER":
      return "구직자";
    case "REQUESTED":
      return "요청됨";
    case "PENDING":
      return "대기 중";
    case "REJECTED":
      return "거절됨";
    case "APPROVED":
      return "승인됨";
    case "PRE_RETIRED":
      return "명예 퇴직 예정";
    case "RETIRED":
      return "퇴직";
      
    default:
      return "알 수 없음";
  }
};
