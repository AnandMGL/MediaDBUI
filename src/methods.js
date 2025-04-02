export const nameSwitcher = (pathname) => {
  const id = pathname.split("/")[2];

  switch (pathname) {
    case "/sign-up":
      return "Ro'yxatdan o'tish";
    case "/sign-in":
      return "Kirish";
    case "/characters":
      return "Belgilar";
    case `/characters/${id}`:
      return `Belgilar: ${id}`;
    case "/fines":
      return "Jarimalar";
    case "/favourites":
      return "Tanlanganlar";
    case "/settings":
      return "Sozlamalar";
    case "/profile":
      return "Shaxsiy kabinet";
    case "/search":
      return "Qidirish";
    case "/real-exam":
      return "Haqiqiy imtihon";
    case "/simple-exam":
      return "Test imtihon";
    case "/marathon":
      return "Marafon";
    case "/tickets":
      return "Biletlar";
    case `/tickets/${id}`:
      return `Bilet: ${id}`;
    case "/road-rules":
      return "Yo'l harakati qoidalari";
    case "/road-rules-new":
      return "Yo'l harakati qoidalari(yangi)";
    default:
      return "";
  }
};

// input debounce function
const tasks = {};

export function debounce(callBack, nameTask, duration = 1000) {
  // get task
  let task = tasks[nameTask];

  // remove timeout if it has
  task && clearTimeout(task);

  // set new task or update
  tasks[nameTask] = setTimeout(callBack, duration);
}

export const timeFormatter = (time) => {
  return new Date(new Date(time).getSeconds() * 1000)
    .toISOString()
    .substring(14, 19);
};

export const toTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

export const sectionName = (section) => {
  switch (section) {
    case 1:
      return "계정 정보";
    case 2:
      return "이력서 관리";
    case 3:
      return "증명서 신청";
    case 4:
      return "급여 명세서 ";
    case 5:
      return "이력서 관리";
    case 6:
      return "지원 현황";
    case 7:
      return "스크랩한 채용정보";
    default:
      return "계정 정보";
  }
};
export const referAnnoun = (pathname) => {
  switch (pathname) {
    case "/reference":
      return "자료실";
    default:
      return "공지사항";
  }
};
