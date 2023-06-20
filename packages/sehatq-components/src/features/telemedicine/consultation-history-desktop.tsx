import React from "react";
import { Flex, Button } from "../../user-interfaces";
import { SendbirdChat } from "../chat/sendbird-chat";
import { ChatSkeleton } from "../chat/chat-skeleton";
import { ChatErrorBoundary } from "../chat/chat-error-boundary";
import { ConsultationChatAgainPopup } from "./consultation-chat-again-popup";

export type ConsultationHistoryDesktopProps = {
  onHandleChatAgain: () => void;
  showChatAgain: boolean;
  onClose: () => void;
  consultationId: string;
  channelUrl: string | null;
  sendbirdProfile: {
    appId: string;
    userId: string;
    accessToken: string;
  } | null;
  doctor: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    speciality: string;
  } | null;
  doctorNotePopup: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  consultation: {
    startedAt: string;
    expireAt: string;
    duration: number;
    hasDoctorNote: boolean;
    hasRecommendation: boolean;
  } | null;
};

export function ConsultationHistoryDesktop(
  props: ConsultationHistoryDesktopProps
) {
  const {
    channelUrl,
    doctor,
    sendbirdProfile,
    consultation,
    onHandleChatAgain,
    showChatAgain,
    onClose,
  } = props;

  const isWaiting = !(doctor && channelUrl && sendbirdProfile);

  return (
    <Flex
      flex="1"
      position="relative"
      direction="column"
      borderRadius="lg"
      border="0.5px solid"
      borderColor="veryLightPink"
      height="100%"
      align="center"
      justify="start"
      overflow="hidden"
    >
      {isWaiting ? (
        <ChatSkeleton isHistory />
      ) : (
        <>
          <ChatErrorBoundary>
            <SendbirdChat
              {...sendbirdProfile}
              channelUrl={channelUrl}
              doctor={doctor}
              isHistory
              expireAt={consultation?.expireAt}
              header={{
                rightElement: (
                  <Button
                    variant="solid"
                    colorScheme="main"
                    onClick={onHandleChatAgain}
                    borderRadius="base"
                    size="md"
                  >
                    Chat Lagi
                  </Button>
                ),
              }}
              messages={{
                verticalSpace: {
                  bottom: consultation?.hasRecommendation ? 84 : 16,
                },
              }}
            />
          </ChatErrorBoundary>
        </>
      )}
      <ConsultationChatAgainPopup isOpen={showChatAgain} onClose={onClose} />
    </Flex>
  );
}
