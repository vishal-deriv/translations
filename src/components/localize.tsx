import { i18n } from "i18next";
import { Trans } from "react-i18next";

type TLocalizeProps = {
  i18n_default_text: string;
  values?: object;
  components?: JSX.Element[];
  options?: Record<string, unknown>;
  i18n: i18n;
  shouldUnescape?: boolean;
};

const Localize = ({
  i18n_default_text,
  values,
  components,
  options,
  i18n,
  shouldUnescape,
}: TLocalizeProps) => (
  <Trans
    i18n={i18n}
    defaults={i18n_default_text}
    values={values}
    components={components}
    tOptions={options}
    shouldUnescape={shouldUnescape}
  />
);

// Trans needs to have the i18n instance in scope
const withI18n = (i18n: i18n) => (props: Omit<TLocalizeProps, "i18n">) =>
  <Localize i18n={i18n} {...props} />;

export default withI18n;
