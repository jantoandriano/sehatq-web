import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { URLS } from "@sehatq/constants";
import { MyBookedTelemedicineListPage } from "@components/pages/telemedicine";

import {
  getMyBookedTelemedicineListProps,
  MyBookedTelemedicineListParams,
  MyBookedTelemedicineListQuery,
} from "src/get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyBookedTelemedicineListProps>,
  MyBookedTelemedicineListParams
> = async ({ query, req }) => {
  if (!req.cookies["token"]) {
    return {
      redirect: {
        permanent: false,
        destination: URLS.EXTERNAL_LOGIN,
      },
    };
  }
  const { page, perPage, userId } = query as MyBookedTelemedicineListQuery;
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const props = await getMyBookedTelemedicineListProps({
    page,
    perPage,
    isMobile,
    userId,
    cookie,
  });

  return {
    props,
  };
};

export default function MyBookedTelemedListPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <MyBookedTelemedicineListPage isMobile={isMobile} />
    </>
  );
}
