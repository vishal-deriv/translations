import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { TranslationContextProvider } from "@context/index";
import { initializeI18n } from "@utils/index";
import { constants } from "@utils/index";

import type { i18n } from "i18next";

export default function TranslationProvider({
  children,
  cdnUrl,
  defaultLang,
}: {
  children: React.ReactNode;
  cdnUrl: string;
  defaultLang: keyof Omit<typeof constants.ALL_LANGUAGES, "ACH">;
}) {
  const [i18next, seti18Next] = useState<i18n | null>(null);

  useEffect(() => {
    const i18Ins = initializeI18n({ cdnUrl });

    seti18Next(i18Ins);
  }, [cdnUrl]);

  if (!i18next) return null;

  return (
    <I18nextProvider i18n={i18next}>
      <TranslationContextProvider
        defaultLang={defaultLang}
        i18nInstance={i18next}
      >
        {children}
      </TranslationContextProvider>
    </I18nextProvider>
  );
}
