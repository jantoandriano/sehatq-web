import React from "react";
import {
  Flex,
  Spacer,
  Box,
  HStack,
  SkeletonText,
  IconButton,
  ReplyMessageSelectedIcon,
  ReplyMessageUnSelectedIcon,
} from "../../user-interfaces";
import { MessageTime } from "./message-time";
import { MessageDeliveryReceipt } from "./message-delivery-receipt";
import { BubbleMessageType } from "./sendbird-model";

export type BubbleContainerMobileProps = {
  type: "sender" | "receiver";
  readStatus?: "unread" | "read";
  messageTime: string;
  children: React.ReactNode;
  messageType: BubbleMessageType;
  isSelected?: boolean;
  onReply?: () => void;
};

export function BubbleContainerMobile(props: BubbleContainerMobileProps) {
  const {
    type,
    messageTime,
    messageType,
    children,
    readStatus,
    isSelected,
    onReply,
  } = props;

  return (
    <Flex width="100%" paddingX={5} paddingTop={2} paddingBottom={1.5}>
      {type === "receiver" ? <Spacer /> : null}
      <Box>
        <HStack>
          {type === "receiver" && onReply ? (
            <IconButton
              variant="fit"
              aria-label="reply message"
              onClick={onReply}
              icon={
                isSelected ? (
                  <ReplyMessageSelectedIcon boxSize="24px" />
                ) : (
                  <ReplyMessageUnSelectedIcon boxSize="24px" />
                )
              }
            />
          ) : null}
          <Bubble type={type} messageType={messageType}>
            {children}
            <MessageTimeStatus
              type={type}
              messageTime={messageTime}
              messageType={messageType}
              readStatus={readStatus}
            />
          </Bubble>
          {type === "sender" && onReply ? (
            <IconButton
              variant="fit"
              aria-label="reply message"
              onClick={onReply}
              icon={
                isSelected ? (
                  <ReplyMessageSelectedIcon boxSize="24px" />
                ) : (
                  <ReplyMessageUnSelectedIcon boxSize="24px" />
                )
              }
            />
          ) : null}
        </HStack>
      </Box>
    </Flex>
  );
}

type MessageTimeStatusProps = {
  type: "sender" | "receiver";
  readStatus?: "unread" | "read";
  messageTime: string;
  messageType: BubbleMessageType;
};

function MessageTimeStatus(props: MessageTimeStatusProps) {
  const { type, messageTime, messageType, readStatus } = props;
  return (
    <HStack
      justify={type === "sender" ? "start" : "end"}
      marginTop={0.5}
      spacing={1}
      {...(messageType === "image"
        ? {
            position: "absolute",
            bottom: "10px",
            ...(type === "sender" ? { left: "15px" } : { right: "15px" }),
          }
        : messageType === "link" || messageType === "text"
        ? {
            px: 3,
            pb: 2.5,
          }
        : null)}
    >
      <MessageTime
        isMobile
        messageTime={messageTime}
        type={type}
        messageType={messageType}
      />
      {type === "receiver" && readStatus ? (
        <MessageDeliveryReceipt isMobile readStatus={readStatus} />
      ) : null}
    </HStack>
  );
}

export type BubbleProps = {
  type: "sender" | "receiver";
  children: React.ReactNode;
  messageType: BubbleMessageType;
};

function Bubble(props: BubbleProps) {
  const { type, children, messageType } = props;
  return (
    <Box
      px={
        messageType === "image"
          ? 2
          : messageType === "link" || messageType === "text"
          ? 0
          : 3
      }
      py={
        messageType === "image"
          ? 2
          : messageType === "link" || messageType === "text"
          ? 0
          : 2.5
      }
      maxW={messageType !== "image" ? "280px" : undefined}
      position="relative"
      {...(type === "sender" && {
        sx: {
          "&::before": {
            content: '""',
            width: "12px",
            height: "12px",
            background: "#fff",
            borderColor: "transparent transparent #dadada #dadada",
            borderStyle: "solid",
            borderWidth: "0.5px",
            transform: "rotate(45deg)",
            position: "absolute",
            left: "-6px",
            bottom: "10px",
            zIndex: 0,
          },
        },
      })}
      {...(type === "receiver" && {
        sx: {
          "&::before": {
            content: '""',
            width: "12px",
            height: "12px",
            background: "#2b8e8e",
            transform: "rotate(45deg)",
            position: "absolute",
            right: "-6px",
            bottom: "10px",
            zIndex: 0,
          },
        },
      })}
      borderRadius="xl"
      background={type === "sender" ? "white" : "sea.500"}
      border="0.5px solid"
      borderColor={type === "sender" ? "veryLightPink" : "sea.500"}
    >
      {children}
    </Box>
  );
}

export function BubbleContainerMobileSkeleton() {
  return (
    <Box
      p={3}
      minH="50px"
      width="100%"
      position="relative"
      borderRadius="xl"
      background="white"
      border="0.5px solid"
      borderColor="veryLightPink"
    >
      <SkeletonText noOfLines={2} width="150px" />
      <HStack spacing={1} justify="end" pt={2}>
        <SkeletonText noOfLines={1} width="38px" />
        <SkeletonText noOfLines={1} width="16px" />
      </HStack>
    </Box>
  );
}
