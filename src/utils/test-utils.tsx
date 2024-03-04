import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { constants } from "@utils/index";
import { TranslationProvider } from "@context/index";

const customRender = (ui: ReactNode, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <TranslationProvider
        defaultLang="EN"
        cdnUrl={
          process.env.REACT_APP_TRANSLATION_CDN_URL as keyof Omit<
            typeof constants.ALL_LANGUAGES,
            "ACH"
          >
        }
      >
        {children}
      </TranslationProvider>
    ),

    ...options,
  });

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
