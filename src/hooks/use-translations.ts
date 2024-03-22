import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { TranslationContext } from "@/provider/index";
import { str as crc32 } from "crc-32";

export default function useTranslations() {
  const instanceValue = useContext(TranslationContext);
  const options = useTranslation();

  const localize = (tString: string, values: Record<string, unknown> = {}) =>
    options.t(crc32(tString).toString(), { defaultValue: tString, ...values });

  if (!instanceValue) {
    throw new Error(
      "useTranslation has to be used within <TranslationContext.Provider>"
    );
  }

  return {
    ...options,
    localize,
    switchLanguage: instanceValue.switchLanguage,
    currentLang: instanceValue.currentLang,
  };
}
