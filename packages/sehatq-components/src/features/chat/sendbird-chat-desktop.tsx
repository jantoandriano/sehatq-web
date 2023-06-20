import React, { ReactElement } from "react";
import { Flex, Box, Progress, CountDown } from "../../user-interfaces";
import { Sendbird, GroupChannel } from "./sendbird-queries";
import { SendbirdHeader } from "./sendbird-header";
import { SendbirdMessages } from "./sendbird-messages";
import { SendbirdFooter } from "./sendbird-footer";

export type SendbirdChatDesktopProps = {
  sendbird?: Sendbird;
  channel?: GroupChannel;
  appId: string;
  userId: string;
  accessToken: string;
  doctor: {
    name: string;
    speciality: string;
    slug: string;
    imageUrl: string;
  };
  header?: {
    canVideoCall?: boolean;
    leftElement?: ReactElement;
    rightElement?: ReactElement;
    bottomElement?: ReactElement;
  };
  isHistory?: boolean;
  expireAt?: string;
  countDown?: {
    startCount: number;
    tickCallback?: (count: number) => void;
  };
  messages?: {
    verticalSpace?: {
      top?: number;
      bottom?: number;
    };
    topElement?: React.ReactElement;
  };
};

export function SendbirdChatDesktop(props: SendbirdChatDesktopProps) {
  const {
    channel,
    sendbird,
    doctor,
    appId,
    userId,
    accessToken,
    header,
    isHistory,
    expireAt,
    countDown,
    messages,
  } = props;
  return (
    <Flex
      flex="1"
      direction="column"
      height="100%"
      width="100%"
      overflow="hidden"
      position="relative"
      background="iceBlue.500"
    >
      {countDown ? (
        <CountDown
          {...countDown}
          startText="Sisa"
          zIndex="1"
          position="absolute"
          top="75px"
          left="50%"
          transform="translateX(-50%)"
          margin="0 auto"
          paddingY={1}
          paddingX={3}
          color="white"
          background="main.500"
          fontSize="sm"
          fontWeight="semibold"
          borderRadius="14.5px"
          boxShadow="base"
        />
      ) : null}
      <SendbirdHeader
        doctor={doctor}
        channel={channel}
        appId={appId}
        userId={userId}
        accessToken={accessToken}
        isHistory={isHistory}
        {...header}
      />
      {sendbird && channel ? (
        <SendbirdMessages
          isMobile={false}
          sendbird={sendbird}
          channel={channel}
          isHistory={isHistory}
          expireAt={expireAt}
          {...messages}
          verticalSpace={{
            top: countDown ? 41 : undefined,
            ...messages?.verticalSpace,
          }}
        />
      ) : (
        <Box flex="1" minHeight="0px" width="100%">
          <Progress isIndeterminate size="xs" color="sea.500" />
        </Box>
      )}
      {isHistory ? null : (
        <SendbirdFooter channel={channel} sendbird={sendbird} />
      )}
    </Flex>
  );
}
