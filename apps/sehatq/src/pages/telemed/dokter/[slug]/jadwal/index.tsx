import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { TelemedicineHCPSchedules } from "@components/pages/telemedicine";
import {
  TelemedicineHCPParams,
  getTelemedicineHCPSchedulesProps,
} from "src/get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTelemedicineHCPSchedulesProps>,
  TelemedicineHCPParams
> = async ({ params, req, res }) => {
  const { slug = "" } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getTelemedicineHCPSchedulesProps({
    isMobile,
    slug: `${slug}`,
  });

  if (!props.hasBookingChannel) {
    return {
      redirect: {
        destination: `/telemed/dokter/${slug}`,
        permanent: false,
      },
    };
  }

  if (props.error || !props.hasSchedule) {
    res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
    return { notFound: true };
  } else {
    res.setHeader(
      "Cache-Control",
      `s-maxage=${30 * 60}, stale-while-revalidate`
    );
  }

  return {
    props,
  };
};

export default function TelemedicineHCPSchedulesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <TelemedicineHCPSchedules isMobile={isMobile} />;
}
