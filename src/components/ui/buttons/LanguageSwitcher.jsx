import { useState, useEffect } from "react";
import languageIcon  from "../../../assets/images/language.svg"; 


const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    window.location.reload(); // Optional: reload to reapply changes
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <a
      href="#"
      onClick={toggleLanguage}
      className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
    >
      <img src={languageIcon} className="w-5 h-5" alt="language" />
      <span>{language === "en" ? "العربية" : "English"}</span>
    </a>
  );
};

export default LanguageSwitcher;
