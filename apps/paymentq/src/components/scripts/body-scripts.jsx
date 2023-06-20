import React from "react";
import { ENV } from "@sehatq/constants";

export default function BodyScripts() {
  return (
    <>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe title="gtm" src="${
            "https://www.googletagmanager.com/ns.html?id=" +
            ENV.GTM_ID +
            (ENV.GTM_AUTH && "&gtm_auth=" + ENV.GTM_AUTH) +
            (ENV.GTM_PREVIEW && "&gtm_preview=" + ENV.GTM_PREVIEW) +
            "&gtm_cookies_win=x"
          }" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
    </>
  );
}
