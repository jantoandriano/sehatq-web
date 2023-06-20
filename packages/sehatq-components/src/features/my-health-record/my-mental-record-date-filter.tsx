import React from "react";

import { useNavigation } from "@sehatq/utils";
import { useDisclosure } from "../../user-interfaces";
import {
  useGetMyMentalRecords,
  MyMentalRecordsCache,
} from "./my-mental-record-queries";
import { MyMentalRecordDateFilterDesktop } from "./my-mental-record-date-filter-desktop";
import { MyMentalRecordDateFilterMobile } from "./my-mental-record-date-filter-mobile";

function selectDateRange(dateRange: MyMentalRecordsCache) {
  return [{ id: "all", label: "Semua" }, ...dateRange?.meta?.filter?.dateRange];
}

export type MyMentalRecordDateFilterProps = {
  isMobile?: boolean;
  dateRange?: string;
  page?: string;
  userId: string;
};

export function MyMentalRecordDateFilter(props: MyMentalRecordDateFilterProps) {
  const { navigate } = useNavigation();
  const { isMobile, dateRange = "all", page, userId } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const query = {
    page: page ? `${page}` : "1",
    perPage: "5",
    dateRange: dateRange && dateRange !== "all" ? `${dateRange}` : "",
    userId,
  };

  const { data: dateRangeList = [] } = useGetMyMentalRecords(query, {
    select: selectDateRange,
  });

  function onDateRangeClick(range: string) {
    navigate("MY_MENTAL_RECORDS", {
      userId,
      dateRange: range !== "all" ? range : "",
    });
    onClose();
  }

  const baseProps = {
    isOpen,
    onClose,
    onOpen,
    dateRange,
    onDateRangeClick,
    dateRangeList,
  };
  if (isMobile) {
    return <MyMentalRecordDateFilterMobile {...baseProps} />;
  }
  return <MyMentalRecordDateFilterDesktop {...baseProps} />;
}
