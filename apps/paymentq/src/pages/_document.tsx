import React from "react";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";
import BodyScripts from "@components/scripts/body-scripts";
import { ENV } from "src/constants";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require("newrelic");

export default class MyDocument extends Document {
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
    return (
      <Html lang="id">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap"
          />
        </Head>
        <body>
          <BodyScripts />
          <Main />
          <NextScript />
          <Script
            strategy="beforeInteractive"
            id="midtrans-script"
            type="text/javascript"
            src="https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js"
            data-environment={ENV.MIDTRANS_ENV}
            data-client-key={ENV.MIDTRANS_CLIENT_KEY}
          />
        </body>
      </Html>
    );
  }
}
