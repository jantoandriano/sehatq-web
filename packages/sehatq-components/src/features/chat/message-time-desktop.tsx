import React from "react";
import { Text, SkeletonText } from "../../user-interfaces";
import { BubbleMessageType } from "./sendbird-model";

export type MessageTimeDesktopProps = {
  messageTime: string;
  type: "sender" | "receiver";
  messageType: BubbleMessageType;
};

export function MessageTimeDesktop(props: MessageTimeDesktopProps) {
  const { messageTime, type, messageType } = props;
  return (
    <>
      <Text
        fontSize="xs"
        color={
          messageType === "image"
            ? "white"
            : type === "sender"
            ? "brownGrey.500"
            : "paleBlue.500"
        }
      >
        {messageTime}
      </Text>
    </>
  );
}

export function MessageTimeDesktopSkeleton() {
  return (
    <>
      <SkeletonText noOfLines={1} width="45px" />
    </>
  );
}
