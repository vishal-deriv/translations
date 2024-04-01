import {
  RenderHookResult,
  RenderResult,
  render,
  renderHook,
} from "@testing-library/react";
import { TranslationProvider, initializeI18n } from "@/index";

import type { i18n } from "i18next";

const i18nInstance = initializeI18n({ cdnUrl: "" });

const wrapper = ({
  children,
  i18nIns,
}: {
  children: React.ReactNode;
  i18nIns: typeof i18nInstance;
}) => (
  <TranslationProvider defaultLang="EN" i18nInstance={i18nIns}>
    {children}
  </TranslationProvider>
);

export const customRender = (
  component: React.ReactNode
): RenderResult & { i18nIns: i18n } => {
  const i18nIns = i18nInstance.cloneInstance();

  const options = render(component, {
    wrapper: ({ children }) => wrapper({ children, i18nIns }),
  });

  return {
    ...options,
    i18nIns,
  };
};

export const customRenderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult
): RenderHookResult<TResult, TProps> & { i18nIns: i18n } => {
  const i18nIns = i18nInstance.cloneInstance();

  const options = renderHook(callback, {
    wrapper: ({ children }) => wrapper({ children, i18nIns }),
  });

  return {
    ...options,
    i18nIns,
  };
};
