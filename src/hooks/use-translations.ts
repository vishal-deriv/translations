import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { TranslationContext } from "@context/index";

export default function useTranslations() {
  const instanceValue = useContext(TranslationContext);
  const options = useTranslation();

  if (!instanceValue) {
    throw new Error(
      "useTranslation has to be used within <TranslationContext.Provider>"
    );
  }

  return {
    ...options,
    localize: options.t,
    switchLanguage: instanceValue.switchLanguage,
    currentLang: instanceValue.currentLang,
  };
}
