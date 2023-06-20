import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { MyTelemedicinesParams, getMyTelemedicinesProps } from "@get-props";
import { MyTelemedicines } from "@components/pages/profile";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyTelemedicinesProps>,
  MyTelemedicinesParams
> = async ({ params, req }) => {
  const { userId = "" } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getMyTelemedicinesProps({
      userId,
      isMobile,
      cookie: req.headers["cookie"] ?? "",
    }),
  };
};

export default function MyTelemedicinesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <MyTelemedicines isMobile={isMobile} />
    </>
  );
}
