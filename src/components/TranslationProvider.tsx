import { I18nextProvider, initReactI18next } from "react-i18next";
import { str as crc32 } from "crc-32";
import i18n from "../i18n";
import i18next from "i18next";


const i18n_config = {
  react: {
    hashTransKey(defaultValue: string) {
      return crc32(defaultValue);
    },
    useSuspense: true,
  },
  debug: true,
  lng: initial_language,
  fallbackLng: "de",
  ns: ["wallets"],
  defaultNS: "wallets",
};

const module = new CrowdinOtaI18next(distribution_hash);

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(module)
  .init(i18n_config);




const initializeI18n = ({ distributionHash }: { distributionHash: string }) => {
  return i18n;
};

export default function TranslationProvider({
  children,
  distributionHash,
}: {
  children: React.ReactNode;
  distributionHash: string;
}) {
  const i18n_instance = initializeI18n({ distributionHash });

  return <I18nextProvider i18n={i18n_instance}>{children}</I18nextProvider>;
}
