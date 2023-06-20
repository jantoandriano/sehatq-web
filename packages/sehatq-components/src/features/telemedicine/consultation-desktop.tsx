import React, { RefObject } from "react";
import {
  Flex,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
} from "../../user-interfaces";
import { SendbirdChat, SendbirdAction } from "../chat/sendbird-chat";
import { ChatErrorBoundary } from "../chat/chat-error-boundary";
import { WaitingForConsultation } from "./waiting-for-consultation";
import { ConsultationScreen, ConsultationStatus } from "./consultation-model";
import { ConsultationDeclined } from "./consultation-declined";
import { ConsultationRatingForm } from "./consultation-rating-form";
import { EndConsultationPopup } from "./end-consultation-popup";
import { BuyPrescriptionPopup } from "./buy-prescription-popup";
import { ConsultationTimeUp } from "./consultation-time-up";
import { DoctorEndChatConsultation } from "./doctor-end-chat-consultation";
import { ConsultationIntro } from "./consultation-intro";
import { ConsultationChatAgainPopup } from "./consultation-chat-again-popup";

export type ConsultationDesktopProps = {
  consultationId: string;
  onChatEnded: (by: "receiver" | "sender") => Promise<void>;
  onHandleChatAgain: () => void;
  refSendbirdChat: RefObject<SendbirdAction>;
  sendbirdProfile: {
    appId: string;
    userId: string;
    accessToken: string;
  } | null;
  hasChatScreen: boolean;
  consultation: {
    symptom: string;
    startedAt: string;
    patientName: string;
    screen: ConsultationScreen;
    canVideoCall: boolean;
    status: ConsultationStatus;
    channelUrl: string | null;
    isExpired: boolean;
    expireAt?: string;
    isFreeChat: boolean;
  } | null;
  doctor: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    speciality: string;
  } | null;
  shownPopup:
    | "end"
    | "prescription"
    | "rating"
    | "expired"
    | "doctor-ended"
    | "chat-again"
    | null;
  setShownPopup: (
    newPopup:
      | "end"
      | "prescription"
      | "rating"
      | "expired"
      | "doctor-ended"
      | "chat-again"
      | null
  ) => void;
  countDown?: {
    startCount: number;
    tickCallback?: (count: number) => Promise<void>;
  };
};

export function ConsultationDesktop(props: ConsultationDesktopProps) {
  const {
    hasChatScreen,
    consultationId,
    refSendbirdChat,
    onChatEnded,
    onHandleChatAgain,
    consultation,
    doctor,
    sendbirdProfile,
    shownPopup,
    setShownPopup,
    countDown,
  } = props;
  if (
    !consultation ||
    consultation.status === "init" ||
    consultation.screen === "unpaid" ||
    consultation.screen === "uncomplete" ||
    consultation.screen === "booked" ||
    (consultation.status === "pending" && consultation.screen === "waiting")
  ) {
    return (
      <Flex
        flex="1"
        direction="column"
        borderRadius="lg"
        border="0.5px solid"
        borderColor="veryLightPink"
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
        paddingY={5}
        paddingX={12}
      >
        <WaitingForConsultation consultationId={consultationId} />
      </Flex>
    );
  }
  if (
    consultation.status === "cancelled" ||
    (consultation.status === "pending" &&
      consultation.screen === "waiting-busy")
  ) {
    return (
      <Flex
        flex="1"
        direction="column"
        borderRadius="lg"
        border="0.5px solid"
        borderColor="veryLightPink"
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
        paddingY={5}
        paddingX={12}
      >
        <ConsultationDeclined consultationId={consultationId} />
      </Flex>
    );
  }
  if (!hasChatScreen && doctor && consultation.screen === "rating") {
    return (
      <Flex
        flex="1"
        direction="column"
        borderRadius="lg"
        border="0.5px solid"
        borderColor="veryLightPink"
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
        paddingBottom={5}
        paddingTop={12}
        paddingX={12}
      >
        <ConsultationRatingForm
          doctorId={doctor.id}
          consultationId={consultationId}
        />
      </Flex>
    );
  }
  if (sendbirdProfile && consultation.channelUrl && doctor) {
    return (
      <Flex
        flex="1"
        direction="column"
        borderRadius="lg"
        border="0.5px solid"
        borderColor="veryLightPink"
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
      >
        <ChatErrorBoundary>
          <SendbirdChat
            {...sendbirdProfile}
            countDown={countDown}
            ref={refSendbirdChat}
            channelUrl={consultation.channelUrl ?? ""}
            doctor={doctor}
            onChatEnded={onChatEnded}
            isHistory={consultation.status === "closed"}
            header={{
              canVideoCall: consultation.canVideoCall,
              rightElement:
                consultation.status === "closed" ? (
                  <Button
                    variant="solid"
                    colorScheme="main"
                    onClick={onHandleChatAgain}
                    borderRadius="base"
                    size="md"
                  >
                    Chat Lagi
                  </Button>
                ) : (
                  <Button
                    variant="unstyled"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="#AB2F2F"
                    onClick={() => setShownPopup("end")}
                  >
                    Akhiri
                  </Button>
                ),
            }}
            messages={{
              topElement: (
                <ConsultationIntro
                  doctor={doctor}
                  symptom={consultation.symptom}
                  startedAt={consultation.startedAt}
                  patientName={consultation.patientName}
                />
              ),
            }}
            expireAt={consultation?.expireAt}
          />
        </ChatErrorBoundary>
        <ConsultationChatAgainPopup
          isOpen={shownPopup === "chat-again"}
          onClose={() => setShownPopup(null)}
        />
        <BuyPrescriptionPopup
          consultationId={consultationId}
          isOpen={shownPopup === "prescription"}
          onClose={() => setShownPopup(null)}
        />
        <EndConsultationPopup
          consultationId={consultationId}
          isOpen={shownPopup === "end"}
          onClose={() => setShownPopup(null)}
          onSuccess={refSendbirdChat.current?.endChat}
          goToBuyPrescription={() => setShownPopup("prescription")}
          goToRatingForm={() => setShownPopup("rating")}
        />
        <Modal
          isOpen={shownPopup === "rating"}
          onClose={() => setShownPopup(null)}
        >
          <ModalOverlay />
          <ModalContent borderTopLeftRadius="lg" borderTopRightRadius="lg">
            <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
            <ModalBody paddingBottom={6} paddingX={6} paddingTop={9}>
              <ConsultationRatingForm
                doctorId={doctor.id}
                consultationId={consultationId}
                enabledFetch={shownPopup === "rating"}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
        <ConsultationTimeUp
          doctorSlug={doctor.slug}
          isOpen={shownPopup === "expired"}
          onClose={() => setShownPopup(null)}
          onClickFinish={() => setShownPopup("end")}
        />
        <DoctorEndChatConsultation
          isOpen={shownPopup === "doctor-ended"}
          onClose={() => setShownPopup(null)}
          onClickFinish={() => setShownPopup("end")}
        />
      </Flex>
    );
  }
  return null;
}
