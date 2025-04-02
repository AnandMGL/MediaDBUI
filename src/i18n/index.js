import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { dispatch } from "../store";
import { setMainLang } from "../actions/lang";

i18n.use(initReactI18next).init({
  resources: {
    uz: {},
    en: {
      translation: {
        Asosiy: "Home",
        Belgilar: "Characters",
        Qidirish: "Search",
        Jarimalar: "Fines",
        Tanlanganlar: "Favourites",
        Sozlamalar: "Settings",
        "Shaxsiy kabinet": "Profile",
        Kirish: "Login",
        "Ro'yxatdan o'tish": "Sign up",
      },
    },
    ru: {
      translation: {
        Asosiy: "Основной",
        Belgilar: "Знаки",
        Qidirish: "Поиск",
        Jarimalar: "Штрафы",
        Tanlanganlar: "Избранные",
        Sozlamalar: "Настройки",
        "Shaxsiy kabinet": "Личный кабинет",
        Kirish: "Авторизоваться",
        "Ro'yxatdan o'tish": "Зарегистрироваться",
      },
    },
  },
  lng: localStorage.getItem("lang") || "uz",
  interpolation: {
    escapeValue: false,
  },
});

export function setCurrentLang(lang = "uz") {
  i18n.changeLanguage(lang);
  dispatch(setMainLang(lang));
}

export default i18n;
