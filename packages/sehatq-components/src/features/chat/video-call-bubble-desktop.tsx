import React from "react";
import {
  HStack,
  Text,
  IconButton,
  VideoCallSenderIcon,
  VideoCallReceiverIcon,
} from "../../user-interfaces";

export type VideoCallBubbleDesktopProps = {
  type: "sender" | "receiver";
  status: "start" | "end" | "declined";
};

export function VideoCallBubbleDesktop(props: VideoCallBubbleDesktopProps) {
  const { status, type } = props;
  return (
    <HStack spacing={3} align="center">
      <IconButton
        aria-label="video-call"
        variant="fit"
        icon={
          type === "sender" ? (
            <VideoCallSenderIcon boxSize="30px" />
          ) : (
            <VideoCallReceiverIcon boxSize="30px" />
          )
        }
      />
      <Text
        color={type === "sender" ? "charcoalGrey" : "white"}
        fontSize="md"
        lineHeight="6"
      >
        Video Call {status === "end" ? "telah berakhir" : null}
        {status === "declined" ? "tidak terjawab" : null}
      </Text>
    </HStack>
  );
}
