import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { URLS } from "@sehatq/constants";
import { MyTelemedicineHistoryListPage } from "@components/pages/telemedicine";
import {
  getMyTelemedicineHistoryListProps,
  MyTelemedicineHistoryListParams,
  MyTelemedicineHistoryListQuery,
} from "src/get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyTelemedicineHistoryListProps>,
  MyTelemedicineHistoryListParams
> = async ({ query, req }) => {
  if (!req.cookies["token"]) {
    return {
      redirect: {
        permanent: false,
        destination: URLS.EXTERNAL_LOGIN,
      },
    };
  }
  const { page, perPage, userId } = query as MyTelemedicineHistoryListQuery;
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];

  const props = await getMyTelemedicineHistoryListProps({
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

export default function MyTelemedHistoryListPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <MyTelemedicineHistoryListPage isMobile={isMobile} />
    </>
  );
}
