import { formatDate, parseToDate } from "@sehatq/utils";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Box, VStackProps } from "../../user-interfaces";
import { MyEmptyBookedTelemedicineList } from "./my-empty-booked-telemedicine";
import {
  MyBookedTelemedicineListMobile,
  MyBookedTelemedicineListMobileSkeleton,
} from "./my-booked-telemedicine-list-mobile";
import {
  InfiniteMyBookedTelemedicinesCache,
  useGetInfiniteMyBookedTelemedicines,
} from "./my-booked-telemedicine-queries";
import { MyBookedTelemedicine } from "./my-booked-telemedicine-model";
import {
  MyBookedTelemedicineListDesktop,
  MyBookedTelemedicineListDesktopSkeleton,
} from "./my-booked-telemedicine-list-desktop";

export type MyBookedTelemedicineListProps = {
  page: string;
  perPage: string;
  userId: string;
  isMobile?: boolean;
} & VStackProps;

function selectTelemeds(cache: InfiniteMyBookedTelemedicinesCache) {
  return cache.pages
    .reduce<MyBookedTelemedicine[]>(
      (oldItems, page) => [...oldItems, ...page.data],
      []
    )
    .map((telemed) => ({
      patientName: telemed.patientName,
      createdAt: formatDate(
        parseToDate(telemed.createdAt, "yyyy-MM-dd HH:mm:ss"),
        "dd MMM yyyy"
      ),
      doctorName: telemed.doctorName,
      speciality: telemed.speciality,
      doctorImageUrl: telemed.doctorImageUrl,
      consultationId: telemed.id.toString(),
      status:
        telemed.status == "init"
          ? "unfilled"
          : telemed.isOngoing
          ? "start"
          : ("filled" as "unfilled" | "filled" | "start"),
      bookingStartDate: telemed.bookingStartDate,
      bookingStartTime: telemed.bookingStartTime,
    }));
}

function selectPagination(cache: InfiniteMyBookedTelemedicinesCache) {
  return cache.pages[cache.pages.length - 1].pagination;
}

export function MyBookedTelemedicineList(props: MyBookedTelemedicineListProps) {
  const { ref: refInView, inView } = useInView();
  const { isMobile } = props;

  const filters = {
    page: props.page ?? "1",
    perPage: props.perPage ?? "10",
    userId: props.userId ?? "",
  };

  const {
    fetchNextPage,
    isFetchingNextPage,
    data: telemedicines,
    isLoading,
  } = useGetInfiniteMyBookedTelemedicines(filters, {
    select: selectTelemeds,
  });

  const { data: pagination } = useGetInfiniteMyBookedTelemedicines(filters, {
    select: selectPagination,
  });

  const isMaxPage =
    pagination?.total == 0 || pagination?.page == pagination?.maxPage;

  useEffect(() => {
    if (inView && !isFetchingNextPage && !isMaxPage && isMobile) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, isMaxPage, fetchNextPage, isMobile]);

  if (isLoading) {
    if (isMobile) return <MyBookedTelemedicineListMobileSkeleton />;
    return <MyBookedTelemedicineListDesktopSkeleton {...props} />;
  }

  if (!telemedicines || !telemedicines.length) {
    return (
      <Box {...props}>
        <MyEmptyBookedTelemedicineList isMobile={isMobile} />
      </Box>
    );
  }

  if (isMobile)
    return (
      <MyBookedTelemedicineListMobile
        data={telemedicines ?? []}
        refInView={refInView}
        isMaxPage={isMaxPage}
      />
    );

  return (
    <MyBookedTelemedicineListDesktop
      {...props}
      data={telemedicines ?? []}
      page={pagination ? pagination.page : 1}
      maxPage={pagination ? pagination?.maxPage : 1}
    />
  );
}
