// source/libs/tolgee-export/index.ts
import { config } from "./config";
import * as path from "node:path";
import * as fsPromises from "node:fs/promises";
import axios from "axios";
import AdmZip from "adm-zip";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.resolve(ROOT_DIR, config.translationsDir);

const checkDistFolder = async () => {
  try {
    await fsPromises.access(DIST_DIR, fsPromises.constants.W_OK);
  } catch (e) {
    await fsPromises.mkdir(DIST_DIR, { recursive: true });
  }
};

const downloadTranslations = async () => {
  const data = JSON.stringify({
    format: "JSON",
    filterState: ["TRANSLATED", "REVIEWED"],
    structureDelimiter: ".",
    filterNamespace: [""],
    zip: true,
    supportArrays: false,
    messageFormat: "ICU",
  });

  const url = new URL(
    `${config.apiUrl}/v2/projects/${config.projectId}/export`
  );

  const requestConfig = {
    method: "post",
    maxBodyLength: Infinity,
    responseType: "arraybuffer" as const,
    url: url.toString(),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-Key": config.apiKey,
    },
    data: data,
  };

  const response = await axios(requestConfig);

  if (response.status > 299) {
    throw new Error(`Failed to download translations: ${response.status}`);
  }

  return response.data;
};

const extractTranslations = async (data: Buffer) => {
  const zip = new AdmZip(data);
  zip.extractAllTo(DIST_DIR, true);
};

const main = async () => {
  // Check dist folder exists
  await checkDistFolder();

  // Import translations zip from Tolgee
  const buffer = await downloadTranslations();

  // Extract translations zip
  await extractTranslations(buffer);
};

main()
  .then(() => {
    console.log("Done");
  })
  .catch(console.error);
