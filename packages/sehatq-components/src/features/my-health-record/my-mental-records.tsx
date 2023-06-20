import React, { useRef, useState } from "react";
import { FocusableElement } from "@chakra-ui/utils";

import { MyMentalRecordsDesktop } from "./my-mental-records-desktop";
import { MyMentalRecordsMobile } from "./my-mental-records-mobile";
import {
  useGetMyMentalRecords,
  MyMentalRecordsCache,
  useRemoveMyMentalRecord,
} from "./my-mental-record-queries";

export type MyMentalRecordsProps = {
  isMobile: boolean;
  page?: string;
  userId: string;
  dateRange?: string;
};

function selectData(MyMentalRecords: MyMentalRecordsCache) {
  return MyMentalRecords;
}

export function MyMentalRecords(props: MyMentalRecordsProps) {
  const { isMobile, page, userId, dateRange } = props;
  const removeMentalRecordMutation = useRemoveMyMentalRecord();
  const [deleteMentalId, setDeleteMentalId] = useState<number | null>(null);

  const cancelConfirmationDeleteRef = useRef<unknown>();

  const query = {
    page: page ? page : "1",
    perPage: "5",
    userId,
    dateRange: dateRange && dateRange !== "all" ? `${dateRange}` : "",
  };

  const {
    data: mentalRecords,
    isLoading,
    error,
    refetch: refetchMyMentalRecords,
  } = useGetMyMentalRecords(query, {
    select: selectData,
  });

  function showConfirmationDelete(mentalId: number) {
    setDeleteMentalId(mentalId);
  }

  function hideConfirmationDelete() {
    setDeleteMentalId(null);
  }

  function confirmDelete() {
    if (deleteMentalId) {
      removeMentalRecordMutation.mutate(
        {
          mentalId: deleteMentalId,
        },
        {
          onError: () => {
            hideConfirmationDelete();
          },
          onSuccess: () => {
            hideConfirmationDelete();
            refetchMyMentalRecords();
          },
        }
      );
    }
  }

  const labelRange = mentalRecords?.meta?.filter?.dateRange.find(
    (range) => range.id === dateRange
  );

  const otherProps = {
    isLoading,
    mentalRecords: error ? [] : mentalRecords?.data ?? [],
    labelRange: labelRange?.label ?? "Semua",
    page: query.page,
    maxPage: `${mentalRecords?.meta.pagination.maxPage}` ?? "1",
    userId,
    dateRange,
    isShowConfirmationDelete: !!deleteMentalId,
    cancelConfirmationDeleteRef:
      cancelConfirmationDeleteRef as React.MutableRefObject<FocusableElement>,
    showConfirmationDelete,
    hideConfirmationDelete,
    confirmDelete,
  };

  if (isMobile) {
    return <MyMentalRecordsMobile {...otherProps} />;
  }

  return <MyMentalRecordsDesktop {...otherProps} />;
}
