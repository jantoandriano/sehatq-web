import React from "react";
import { Text, SkeletonText } from "../../user-interfaces";
import { BubbleMessageType } from "./sendbird-model";

export type MessageTimeMobileProps = {
  messageTime: string;
  type: "sender" | "receiver";
  messageType: BubbleMessageType;
};

export function MessageTimeMobile(props: MessageTimeMobileProps) {
  const { messageTime, type, messageType } = props;
  return (
    <>
      <Text
        fontSize="xxs"
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

export function MessageTimeMobileSkeleton() {
  return (
    <>
      <SkeletonText noOfLines={1} width="38px" />
    </>
  );
}
