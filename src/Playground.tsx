/**
 * This is a playground component to test the package functionality.
 */

import { Trans } from "react-i18next";
import { localize } from "@utils/index";
import { Localize } from "@components/index";

import { str as crc32 } from "crc-32";
import React from "react";
import { useTranslations } from "@hooks/index";

const MyComponent = ({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslations();

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <div>Counter: {counter}</div>
      {t(crc32("Reports").toString(), { defaultValue: "Reports" })}
    </div>
  );
};

export default function Playground() {
  const { t, i18n } = useTranslations();

  const [counter, setCounter] = React.useState(0);

  const languages = [
    "ACH",
    "AR",
    "BN",
    "DE",
    "EN",
    "ES",
    "FR",
    "ID",
    "IT",
    "KO",
    "PL",
    "PT",
    "RU",
    "SI",
    "TH",
    "TR",
    "VI",
    "ZH_CN",
    "ZH_TW",
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const platform = "Facebook";

  return (
    <div>
      <div>
        {languages.map((lng) => (
          <button
            className="localisation-playground-m-low localisation-playground-btn"
            key={lng}
            type="button"
            onClick={() => changeLanguage(lng)}
          >
            {lng}
          </button>
        ))}
      </div>
      <div className="localisation-playground-card localisation-playground-bg-lightgray">
        <h1>Normal strings</h1>
        <div>
          <span>
            <code>t</code> string :{" "}
          </span>
          {t(crc32("Reports").toString(), { defaultValue: "Reports" })}
        </div>
        <div>
          <span>
            <code>localize</code> function :{" "}
          </span>
          {localize("Reports")}
        </div>
        <div>
          <span>Trans component : </span>
          <Trans>Reports</Trans>
        </div>
        <div>
          <span>Localize component: </span>
          <Localize i18n_default_text="Reports" />
        </div>
      </div>

      <div className="localisation-playground-card localisation-playground-bg-skyblue">
        <h1>Translation with interpolation</h1>
        <div>
          <span>
            <code>t</code> string :{" "}
          </span>
          {t(crc32(`Create a new {{platform}} password`).toString(), {
            platform,
            defaultValue: "Create a new {{platform}} password",
          })}
        </div>
        <div>
          <span>
            <code>localize</code> function :{" "}
          </span>
          {localize("Create a new {{platform}} password", {
            platform,
          })}
        </div>
        <div>
          <span>Trans component : </span>
          <Trans>Create a new {{ platform }} password</Trans>
        </div>
        <div>
          <span>Localize component: </span>
          <Localize
            i18n_default_text="Create a new {{platform}} password"
            values={{
              platform,
            }}
          />
        </div>
      </div>
      <div className="localisation-playground-card localisation-playground-bg-lightgray">
        <h1>Translation with component</h1>
        <div>
          <span>
            <strong>Localize component : </strong>
          </span>
          <Localize
            i18n_default_text="Earn a range of payouts by correctly predicting market movements with <0>options</0>, or get the upside of CFDs without risking more than your initial stake with <1>multipliers</1>."
            components={[
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
            ]}
          />
        </div>

        <div>
          <span>
            <strong>Trans component : </strong>
          </span>
          <Trans
            defaults="Earn a range of payouts by correctly predicting market movements with <0>options</0>, or get the upside of CFDs without risking more than your initial stake with <1>multipliers</1>."
            components={[
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
            ]}
          />
        </div>

        <div>
          <span>
            <strong>Localize component : </strong>
          </span>
          <Localize
            i18n_default_text="You may also call <0>+447723580049</0> to place your complaint."
            components={[
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
            ]}
          />
        </div>

        <div>
          <span>
            <strong>Trans component : </strong>
          </span>
          <Trans
            defaults="You may also call <0>+447723580049</0> to place your complaint."
            components={[
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
            ]}
          />
        </div>
      </div>

      <div className="localisation-playground-card localisation-playground-bg-coral">
        <h1>Translation with stateful component</h1>
        <div>
          <span>
            <strong>Trans component2 : </strong>
          </span>

          <Trans
            defaults="Earn a range of payouts by correctly predicting market movements with <0>options</0>, or get the upside of CFDs without risking more than your initial stake with <1>multipliers</1>."
            components={[
              <MyComponent counter={counter} setCounter={setCounter} />,
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
            ]}
          />
        </div>
        <div>
          <span>
            <strong>Localize component2 : </strong>
          </span>

          <Localize
            i18n_default_text="Earn a range of payouts by correctly predicting market movements with <0>options</0>, or get the upside of CFDs without risking more than your initial stake with <1>multipliers</1>."
            components={[
              <MyComponent counter={counter} setCounter={setCounter} />,
              <div
                className={`${
                  i18n.language === "EN"
                    ? "localisation-playground-bg-skyblue"
                    : ""
                }`}
              />,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
