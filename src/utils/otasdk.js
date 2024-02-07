import otaClient from "@crowdin/ota-client";

export const distribution_hash = "8fd489eeaec791a315f9e39jxvy";

class CrowdinOtaI18next {
  constructor(hash) {
    this.type = "backend";
    this.otaClient = new otaClient(hash);
  }

  read(language, namespace = '', callback) {
    console.log('namespace ========> this is my namespace', namespace);
    this.otaClient.getFileTranslations('/content/' + language.toLowerCase() + (namespace !== 'translations' ? '/' + namespace: '') + '/crowdin/messages.json').then(val => {
      // console.log({val, val, val});
      callback(null, val);
    })
    // this.otaClient
    //   .getStringsByLocale(language.toLowerCase())
    //   .then((value) => {
    //     callback(null, value);
    //   })
    //   .catch((e) => callback(e, null));
  }
}

export default CrowdinOtaI18next;
