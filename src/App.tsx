import "./App.css";

import Playground from "./Playground";
import { constants } from "@utils/index";
import { TranslationProvider } from "@context/index";

export default function App() {
  return (
    <TranslationProvider
      defaultLang="EN"
      cdnUrl={process.env.REACT_APP_TRANSLATION_CDN_URL as keyof Omit<typeof constants.ALL_LANGUAGES, "ACH">}
    >
      <Playground />
    </TranslationProvider>
  );
}
