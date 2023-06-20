import React, { RefObject } from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Button,
  IconButton,
  ArrowBackIcon,
} from "../../user-interfaces";
import { SendbirdChat, SendbirdAction } from "../chat/sendbird-chat";
import { ChatErrorBoundary } from "../chat/chat-error-boundary";
import { WaitingForConsultation } from "./waiting-for-consultation";
import { ConsultationScreen, ConsultationStatus } from "./consultation-model";
import { ConsultationIntro } from "./consultation-intro";
import { ConsultationDeclined } from "./consultation-declined";
import { ConsultationRatingForm } from "./consultation-rating-form";
import { EndConsultationPopup } from "./end-consultation-popup";
import { BuyPrescriptionPopup } from "./buy-prescription-popup";
import { ConsultationTimeUp } from "./consultation-time-up";
import { DoctorEndChatConsultation } from "./doctor-end-chat-consultation";
import { ConsultationChatAgainPopup } from "./consultation-chat-again-popup";

export type ConsultationMobileProps = {
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
    screen: ConsultationScreen;
    symptom: string;
    patientName: string;
    startedAt: string;
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

export function ConsultationMobile(props: ConsultationMobileProps) {
  const {
    hasChatScreen,
    refSendbirdChat,
    consultationId,
    onChatEnded,
    onHandleChatAgain,
    consultation,
    doctor,
    sendbirdProfile,
    shownPopup,
    setShownPopup,
    countDown,
  } = props;
  const { navigate } = useNavigation();
  function goBack() {
    navigate("TELEMEDICINES");
  }
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
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
        padding={4}
      >
        <WaitingForConsultation isMobile consultationId={consultationId} />
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
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
        padding={4}
      >
        <ConsultationDeclined isMobile consultationId={consultationId} />
      </Flex>
    );
  }
  if (!hasChatScreen && doctor && consultation.screen === "rating") {
    return (
      <Flex
        flex="1"
        direction="column"
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
        paddingX={4}
        paddingTop={8}
        paddingBottom={4}
      >
        <ConsultationRatingForm
          isMobile
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
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
      >
        <ChatErrorBoundary>
          <SendbirdChat
            isMobile
            ref={refSendbirdChat}
            countDown={countDown}
            {...sendbirdProfile}
            channelUrl={consultation.channelUrl}
            doctor={doctor}
            isHistory={consultation.status === "closed"}
            onChatEnded={onChatEnded}
            header={{
              canVideoCall: consultation.canVideoCall,
              ...(consultation.status === "closed" && {
                leftElement: (
                  <IconButton
                    marginLeft={-1.5}
                    variant="fit"
                    onClick={goBack}
                    aria-label="back button"
                    icon={
                      <ArrowBackIcon
                        width="28px"
                        height="28px"
                        color="sea.500"
                      />
                    }
                  />
                ),
              }),
              rightElement:
                consultation.status === "closed" ? (
                  <Button
                    variant="solid"
                    colorScheme="main"
                    onClick={onHandleChatAgain}
                    borderRadius="base"
                    size="xs"
                  >
                    Chat Lagi
                  </Button>
                ) : (
                  <Button
                    variant="unstyled"
                    fontSize="xs"
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
                  isMobile
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
          isMobile
          isOpen={shownPopup === "chat-again"}
          onClose={() => setShownPopup(null)}
        />
        <BuyPrescriptionPopup
          isMobile
          consultationId={consultationId}
          isOpen={shownPopup === "prescription"}
          onClose={() => setShownPopup(null)}
        />
        <EndConsultationPopup
          isMobile
          consultationId={consultationId}
          isOpen={shownPopup === "end"}
          onClose={() => setShownPopup(null)}
          onSuccess={refSendbirdChat.current?.endChat}
          goToBuyPrescription={() => setShownPopup("prescription")}
          goToRatingForm={() => setShownPopup("rating")}
        />
        <Drawer
          isOpen={shownPopup === "rating"}
          onClose={() => setShownPopup(null)}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent borderTopLeftRadius="lg" borderTopRightRadius="lg">
            <DrawerBody px={6} pt={4} pb={6}>
              <ConsultationRatingForm
                isMobile
                doctorId={doctor.id}
                consultationId={consultationId}
                enabledFetch={shownPopup === "rating"}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <ConsultationTimeUp
          isMobile
          doctorSlug={doctor.slug}
          isOpen={shownPopup === "expired"}
          onClose={() => setShownPopup(null)}
          onClickFinish={() => setShownPopup("end")}
        />
        <DoctorEndChatConsultation
          isMobile
          isOpen={shownPopup === "doctor-ended"}
          onClose={() => setShownPopup(null)}
          onClickFinish={() => setShownPopup("end")}
        />
      </Flex>
    );
  }
  return null;
}
