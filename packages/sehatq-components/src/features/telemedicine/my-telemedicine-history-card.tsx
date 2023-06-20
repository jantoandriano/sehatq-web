import React from "react";

import { useDownloadDoctorNote } from "./doctor-note-queries";
import {
  MyTelemedicineHistoryCardDesktop,
  MyTelemedicineHistoryCardDesktopSkeleton,
} from "./my-telemedicine-history-card-desktop";
import {
  MyTelemedicineHistoryCardGeneralProps,
  MyTelemedicineHistoryCardMobile,
  MyTelemedicineHistoryCardMobileSkeleton,
} from "./my-telemedicine-history-card-mobile";

export type MyTelemedicineHistoryCardProps =
  MyTelemedicineHistoryCardGeneralProps & {
    isMobile?: boolean;
  };

export function MyTelemedicineHistoryCard(
  props: MyTelemedicineHistoryCardProps
) {
  const { mutate, isLoading: isDownloading } = useDownloadDoctorNote();

  function downloadDoctorNote() {
    mutate({
      consultationId: props.consultationId,
      doctorNoteId: props.doctorNoteId.toString(),
    });
  }

  const otherProps = {
    ...props,
    isDownloading,
    downloadDoctorNote,
  };

  if (props.isMobile)
    return <MyTelemedicineHistoryCardMobile {...otherProps} />;
  return <MyTelemedicineHistoryCardDesktop {...otherProps} />;
}

export type MyTelemedicineHistoryCardSkeletonProps = {
  isMobile?: boolean;
};

export function MyTelemedicineHistoryCardSkeleton(
  props: MyTelemedicineHistoryCardSkeletonProps
) {
  if (props.isMobile) return <MyTelemedicineHistoryCardMobileSkeleton />;
  return <MyTelemedicineHistoryCardDesktopSkeleton />;
}
