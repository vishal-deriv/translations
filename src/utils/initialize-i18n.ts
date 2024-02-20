import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { str as crc32 } from "crc-32";
import { CrowdinOtaSdk } from "@utils/index";
import { initReactI18next } from "react-i18next";
import { getInitialLanguage } from "@utils/index";

const initial_language = getInitialLanguage();

const i18n_config = {
  react: {
    hashTransKey(defaultValue: string) {
      return crc32(defaultValue);
    },
    useSuspense: true,
  },
  debug: true,
  lng: initial_language,
  initImmediate: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
};

export default function initializeI18n({
  distributionHash,
}: {
  distributionHash: string;
}) {
  const module = new CrowdinOtaSdk(distributionHash);

  i18next
    .use(module)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init(i18n_config);

  return i18next;
}
