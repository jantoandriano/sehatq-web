import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ENV } from "@sehatq/constants";

export default class MyDocument extends Document {
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
          <script
            defer
            src={`https://maps.googleapis.com/maps/api/js?libraries=places&key=${ENV.GMAPS_API_KEY}`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
