import { formatDate, parseToDate } from "@sehatq/utils";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Box, VStackProps } from "../../user-interfaces";
import { MyTelemedicine } from "../profile/my-telemedicine-model";
import {
  InfiniteMyTelemedicineCache,
  useGetInfiniteMyTelemedicines,
} from "../profile/my-telemedicine-queries";
import { MyEmptyTelemedicineHistoryList } from "./my-empty-telemedicine-history-list";
import {
  MyTelemedicineHistoryListDesktop,
  MyTelemedicineHistoryListDesktopSkeleton,
} from "./my-telemedicine-history-list-desktop";

import {
  MyTelemedicineHistoryListMobile,
  MyTelemedicineHistoryListMobileSkeleton,
} from "./my-telemedicine-history-list-mobile";

export type MyTelemedicineHistoryListProps = {
  page: string;
  perPage: string;
  userId: string;
  isMobile?: boolean;
} & VStackProps;

function selectTelemeds(cache: InfiniteMyTelemedicineCache) {
  return cache.pages
    .reduce<MyTelemedicine[]>(
      (oldItems, page) => [...oldItems, ...page.data],
      []
    )
    .map((telemed) => ({
      patientName: telemed.patientName,
      hasDoctorNote: telemed.hasDoctorNote,
      doctorNoteId: `${telemed.doctorNoteId ?? ""}`,
      createdAt: formatDate(
        parseToDate(telemed.createdAt, "yyyy-MM-dd HH:mm:ss"),
        "dd MMM yyyy"
      ),
      doctorName: telemed.doctorName,
      speciality: telemed.doctorSpeciality,
      doctorImageUrl: telemed.doctorImageSrc,
      ratingAvg: telemed.doctorRating,
      totalReview: telemed.doctorRatingTotal,
      fileName: "Catatan Dokter.pdf",
      consultationFee: telemed.consultationFee,
      consultationId: telemed.id.toString(),
      hasPrescription: telemed.hasDrugRecommendation,
    }));
}

function selectPagination(cache: InfiniteMyTelemedicineCache) {
  return cache.pages[cache.pages.length - 1].pagination;
}

export function MyTelemedicineHistoryList(
  props: MyTelemedicineHistoryListProps
) {
  const { isMobile } = props;
  const { ref: refInView, inView } = useInView();

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
  } = useGetInfiniteMyTelemedicines(filters, {
    select: selectTelemeds,
  });

  const { data: pagination } = useGetInfiniteMyTelemedicines(filters, {
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
    if (isMobile) return <MyTelemedicineHistoryListMobileSkeleton />;
    return <MyTelemedicineHistoryListDesktopSkeleton {...props} />;
  }

  if (!telemedicines || !telemedicines.length) {
    return (
      <Box {...props}>
        <MyEmptyTelemedicineHistoryList isMobile={isMobile} />
      </Box>
    );
  }

  if (isMobile)
    return (
      <MyTelemedicineHistoryListMobile
        data={telemedicines ?? []}
        refInView={refInView}
        isMaxPage={isMaxPage}
      />
    );

  return (
    <MyTelemedicineHistoryListDesktop
      {...props}
      data={telemedicines ?? []}
      page={pagination ? pagination.page : 1}
      maxPage={pagination ? pagination?.maxPage : 1}
    />
  );
}
