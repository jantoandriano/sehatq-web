import React, { useState } from "react";
import { formatDate, parseToDate, useNavigation } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useGetFamilyMembers } from "../profile/family-members-queries";
import { useDisclosure } from "../../user-interfaces";
import { useGetConsultation, ConsultationCache } from "./consultation-queries";
import { ConsultationHistoryDesktop } from "./consultation-history-desktop";
import { ConsultationHistoryMobile } from "./consultation-history-mobile";

export type ConsultationHistoryProps = {
  isMobile?: boolean;
  consultationId: string;
};

function selectConsultation(consultation: ConsultationCache) {
  return consultation.data;
}

export function ConsultationHistory(props: ConsultationHistoryProps) {
  const { isMobile, consultationId } = props;
  const [showChatAgain, setShowChatAgain] = useState(false);
  const { data: families } = useGetFamilyMembers({ includeMe: "1" });
  const { data: consultation } = useGetConsultation(
    { consultationId },
    { select: selectConsultation }
  );
  const doctorNotePopup = useDisclosure();
  const { navigate } = useNavigation();

  const startedDate = consultation?.startedAt
    ? parseToDate(consultation.startedAt, "yyyy-MM-dd HH:mm:ss")
    : null;

  function onHandleChatAgain() {
    if (consultation?.isFreeChat) {
      setShowChatAgain(true);
    } else {
      navigate("TELEMED_DOCTOR", { slug: consultation?.doctor?.slug });
    }
  }

  const selectedFamily =
    consultation && families
      ? families.find((family) => family.id === consultation.patientId)
      : null;

  const otherProps = {
    onHandleChatAgain,
    showChatAgain,
    onClose: () => setShowChatAgain(false),
    consultationId,
    doctorNotePopup,
    sendbirdProfile: selectedFamily
      ? {
          appId: ENV.SEHATQ_SENDBIRD_APP_ID,
          userId: selectedFamily.sendbirdUserId,
          accessToken: selectedFamily.sendbirdAccessToken,
        }
      : null,
    channelUrl: consultation?.sbChannelUrl ?? null,
    doctor: consultation?.doctor
      ? {
          id: consultation.doctor.id.toString(),
          name: consultation.doctor.name,
          slug: consultation.doctor.slug,
          imageUrl: consultation.doctor.photoUrl,
          speciality: consultation.doctor.speciality.name,
        }
      : null,
    consultation: consultation
      ? {
          hasDoctorNote: Boolean(consultation.doctorNote),
          hasRecommendation: Boolean(consultation.recommendation),
          startedAt: startedDate
            ? `${
                (formatDate(startedDate, "EEEE"),
                formatDate(startedDate, "dd LLL yyyy"))
              }, Pukul ${formatDate(startedDate, "kk:mm")}`
            : "",
          expireAt: consultation?.expire
            ? formatDate(
                parseToDate(consultation.expire, "yyyy-MM-dd HH:mm:ss"),
                "d MMMM yyyy HH:mm"
              )
            : "",
          duration: consultation.duration ?? 0,
        }
      : null,
  };

  if (isMobile) {
    return <ConsultationHistoryMobile {...otherProps} />;
  }
  return <ConsultationHistoryDesktop {...otherProps} />;
}
