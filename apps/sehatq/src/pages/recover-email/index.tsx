import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice } from "@sehatq/utils";

import { RecoverEmail } from "@components/pages/recover-email";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);

  if (!query["token"]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      isMobile,
    },
  };
};

export default function RecoveryEmailPage({
  isMobile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <RecoverEmail isMobile={isMobile} />;
}
