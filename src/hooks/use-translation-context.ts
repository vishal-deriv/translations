import { useContext } from "react";
import { TranslationContext } from "@context/index";

export default function useTranslationContext() {
  const instanceValue = useContext(TranslationContext);

  if (!instanceValue) {
    throw new Error(
      "useTranslation has to be used within <TranslationContext.Provider>"
    );
  }

  return instanceValue;
}
