import React, { useState, useRef } from "react";
import { formatDate, parseToDate, useNavigation } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useGetFamilyMembers } from "../profile/family-members-queries";
import { SendbirdAction } from "../chat/sendbird-chat";
import { useGetConsultation, ConsultationCache } from "./consultation-queries";
import { ConsultationDesktop } from "./consultation-desktop";
import { ConsultationMobile } from "./consultation-mobile";

export type ConsultationProps = {
  isMobile?: boolean;
  consultationId: string;
};

function selectConsultation(consultation: ConsultationCache) {
  return consultation.data;
}

export function Consultation(props: ConsultationProps) {
  const { isMobile, consultationId } = props;
  const [statePopup, setStatePopup] = useState<
    | "end"
    | "prescription"
    | "rating"
    | "expired"
    | "doctor-ended"
    | "chat-again"
    | null
  >(null);
  const [isExpired, setExpired] = useState(false);
  const refSendbirdChat = useRef<SendbirdAction | null>(null);
  const refHasChatScreen = useRef<boolean>(false);
  const { data: families } = useGetFamilyMembers({ includeMe: "1" });
  const { data: consultation, refetch } = useGetConsultation(
    { consultationId },
    { select: selectConsultation }
  );
  const { navigate } = useNavigation();

  if (!refHasChatScreen.current && consultation?.screen === "chat") {
    refHasChatScreen.current = true;
  }

  async function onChatEnded(by?: "receiver" | "sender") {
    await refetch();
    setStatePopup(by === "sender" ? "doctor-ended" : "end");
  }

  async function onTimeIsUp(count: number) {
    if (count === 0 && refHasChatScreen.current) {
      setTimeout(async () => {
        await refetch();
        setStatePopup("expired");
        setExpired(true);
      }, 500);
    }
  }

  function onHandleChatAgain() {
    if (consultation?.isFreeChat) {
      setStatePopup("chat-again");
    } else {
      navigate("TELEMED_DOCTOR", { slug: consultation?.doctor?.slug });
    }
  }

  const selectedFamily =
    consultation && families
      ? families.find((family) => family.id === consultation.patientId)
      : null;

  const otherProps = {
    onChatEnded,
    onHandleChatAgain,
    consultationId,
    refSendbirdChat,
    shownPopup: statePopup,
    setShownPopup: setStatePopup,
    hasChatScreen: refHasChatScreen.current,
    sendbirdProfile: selectedFamily
      ? {
          appId: ENV.SEHATQ_SENDBIRD_APP_ID,
          userId: selectedFamily.sendbirdUserId,
          accessToken: selectedFamily.sendbirdAccessToken,
        }
      : null,
    consultation:
      consultation && selectedFamily
        ? {
            patientName: selectedFamily.name,
            screen: consultation.screen,
            status: consultation.status,
            startedAt: parseToDate(
              consultation.startedAt,
              "yyyy-MM-dd HH:mm:ss"
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            channelUrl: consultation.sbChannelUrl,
            canVideoCall: consultation.canVideoCall,
            isExpired: !isExpired
              ? consultation.remainingConsultationDuration == 0
              : isExpired,
            symptom: consultation.summary.symptom,
            expireAt: consultation?.expire
              ? formatDate(
                  parseToDate(consultation.expire, "yyyy-MM-dd HH:mm:ss"),
                  "d MMM yyyy HH:mm"
                )
              : undefined,
            isFreeChat: consultation.isFreeChat,
          }
        : null,
    doctor: consultation?.doctor
      ? {
          id: consultation.doctor.id.toString(),
          name: consultation.doctor.name,
          slug: consultation.doctor.slug,
          imageUrl: consultation.doctor.photoUrl,
          speciality: consultation.doctor.speciality.name,
        }
      : null,
    countDown: consultation
      ? {
          startCount: consultation.remainingConsultationDuration,
          tickCallback: onTimeIsUp,
        }
      : undefined,
  };

  if (isMobile) {
    return <ConsultationMobile {...otherProps} />;
  }
  return <ConsultationDesktop {...otherProps} />;
}
