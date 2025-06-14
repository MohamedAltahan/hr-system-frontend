import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import languageIcon from "../../../assets/images/language.svg";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    window.location.reload(); // Reload to apply changes
setTimeout(() => {
          i18n.changeLanguage(newLang); // Tell i18next to switch language

}, 2000);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(language); // Ensure it's in sync
  }, [language, i18n]);

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        toggleLanguage();
      }}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
    >
      <img src={languageIcon} className="w-5 h-5" alt="language" />
      <span>{language === "en" ? "العربية" : "English"}</span>
    </a>
  );
};

export default LanguageSwitcher;
