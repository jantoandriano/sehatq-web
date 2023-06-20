import React from "react";
import { Box, HStack, Text } from "../../user-interfaces";
import { TextBubbleReplyIcon } from "./text-bubble-reply-icon";

export type TextBubbleMobileProps = {
  type: "sender" | "receiver";
  messageText?: string;
  messageReplier?: string;
  replied?: {
    messageId: number;
    messageText: string;
    messageSender: string;
    messageType: string;
    goTo: () => void;
  };
};

function ReplyMessageText(props: { type: string; text: string }) {
  return (
    <HStack spacing={1} pt={0.5}>
      <TextBubbleReplyIcon type={props.type} isMobile />
      <Text fontSize="xxs" color="brownGrey.500" noOfLines={1}>
        {props.text}
      </Text>
    </HStack>
  );
}

export function TextBubbleMobile(props: TextBubbleMobileProps) {
  const { type, messageText, messageReplier, replied } = props;

  let senderMessageReply = "";
  if (replied?.messageSender === messageReplier) {
    senderMessageReply = type === "sender" ? "Dokter" : "Kamu";
  } else {
    senderMessageReply = type === "sender" ? "Kamu" : "Dokter";
  }

  return (
    <>
      {replied ? (
        <Box
          px={3}
          py={2}
          background={type === "sender" ? "#F1F1F1" : "iceBlue.500"}
          borderTopLeftRadius="xl"
          borderTopRightRadius="xl"
          width="100%"
          onClick={replied.goTo}
        >
          <Text fontSize="xxs" color="charcoalGrey">
            Membalas{" "}
            <Text as="span" fontWeight="semibold">
              {senderMessageReply}
            </Text>
          </Text>
          <ReplyMessageText
            type={replied.messageType}
            text={replied.messageText}
          />
        </Box>
      ) : null}
      <Box px={3} pt={1}>
        <Text
          fontSize="sm"
          color={type === "sender" ? "charcoalGrey" : "white"}
          wordBreak="break-word"
        >
          {messageText}
        </Text>
      </Box>
    </>
  );
}
