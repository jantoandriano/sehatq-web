import { useRouter } from "next/router";
import React from "react";
import { MyTelemedicineHistoryListPageDesktop } from "./my-telemedicine-history-list-desktop";
import { MyTelemedicineHistoryListPageMobile } from "./my-telemedicine-history-list-mobile";

export type MyTelemedicineHistoryListPageProps = {
  isMobile: boolean;
};

export function MyTelemedicineHistoryListPage(
  props: MyTelemedicineHistoryListPageProps
) {
  const router = useRouter();
  const userSelected = (router.query.userId as string) ?? "";
  const otherProps = {
    page: (router.query.page as string) ?? "1",
    perPage: (router.query.perPage as string) ?? "10",
    userId: userSelected == "all" ? "" : userSelected,
  };

  if (props.isMobile) {
    return <MyTelemedicineHistoryListPageMobile {...otherProps} />;
  }

  return <MyTelemedicineHistoryListPageDesktop {...otherProps} />;
}
