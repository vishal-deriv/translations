import { I18nextProvider } from "react-i18next";
import Playground from "./Playground";
import { i18nInstance } from "./utils";

import './App.css';

export default function App() {
  return (
    <I18nextProvider i18n={i18nInstance} defaultNS={"translations"}>
      <Playground />
    </I18nextProvider>
  );
}
