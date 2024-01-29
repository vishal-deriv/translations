import { str as crc32 } from "crc-32";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { withI18n } from "../components";
import { isProduction } from ".";

// Translations json
import ach from "../translations/ach.json";
import ar from "../translations/ar.json";
import bn from "../translations/bn.json";
import de from "../translations/de.json";
import es from "../translations/es.json";
import fr from "../translations/fr.json";
import id from "../translations/id.json";
import it from "../translations/it.json";
import ko from "../translations/ko.json";
import pl from "../translations/pl.json";
import pt from "../translations/pt.json";
import ru from "../translations/ru.json";
import si from "../translations/si.json";
import th from "../translations/th.json";
import tr from "../translations/tr.json";
import vi from "../translations/vi.json";
import zh_cn from "../translations/zh_cn.json";
import zh_tw from "../translations/zh_tw.json";

const LANGUAGE_KEY = "i18n_language";
const DEFAULT_LANGUAGE = "EN";
const ALL_LANGUAGES = Object.freeze({
  ACH: "Translations",
  EN: "English",
  ES: "Español",
  DE: "Deutsch",
  FR: "Français",
  ID: "Indonesian",
  IT: "Italiano",
  KO: "한국어",
  PL: "Polish",
  PT: "Português",
  RU: "Русский",
  TR: "Türkçe",
  VI: "Tiếng Việt",
  ZH_CN: "简体中文",
  ZH_TW: "繁體中文",
  TH: "ไทย",
});

export const getAllowedLanguages = () => {
  const allowed_languages = {
    EN: "English",
    ES: "Español",
    DE: "Deutsch",
    KO: "한국어",
    PT: "Português",
    PL: "Polish",
    RU: "Русский",
    FR: "Français",
    IT: "Italiano",
    TH: "ไทย",
    TR: "Türkçe",
    VI: "Tiếng Việt",
    ZH_CN: "简体中文",
    ZH_TW: "繁體中文",
  };
  const exclude_languages = ["ACH"];
  // TODO Change language_list to const when languages are available in prod.
  type Key = keyof typeof ALL_LANGUAGES;
  let language_list = Object.keys(getAllLanguages())
    .filter((key) => !exclude_languages.includes(key))
    .reduce((obj: { [key: string]: string }, key) => {
      obj[key] = getAllLanguages()[key as Key];
      return obj;
    }, {});

  // TODO Remove production check when all languages are available in prod.
  if (isProduction()) language_list = allowed_languages;

  return language_list;
};

const isStaging = () =>
  /staging-app\.deriv\.com/i.test(window.location.hostname);

const isLocal = () => /localhost(:\d+)?$/i.test(window.location.hostname);

const isLanguageAvailable = (lang: string) => {
  if (!lang) return false;

  const selected_language = lang.toUpperCase();
  const is_ach = selected_language === "ACH";

  if (is_ach) return isStaging() || isLocal();

  return Object.keys(getAllowedLanguages()).includes(selected_language);
};

export const getRedirectionLanguage = (preferred_language: string) => {
  const language_query = new URLSearchParams(window.location.search).get(
    "lang"
  );
  const is_language_query_valid =
    language_query && isLanguageAvailable(language_query);
  return is_language_query_valid
    ? language_query
    : preferred_language ?? DEFAULT_LANGUAGE;
};

export const getAllLanguages = () => ALL_LANGUAGES;

export const getInitialLanguage = () => {
  const url_params = new URLSearchParams(window.location.search);
  const query_lang = url_params.get("lang");
  const local_storage_language = localStorage.getItem(LANGUAGE_KEY);

  if (query_lang) {
    const query_lang_uppercase = query_lang.toUpperCase();
    if (isLanguageAvailable(query_lang_uppercase)) {
      localStorage.setItem(LANGUAGE_KEY, query_lang_uppercase);
      return query_lang_uppercase;
    }
  }

  if (local_storage_language) {
    if (isLanguageAvailable(local_storage_language)) {
      return local_storage_language;
    }
  }

  return DEFAULT_LANGUAGE;
};

const loadLanguageJson = async (lang: string) => {
  if (
    !i18next.hasResourceBundle(lang, "translations") &&
    lang.toUpperCase() !== DEFAULT_LANGUAGE
  ) {
    const response = await import(
      /* webpackChunkName: "[request]" */ `../translations/${lang.toLowerCase()}.json`
    );

    const lang_json = response;
    i18next.addResourceBundle(lang, "translations", lang_json);
    document.documentElement.setAttribute("lang", lang);
  }
};

const initial_language = getInitialLanguage();
const i18n_config = {
  resources: {
    ACH: { translations: { ...ach } },
    AR: { translations: { ...ar } },
    BN: { translations: { ...bn } },
    DE: { translations: { ...de } },
    ES: { translations: { ...es } },
    FR: { translations: { ...fr } },
    ID: { translations: { ...id } },
    IT: { translations: { ...it } },
    KO: { translations: { ...ko } },
    PL: { translations: { ...pl } },
    PT: { translations: { ...pt } },
    RU: { translations: { ...ru } },
    SI: { translations: { ...si } },
    TH: { translations: { ...th } },
    TR: { translations: { ...tr } },
    VI: { translations: { ...vi } },
    ZH_CN: { translations: { ...zh_cn } },
    ZH_TW: { translations: { ...zh_tw } },
  },
  react: {
    hashTransKey(defaultValue: string) {
      return crc32(defaultValue);
    },
    useSuspense: true,

  },
  debug: true,
  lng: initial_language,
  fallbackLng: "EN",
  ns: ["translations"],
  defaultNS: "translations",
};

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18n_config);

export const initializeTranslations = async () => {
  if (isStaging() || isLocal()) {
    loadIncontextTranslation();
  }
  await loadLanguageJson(initial_language);
};

export const getLanguage = () => i18next.language || initial_language;

// eslint-disable-next-line no-unused-vars
export const changeLanguage = async (
  lang: string,
  cb: (arg0: string) => void
) => {
  if (isLanguageAvailable(lang)) {
    await loadLanguageJson(lang);
    await i18next.changeLanguage(lang, () => {
      localStorage.setItem(LANGUAGE_KEY, lang);
      cb(lang);
    });
  }
};

// <Localize /> component wrapped with i18n
export const Localize = withI18n(i18next);

export const localize = (string: string, values?: Record<string, unknown>) => {
  if (!string) return "";

  return i18next.t(crc32(string).toString(), { defaultValue: string, ...values });
};

export const loadIncontextTranslation = () => {
  const is_ach = getLanguage().toUpperCase() === "ACH";
  if (is_ach) {
    const jipt = document.createElement("script");
    jipt.type = "text/javascript";
    jipt.text = `
            var _jipt = []; _jipt.push(['project', 'deriv-app']);
            var crowdin = document.createElement("script");
            crowdin.setAttribute('src', '//cdn.crowdin.com/jipt/jipt.js');
            document.head.appendChild(crowdin);
        `;
    document.head.appendChild(jipt);
  }
};

export const i18nInstance = i18next;
