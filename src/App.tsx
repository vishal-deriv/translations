import "./App.css";

import Playground from "./Playground";
import { TranslationProvider } from "@context/index";

export default function App() {
  return (
    <TranslationProvider
      defaultLang="EN"
      distributionHash="8fd489eeaec791a315f9e39jxvy"
    >
      <Playground />
    </TranslationProvider>
  );
}
