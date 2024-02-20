import { createContext, useState } from "react";
import type { i18n as Ti18n } from "i18next";

const LANGUAGE_KEY = "i18n_language";

export const TranslationContext = createContext<{
  currentLang: string;
  switchLanguage: (lang: string) => void;
} | null>(null);

export default function TranslationContextProvider({
  defaultLang,
  i18nInstance,
  children,
}: {
  defaultLang?: string;
  i18nInstance: Ti18n;
  children: React.ReactNode;
}) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLang || "");

  const switchLanguage = (lang: string) => {
    i18nInstance.changeLanguage(lang);

    setCurrentLanguage(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  return (
    <TranslationContext.Provider
      value={{
        currentLang: currentLanguage,
        switchLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
