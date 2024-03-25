import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { TranslationProvider } from "@/provider/index";
import { initializeI18n } from "@/utils/index";

const customRender = (ui: ReactNode, options = {}) => {
  const i18n = initializeI18n({
    cdnUrl: import.meta.env.VITE_TRANSLATION_CDN_URL as string,
  });

  return render(ui, {
    wrapper: ({ children }) => (
      <TranslationProvider defaultLang="EN" i18nInstance={i18n}>
        {children}
      </TranslationProvider>
    ),

    ...options,
  });
};

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
