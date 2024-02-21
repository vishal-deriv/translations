import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { TranslationProvider } from "@/index";

const customRender = (ui: ReactNode, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <TranslationProvider
        defaultLang="EN"
        distributionHash="8fd489eeaec791a315f9e39jxvy"
      >
        {children}
      </TranslationProvider>
    ),

    ...options,
  });

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
