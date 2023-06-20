import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { getProfileProps } from "@get-props";
import { Profile } from "@components/pages/profile";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getProfileProps>
> = async ({ req }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return { props: await getProfileProps({ isMobile }) };
};

export default function ProfilePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <Profile isMobile={isMobile} />
    </>
  );
}
