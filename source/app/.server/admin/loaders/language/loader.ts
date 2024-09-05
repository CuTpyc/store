import { json,LoaderFunctionArgs } from "@remix-run/node";

import i18nServer from "../../services/i18next.service";

export const changeUserLanguage = async function loader({request}: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  return json({locale});
}

