import React from "react";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ENV } from "@sehatq/constants";
import Script from "next/script";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require("newrelic");

type DocumentProps = {
  browserTimingHeader: string;
};
export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    return {
      ...initialProps,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      browserTimingHeader,
    };
  }

  render() {
    const { browserTimingHeader } = this.props;

    return (
      <Html lang="id">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${ENV.GTM_ID}&gtm_auth=${ENV.GTM_AUTH}&gtm_preview=${ENV.GTM_PREVIEW}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />
          <Script
            id="newrelic-beforeInteractive"
            dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
            strategy="beforeInteractive"
          ></Script>
        </body>
      </Html>
    );
  }
}
