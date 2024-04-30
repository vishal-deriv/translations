#!/usr/bin/env node

/* eslint-disable */
const path = require("path");
const crc32 = require("crc-32").str;
const fs = require("fs");
const glob = require("glob");
const DOMParser = require("@xmldom/xmldom").DOMParser;

const getRegexPattern = () =>
  /(i18n_default_text={?|localize\()\s*(['"])\s*(.*?)(?<!\\)\2\s*/gs;

const getStringsFromInput = (input, i18n_marker = getRegexPattern()) => {
  const messages = [];
  let result = i18n_marker.exec(input);

  while (result !== null) {
    const extracted = result[3];
    // Replace escape characters.
    messages.push(extracted.replace(/\\/g, ""));
    result = i18n_marker.exec(input);
  }

  return messages;
};

const getStringsFromXmlFile = (input) => {
  const messages = [];
  const parsed_xml = new DOMParser().parseFromString(input, "application/xml");
  const el_categories = parsed_xml.getElementsByTagName("category");

  Array.from(el_categories).forEach((el_category) => {
    const name = el_category.getAttribute("name");
    const description = el_category.getAttribute("description");

    if (name) messages.push(name);
    if (description) messages.push(description);
  });

  return messages;
};

const getTranslatableFiles = () => {
  const packages_with_translations = [
    "account",
    "appstore",
    "cashier",
    "bot-web-ui",
    "core",
    "cfd",
    "trader",
    "bot-skeleton",
    "reports",
    "shared",
  ];
  const globs = ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/xml/*.xml"];
  const file_paths = [];

  for (let i = 0; i < packages_with_translations.length; i++) {
    for (let j = 0; j < globs.length; j++) {
      let files_found = glob.sync(
        `/${packages_with_translations[i]}/src/${globs[j]}`,
        {
          root: path.resolve(__dirname, "../.."), // deriv-app/packages/
        }
      );
      files_found = files_found.filter(
        (file_path) => file_path.indexOf("__tests__") === -1
      );
      file_paths.push(...files_found);
    }
  }

  return file_paths;
};

/** *********************************************
 * Common
 */
const getKeyHash = (string) => crc32(string);

/** **********************************************
 * Compile
 */
(async () => {
  try {
    const file_paths = getTranslatableFiles();
    const messages = [];
    const messages_json = {};

    // Iterate over files and extract all strings from the i18n marker
    for (let i = 0; i < file_paths.length; i++) {
      const file_path = file_paths[i];

      try {
        const file = fs.readFileSync(file_path, "utf8");
        messages.push(
          ...(file_path.endsWith("xml")
            ? getStringsFromXmlFile(file)
            : getStringsFromInput(file))
        );
      } catch (e) {
        console.log(e);
      }
    }

    // Hash the messages and set the key-value pair for json
    for (let i = 0; i < messages.length; i++) {
      messages_json[getKeyHash(messages[i])] = messages[i];
    }

    // Add to messages.json
    fs.writeFileSync(
      path.resolve(__dirname, "../crowdin/messages.json"),
      JSON.stringify(messages_json),
      "utf8",
      (err) => console.log(err)
    );
  } catch (e) {
    console.error(e);
  }
})();
