import React from "react";
import { GetServerSideProps } from "next";
import { isMobileDevice } from "@sehatq/utils";
import { ChargePageContainer } from "@components/features/charge";
import { getChargePageProps } from "src/get-props";
import MainLayout from "@components/layout";

type ChargePageProps = {
  isMobile: boolean;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const { token } = query;
  const props = await getChargePageProps({ isMobile, token: token as string });

  if (props.error) {
    return { notFound: true };
  }

  return {
    props: {
      isMobile,
    },
  };
};

export default function ChargePage(props: ChargePageProps) {
  return (
    <>
      <MainLayout>
        <ChargePageContainer {...props} />
      </MainLayout>
    </>
  );
}
