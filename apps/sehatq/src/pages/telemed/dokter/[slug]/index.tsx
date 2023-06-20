import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { TelemedicineHCPParams, getTelemedicineHCPProps } from "@get-props";
import { TelemedicineHCP } from "@components/pages/telemedicine";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTelemedicineHCPProps>,
  TelemedicineHCPParams
> = async ({ params, req }) => {
  const { slug } = params ?? {};

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getTelemedicineHCPProps({
    isMobile,
    slug: `${slug}`,
    cookie: req.headers["cookie"],
  });

  if (props.error) {
    return { notFound: true };
  }
  return {
    props,
  };
};

export default function TelemedicineHCPPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <TelemedicineHCP isMobile={isMobile} />;
}
