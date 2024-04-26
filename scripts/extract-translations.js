const crc32 = require("crc-32").str;
const glob = require("glob");
const fs = require("fs");

const getRegexPattern = () =>
  /(i18n_default_text={?|localize\()\s*(['"])\s*(.*?)(?<!\\)\2\s*/gs;

const getStringsFromInput = (input, i18n_marker = getRegexPattern()) => {
  const messages = [];

  let continue_loop = true;
  while (continue_loop) {
    const result = i18n_marker.exec(input);
    if (result == null) continue_loop = false;
    else {
      const extracted = result[3];
      // Replace escape characters.
      messages.push(extracted.replace(/\\/g, ""));
    }
  }

  return messages;
};

const getTranslatableFiles = () => {
  const globs = ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"];
  const file_paths = [];

  for (let j = 0; j < globs.length; j++) {
    let files_found = glob.sync(
      `${process.env.GITHUB_WORKSPACE}/src/${globs[j]}`
    );
    files_found = files_found.filter(
      (file_path) => file_path.indexOf("__tests__") === -1
    );
    file_paths.push(...files_found);
  }

  return file_paths;
};

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
      console.log(file_paths[i]);

      try {
        const file = fs.readFileSync(file_paths[i], "utf8");
        messages.push(...getStringsFromInput(file));
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
      `${process.env.GITHUB_WORKSPACE}/crowdin/messages.json`,
      JSON.stringify(messages_json),
      "utf8",
      (err) => console.log(err)
    );
  } catch (e) {
    console.error(e);
  }
})();
