import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Flex,
  Button,
  Box,
  IconButton,
  ArrowBackIcon,
} from "../../user-interfaces";
import { SendbirdChat } from "../chat/sendbird-chat";
import { ChatSkeleton } from "../chat/chat-skeleton";
import { ChatErrorBoundary } from "../chat/chat-error-boundary";
import { DoctorDocument } from "./doctor-document";
import { ConsultationChatAgainPopup } from "./consultation-chat-again-popup";

export type ConsultationHistoryMobileProps = {
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

export function ConsultationHistoryMobile(
  props: ConsultationHistoryMobileProps
) {
  const {
    consultationId,
    channelUrl,
    doctor,
    sendbirdProfile,
    consultation,
    onHandleChatAgain,
    showChatAgain,
    onClose,
  } = props;
  const { goBack } = useNavigation();

  const isWaiting = !(doctor && channelUrl && sendbirdProfile);

  return (
    <Flex
      flex="1"
      position="relative"
      direction="column"
      height="100%"
      align="center"
      justify="start"
      overflow="hidden"
    >
      {isWaiting ? (
        <ChatSkeleton isMobile isHistory />
      ) : (
        <>
          <ChatErrorBoundary isMobile>
            <SendbirdChat
              isMobile
              {...sendbirdProfile}
              channelUrl={channelUrl}
              doctor={doctor}
              isHistory
              expireAt={consultation?.expireAt}
              header={{
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
                rightElement: (
                  <Button
                    variant="solid"
                    colorScheme="main"
                    onClick={onHandleChatAgain}
                    borderRadius="base"
                    size="xs"
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
          {consultation?.hasRecommendation || consultation?.hasDoctorNote ? (
            <Box
              width="calc(100% - 32px)"
              position="absolute"
              bottom="16px"
              left="16px"
            >
              <DoctorDocument isMobile consultationId={consultationId} />
            </Box>
          ) : null}
        </>
      )}
      <ConsultationChatAgainPopup
        isMobile
        isOpen={showChatAgain}
        onClose={onClose}
      />
    </Flex>
  );
}
