import { useRouter } from "next/router";
import React from "react";
import { MyBookedTelemedicineListPageDesktop } from "./my-booked-telemedicine-list-desktop";
import { MyBookedTelemedicineListPageMobile } from "./my-booked-telemedicine-list-mobile";

export type MyBookedTelemedicineListPageProps = {
  isMobile: boolean;
};

export function MyBookedTelemedicineListPage(
  props: MyBookedTelemedicineListPageProps
) {
  const router = useRouter();
  const userSelected = (router.query.userId as string) ?? "";
  const otherProps = {
    page: (router.query.page as string) ?? "1",
    perPage: (router.query.perPage as string) ?? "10",
    userId: userSelected == "all" ? "" : userSelected,
  };

  if (props.isMobile) {
    return <MyBookedTelemedicineListPageMobile {...otherProps} />;
  }

  return <MyBookedTelemedicineListPageDesktop {...otherProps} />;
}
