import React, { ReactElement } from "react";
import { Flex, Text, Box, useImage } from "../../user-interfaces";
import { SendbirdVideoCall } from "./sendbird-video-call";
import { GroupChannel } from "./sendbird-queries";

export type SendbirdHeaderDesktopProps = {
  doctor: {
    name: string;
    speciality: string;
    slug: string;
    imageUrl: string;
  };
  channel?: GroupChannel;
  appId: string;
  userId: string;
  accessToken: string;
  isHistory?: boolean;
  canVideoCall?: boolean;
  showVideoCallIcon?: boolean;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  bottomElement?: ReactElement;
  countDown?: {
    startCount: number;
    tickCallback?: (count: number) => void;
  };
};

export function SendbirdHeaderDesktop(props: SendbirdHeaderDesktopProps) {
  const {
    doctor,
    channel,
    appId,
    userId,
    accessToken,
    isHistory,
    canVideoCall,
    showVideoCallIcon = true,
    leftElement,
    rightElement,
    bottomElement = null,
  } = props;
  const Image = useImage();
  return (
    <Box zIndex="1" boxShadow="0 2px 12px 0 rgba(42, 83, 83, 0.1)">
      <Flex align="center" background="white" paddingX={6} paddingY={3}>
        {leftElement ? <Box marginRight={3}>{leftElement}</Box> : null}
        <Flex flex="1" align="center">
          <Image
            src={doctor.imageUrl}
            alt={doctor.name}
            layout="fill"
            objectFit="contain"
            wrapperProps={{
              width: "40px",
              height: "40px",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Box flex="1" marginLeft={3}>
            <Text
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="md"
              lineHeight="normal"
            >
              {doctor.name}
            </Text>
            <Text
              fontSize="sm"
              lineHeight="normal"
              fontWeight="medium"
              color="sea.500"
            >
              {doctor.speciality}
            </Text>
          </Box>
        </Flex>
        {showVideoCallIcon && !isHistory && channel ? (
          <SendbirdVideoCall
            doctor={doctor}
            channel={channel}
            appId={appId}
            userId={userId}
            accessToken={accessToken}
            canVideoCall={canVideoCall}
          />
        ) : null}
        {rightElement ? <Box marginLeft={3}>{rightElement}</Box> : null}
      </Flex>
      {bottomElement}
    </Box>
  );
}
