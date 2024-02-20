import { useTranslation } from "react-i18next";
import { useTranslationContext } from "@hooks/index";

export default function useTranslations() {
  const instanceValue = useTranslationContext();

  const options = useTranslation();

  return {
    ...options,
    localize: options.t,
    switchLanguage: instanceValue.switchLanguage,
    currentLang: instanceValue.currentLang,
  };
}
