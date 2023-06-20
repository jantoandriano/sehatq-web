import React, { ReactElement } from "react";
import { Flex, Box, Progress } from "../../user-interfaces";
import { Sendbird, GroupChannel } from "./sendbird-queries";
import { SendbirdHeader } from "./sendbird-header";
import { SendbirdMessages } from "./sendbird-messages";
import { SendbirdFooter } from "./sendbird-footer";

export type SendbirdChatMobileProps = {
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
  canVideoCall?: boolean;
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

export function SendbirdChatMobile(props: SendbirdChatMobileProps) {
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
      background="linear-gradient(180deg, rgba(240, 249, 250, 0) 0%, #F0F9FA 100%)"
    >
      <SendbirdHeader
        isMobile
        doctor={doctor}
        channel={channel}
        appId={appId}
        userId={userId}
        accessToken={accessToken}
        isHistory={isHistory}
        countDown={countDown}
        {...header}
      />
      {sendbird && channel ? (
        <SendbirdMessages
          isMobile
          sendbird={sendbird}
          channel={channel}
          isHistory={isHistory}
          expireAt={expireAt}
          {...messages}
          verticalSpace={{
            top: countDown ? 38 : undefined,
            ...messages?.verticalSpace,
          }}
        />
      ) : (
        <Box flex="1" minHeight="0px" width="100%" background="iceBlue.500">
          <Progress isIndeterminate size="xs" color="sea.500" />
        </Box>
      )}
      {isHistory ? null : (
        <SendbirdFooter channel={channel} sendbird={sendbird} isMobile />
      )}
    </Flex>
  );
}
