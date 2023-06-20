import React from "react";
import {
  HStack,
  Text,
  IconButton,
  VideoCallSenderIcon,
  VideoCallReceiverIcon,
} from "../../user-interfaces";

export type VideoCallBubbleMobileProps = {
  type: "sender" | "receiver";
  status: "start" | "end" | "declined";
};

export function VideoCallBubbleMobile(props: VideoCallBubbleMobileProps) {
  const { status, type } = props;
  return (
    <HStack spacing={2} align="center">
      <IconButton
        aria-label="video-call"
        minW="unset"
        h="unset"
        variant="unstyled"
        icon={
          type === "sender" ? (
            <VideoCallSenderIcon boxSize="24px" />
          ) : (
            <VideoCallReceiverIcon boxSize="24px" />
          )
        }
      />
      <Text
        color={type === "sender" ? "charcoalGrey" : "white"}
        fontSize="sm"
        lineHeight="4"
      >
        Video Call {status === "end" ? "telah berakhir" : null}
        {status === "declined" ? "tidak terjawab" : null}
      </Text>
    </HStack>
  );
}
