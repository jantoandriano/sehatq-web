import React from "react";
import * as Sentry from "@sentry/nextjs";
import NextErrorComponent from "next/error";
import { NextPageContext } from "next";

type CustomErrorComponentProps = {
  statusCode: number;
};

const CustomErrorComponent = (props: CustomErrorComponentProps) => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newrelic = require("newrelic");
    newrelic.noticeError(contextData.err);
  } else {
    window.newrelic.noticeError(contextData.err);
  }

  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
