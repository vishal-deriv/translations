import { str as crc32 } from "crc-32";
import i18next from "i18next";

/**
 * @deprecated use the `localize` function from the `useTranslations` hook
 *
 * @param {string} string
 * @param {Record<string, unknown>} values
 * @returns {string}
 */
export default function localize(
  string: string,
  values?: Record<string, unknown>
) {
  if (!string) return "";

  return i18next.t(crc32(string).toString(), {
    defaultValue: string,
    ...values,
  });
}
