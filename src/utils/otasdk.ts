import otaClient from "@crowdin/ota-client";
import { ModuleType } from "i18next";

interface CrowdinOtaI18nextModule {
  otaClient: otaClient;
  type: ModuleType;
}

type ReadCallback = (err: unknown, val: Record<string, unknown>) => void;

export default class CrowdinOtaI18next implements CrowdinOtaI18nextModule {
  type: ModuleType;
  otaClient: otaClient;

  constructor(hash: string) {
    this.type = "backend";
    this.otaClient = new otaClient(hash);
  }

  read(language: string, _namespace: string, callback: ReadCallback) {
    this.otaClient
      .getFileTranslations(
        "/content/" + language.toLowerCase() + "/crowdin/messages.json"
      )
      .then((val) => {
        callback(null, val);
      })
      .catch(() => {
        callback(null, {});
      });
  }
}
