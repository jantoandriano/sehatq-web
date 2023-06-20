import React from "react";
import { formatDate, parseToDate } from "@sehatq/utils";
import { DoctorNotePopupDesktop } from "./doctor-note-popup-desktop";
import { DoctorNotePopupMobile } from "./doctor-note-popup-mobile";
import { useGetConsultation, ConsultationCache } from "./consultation-queries";
import { useDownloadDoctorNote } from "./doctor-note-queries";

const FORMAT_DATE = "yyyy-MM-dd HH:mm:ss";

export type DoctorNotePopupProps = {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
  consultationId: string;
};

function selectConsultation(consultation: ConsultationCache) {
  const { startedAt, ...data } = consultation.data;
  return {
    ...data,
    patientName: data.summary.name,
    startedAt:
      startedAt &&
      `${formatDate(
        parseToDate(startedAt, FORMAT_DATE),
        "cccc, dd MMM yyyy"
      )}, Pukul ${formatDate(parseToDate(startedAt, FORMAT_DATE), "HH:mm")}`,
  };
}

export function DoctorNotePopup(props: DoctorNotePopupProps) {
  const { isMobile, consultationId, ...otherProps } = props;
  const { data: consultation } = useGetConsultation(
    { consultationId },
    {
      select: selectConsultation,
      enabled: otherProps.isOpen,
    }
  );
  const { mutate, isLoading: isDownloading } = useDownloadDoctorNote();

  function downloadDoctorNote() {
    if (consultation?.doctorNote) {
      mutate({
        consultationId,
        doctorNoteId: consultation.doctorNote.id.toString(),
      });
    }
  }

  const newProps = {
    ...otherProps,
    consultationId,
    consultation,
    isDownloading,
    downloadDoctorNote,
  };

  if (isMobile) {
    return <DoctorNotePopupMobile {...newProps} />;
  }
  return <DoctorNotePopupDesktop {...newProps} />;
}
