import React, { useRef, useState } from "react";
import { parseToDate } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import {
  Center,
  ConsultationIntro,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MoreIcon,
  RepeatIcon,
  Spinner,
} from "@sehatq/components";
import {
  SendbirdAction,
  SendbirdChat,
} from "@sehatq/components/src/features/chat/sendbird-chat";
import { useAuth } from "src/contexts/auth";
import { ChatErrorBoundary } from "../chat";
import { ConsultationCache, useGetConsultation } from "./consultation-queries";
import { EndConsultationPopup } from "./end-consultation-popup";
import { DoneConsultationPopup } from "./done-consultation-popup";

export type ConsultationChatProps = {
  consultationId: string;
};

function selectConsultation(consultation: ConsultationCache) {
  return consultation.data;
}

export function ConsultationChat(props: ConsultationChatProps) {
  const { consultationId } = props;
  const { user } = useAuth();
  const [statePopup, setStatePopup] = useState<
    "end" | "expired" | "done" | null
  >(null);
  const refSendbirdChat = useRef<SendbirdAction | null>(null);
  const refHasChatScreen = useRef<boolean>(false);
  const {
    data: dataConsultation,
    isLoading: isLoadingConsultation,
    refetch: refetchConsultation,
  } = useGetConsultation({ consultationId }, { select: selectConsultation });

  async function onChatEnded() {
    await refetchConsultation();
    setStatePopup("done");
  }

  async function onTimeIsUp(count: number) {
    if (count === 0 && refHasChatScreen.current) {
      await refetchConsultation();
      setStatePopup("expired");
    }
  }

  function onRefresh() {
    refetchConsultation({ cancelRefetch: true });
  }

  const consultation = dataConsultation
    ? {
        patientName: user.name,
        screen: dataConsultation.screen,
        status: dataConsultation.status,
        startedAt: parseToDate(
          dataConsultation.startedAt,
          "yyyy-MM-dd HH:mm:ss"
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        channelUrl: dataConsultation.sbChannelUrl,
        canVideoCall: dataConsultation.canVideoCall,
        isExpired: dataConsultation.remainingConsultationDuration - 120 <= 0,
        symptom: dataConsultation.summary.symptom,
        recomendation: dataConsultation.recommendation,
      }
    : null;

  const doctor = dataConsultation?.doctor
    ? {
        id: dataConsultation.doctor.id.toString(),
        name: dataConsultation.doctor.name,
        slug: dataConsultation.doctor.slug,
        imageUrl: dataConsultation.doctor.photoUrl,
        speciality: dataConsultation.doctor.speciality.name,
      }
    : null;

  const sendbirdProfile = dataConsultation
    ? {
        appId: ENV.SEHATQ_SENDBIRD_APP_ID,
        userId: user.sbUserId,
        accessToken: user.sbtoken,
      }
    : null;

  const countDown = dataConsultation
    ? {
        startCount:
          dataConsultation.remainingConsultationDuration > 120
            ? dataConsultation.remainingConsultationDuration - 120
            : 0,
        tickCallback: onTimeIsUp,
      }
    : undefined;

  const isEnded = consultation
    ? consultation.screen === "rating" || consultation.status === "closed"
    : false;

  if (!refHasChatScreen.current && consultation?.screen === "chat") {
    refHasChatScreen.current = true;
  }

  if (isLoadingConsultation) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (
    consultation &&
    consultation.channelUrl &&
    sendbirdProfile &&
    doctor &&
    countDown
  ) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="start"
        h="100vh"
        w="100%"
        overflow="hidden"
      >
        <ChatErrorBoundary>
          <SendbirdChat
            ref={refSendbirdChat}
            isMobile
            countDown={countDown}
            {...sendbirdProfile}
            channelUrl={consultation.channelUrl}
            isHistory={isEnded}
            doctor={doctor}
            onChatEnded={onChatEnded}
            header={{
              showVideoCallIcon: false,
              ...(!isEnded && {
                rightElement: (
                  <Flex alignItems="center" gap={1}>
                    <IconButton
                      icon={
                        <RepeatIcon
                          width="20px"
                          height="20px"
                          color="sea.500"
                        />
                      }
                      variant="ghost"
                      aria-label="refresh"
                      onClick={onRefresh}
                    />
                    <Menu size="sm">
                      <MenuButton
                        as={IconButton}
                        variant="fit"
                        aria-label="more option"
                        icon={<MoreIcon width="28px" height="28px" />}
                      />
                      <MenuList>
                        <MenuItem
                          onClick={() => setStatePopup("end")}
                          fontSize="xs"
                          fontWeight="semibold"
                        >
                          Akhiri Konsultasi
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                ),
              }),
            }}
            messages={{
              topElement: (
                <ConsultationIntro
                  isMobile
                  doctor={doctor}
                  symptom={consultation.symptom}
                  startedAt={consultation.startedAt}
                  patientName={consultation.patientName}
                />
              ),
            }}
          />
        </ChatErrorBoundary>
        <EndConsultationPopup
          consultationId={consultationId}
          isOpen={statePopup === "end"}
          onClose={() => setStatePopup(null)}
          onSuccess={refSendbirdChat.current?.endChat}
        />
        <DoneConsultationPopup
          consultationId={consultationId}
          isOpen={statePopup === "done" || statePopup === "expired"}
          popupType={statePopup}
        />
      </Flex>
    );
  }

  return null;
}
