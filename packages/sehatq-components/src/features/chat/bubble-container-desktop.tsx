import React from "react";
import {
  Flex,
  Spacer,
  Box,
  HStack,
  SkeletonText,
  IconButton,
  ReplyMessageIcon,
} from "../../user-interfaces";
import { MessageTime } from "./message-time";
import { MessageDeliveryReceipt } from "./message-delivery-receipt";
import { BubbleMessageType } from "./sendbird-model";

export type BubbleContainerDesktopProps = {
  type: "sender" | "receiver";
  readStatus?: "unread" | "read";
  messageTime: string;
  children: React.ReactNode;
  messageType: BubbleMessageType;
  isSelected?: boolean;
  onReply?: () => void;
};

export function BubbleContainerDesktop(props: BubbleContainerDesktopProps) {
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
    <Flex
      width="100%"
      background={isSelected ? "rgba(43, 142, 142, 0.08)" : undefined}
      paddingX={6}
      paddingTop={2}
      paddingBottom={1.5}
    >
      {type === "receiver" ? <Spacer /> : null}
      <Box>
        <HStack>
          {type === "receiver" && onReply ? (
            <IconButton
              variant="fit"
              aria-label="reply message"
              onClick={onReply}
              icon={
                <ReplyMessageIcon
                  height="20px"
                  width="20px"
                  color={isSelected ? "charcoalGrey" : "brownGrey.200"}
                />
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
                <ReplyMessageIcon
                  height="20px"
                  width="20px"
                  color={isSelected ? "charcoalGrey" : "brownGrey.200"}
                />
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
            ...(type === "sender" ? { left: "16px" } : { right: "16px" }),
          }
        : messageType === "link" || messageType === "text"
        ? {
            px: 3,
            pb: 2.5,
          }
        : null)}
    >
      <MessageTime
        isMobile={false}
        messageTime={messageTime}
        type={type}
        messageType={messageType}
      />
      {type === "receiver" && readStatus ? (
        <MessageDeliveryReceipt isMobile={false} readStatus={readStatus} />
      ) : null}
    </HStack>
  );
}

export function BubbleContainerDesktopSkeleton() {
  return (
    <Box
      px={5}
      py={3}
      minH="70px"
      width="100%"
      position="relative"
      borderRadius="xl"
      background="white"
      border="0.5px solid"
      borderColor="veryLightPink"
    >
      <SkeletonText noOfLines={2} width="390px" />
      <HStack spacing={1} justify="end" pt={3}>
        <SkeletonText noOfLines={1} width="45px" />
        <SkeletonText noOfLines={1} width="20px" />
      </HStack>
    </Box>
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
          ? 2.5
          : messageType === "link" || messageType === "text"
          ? 0
          : 3
      }
      py={messageType === "link" || messageType === "text" ? 0 : 2.5}
      maxW={messageType !== "image" ? "395px" : undefined}
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
