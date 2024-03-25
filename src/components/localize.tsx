import { Trans } from "react-i18next";

type TLocalizeProps = {
  i18n_default_text: string;
  values?: object;
  components?: JSX.Element[];
  options?: Record<string, unknown>;
  shouldUnescape?: boolean;
};

export default function Localize({
  i18n_default_text,
  values,
  components,
  options,
  shouldUnescape,
}: TLocalizeProps) {
  return (
    <Trans
      defaults={i18n_default_text}
      values={values}
      components={components}
      tOptions={options}
      shouldUnescape={shouldUnescape}
    />
  );
}
