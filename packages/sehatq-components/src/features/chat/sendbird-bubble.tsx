import React from "react";
import { modelSendbirdBubble } from "./sendbird-model";
import { TextBubble } from "./text-bubble";
import { ImageBubble } from "./image-bubble";
import { DoctorNoteBubble } from "./doctor-note-bubble";
import { VideoCallBubble } from "./video-call-bubble";
import { PrescriptionBubble } from "./prescription-bubble";
import { RecommendedDoctorBubble } from "./recommended-doctor-bubble";
import { LinkBubble } from "./link-bubble";
import { BubbleContainer } from "./bubble-container";
import { RecommendedTelemedicinesBubble } from "./recommended-telemedicines-bubble";
import { RecommendedHealthToolsBubble } from "./recommended-health-tools-bubble";
import { ChatEndedBubble } from "./chat-ended-bubble";
import { DurationRemainingBubble } from "./duration-remaining-bubble";
import { RecipeCovidBubble } from "./recipe-covid-bubble";

export type SendbirdBubbleProps = ReturnType<typeof modelSendbirdBubble> & {
  isMobile: boolean;
  readStatus: "unread" | "read";
  type: "receiver" | "sender";
  messageTime: string;
  isSelected?: boolean;
  onReply?: () => void;
  goToRepliedMessage?: () => void;
  endedBy?: string;
};

export function SendbirdBubble(props: SendbirdBubbleProps) {
  const {
    type,
    readStatus,
    messageTime,
    isMobile,
    isSelected,
    onReply,
    goToRepliedMessage = () => null,
    ...bubble
  } = props;

  if (bubble.messageType === "text") {
    return (
      <BubbleContainer
        type={type}
        messageType="text"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        isSelected={isSelected}
        onReply={onReply}
      >
        <TextBubble
          type={type}
          isMobile={isMobile}
          {...bubble}
          replied={
            bubble.replied
              ? {
                  ...bubble.replied,
                  goTo: goToRepliedMessage,
                }
              : undefined
          }
        />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "link") {
    return (
      <BubbleContainer
        type={type}
        messageType="link"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        onReply={onReply}
        isSelected={isSelected}
      >
        <LinkBubble isMobile={isMobile} type={type} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "image") {
    return (
      <BubbleContainer
        type={type}
        messageType="image"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        onReply={onReply}
        isSelected={isSelected}
      >
        <ImageBubble isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "doctor-note") {
    return (
      <BubbleContainer
        type={type}
        messageType="doctor-note"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        isSelected={isSelected}
        onReply={onReply}
      >
        <DoctorNoteBubble isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "video-call") {
    return (
      <BubbleContainer
        type={type}
        messageType="video-call"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
      >
        <VideoCallBubble type={type} isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "prescription") {
    return (
      <BubbleContainer
        type={type}
        messageType="prescription"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        onReply={onReply}
        isSelected={isSelected}
      >
        <PrescriptionBubble isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "recommended-telemedicines") {
    return (
      <BubbleContainer
        type={type}
        messageType="recommended-telemedicines"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        onReply={onReply}
        isSelected={isSelected}
      >
        <RecommendedTelemedicinesBubble isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "recommended-doctor") {
    return (
      <BubbleContainer
        type={type}
        messageType="recommended-doctor"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        onReply={onReply}
        isSelected={isSelected}
      >
        <RecommendedDoctorBubble isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "recommended-health-tools") {
    return (
      <BubbleContainer
        type={type}
        messageType="recommended-health-tools"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        onReply={onReply}
        isSelected={isSelected}
      >
        <RecommendedHealthToolsBubble isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  if (bubble.messageType === "chat-ended" && props.endedBy) {
    return <ChatEndedBubble isMobile={isMobile} endedBy={props.endedBy} />;
  }
  if (bubble.messageType === "duration-remaining") {
    return <DurationRemainingBubble isMobile={isMobile} {...bubble} />;
  }
  if (bubble.messageType === "recipe-covid") {
    return (
      <BubbleContainer
        type={type}
        messageType="recipe-covid"
        isMobile={isMobile}
        readStatus={readStatus}
        messageTime={messageTime}
        isSelected={isSelected}
        onReply={onReply}
      >
        <RecipeCovidBubble isMobile={isMobile} {...bubble} />
      </BubbleContainer>
    );
  }
  return null;
}
