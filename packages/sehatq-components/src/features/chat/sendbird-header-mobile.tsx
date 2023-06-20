import React, { ReactElement } from "react";
import {
  Flex,
  Text,
  HStack,
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  SehatqUserIcon,
  Button,
  CountDown,
  useImage,
  useDisclosure,
} from "../../user-interfaces";
import {
  TelemedicineHCPProfileContent,
  TelemedicineHCPExperienceRating,
} from "../telemedicine";
import { SendbirdVideoCall } from "./sendbird-video-call";
import { GroupChannel } from "./sendbird-queries";

export type SendbirdHeaderMobileProps = {
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

export function SendbirdHeaderMobile(props: SendbirdHeaderMobileProps) {
  const {
    doctor,
    channel,
    appId,
    userId,
    accessToken,
    leftElement,
    rightElement,
    isHistory,
    canVideoCall,
    showVideoCallIcon = true,
    bottomElement = null,
    countDown,
  } = props;
  const Image = useImage();
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Box zIndex="1" boxShadow="0 2px 12px 0 rgba(42, 83, 83, 0.1)">
      <Flex align="center" background="white" paddingX={4} paddingY={2}>
        {leftElement ? <Box marginRight={3}>{leftElement}</Box> : null}
        <Flex
          flex="1"
          align="center"
          minWidth="0px"
          marginRight={3}
          onClick={onOpen}
        >
          <Image
            src={doctor.imageUrl}
            alt={doctor.name}
            layout="fill"
            objectFit="contain"
            wrapperProps={{
              width: "32px",
              height: "32px",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Box flex="1" marginLeft={3} minWidth="0px">
            <Text
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
              lineHeight="normal"
              isTruncated
            >
              {doctor.name}
            </Text>
            <HStack spacing={1} align="normal">
              <Text
                fontSize="xs"
                lineHeight="normal"
                fontWeight="medium"
                color="sea.500"
              >
                {doctor.speciality}
              </Text>
              {countDown && !isHistory ? (
                <>
                  <Text
                    fontSize="xs"
                    lineHeight="normal"
                    fontWeight="medium"
                    color="brownGrey.500"
                  >
                    •
                  </Text>
                  <CountDown
                    {...countDown}
                    color="brownGrey.500"
                    fontSize="xs"
                    fontWeight="medium"
                  />
                </>
              ) : null}
            </HStack>
          </Box>
        </Flex>
        {showVideoCallIcon && !isHistory && channel ? (
          <SendbirdVideoCall
            isMobile
            channel={channel}
            appId={appId}
            userId={userId}
            accessToken={accessToken}
            doctor={doctor}
            canVideoCall={canVideoCall}
          />
        ) : null}
        {rightElement ? <Box marginLeft={3}>{rightElement}</Box> : null}
      </Flex>
      {bottomElement}
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent borderTopRadius="lg">
            <DrawerBody px={4} py={4}>
              <HStack spacing={4} mb={5}>
                <Box textAlign="center" position="relative">
                  {doctor.imageUrl ? (
                    <Image
                      alt={doctor.name}
                      src={doctor.imageUrl}
                      layout="fill"
                      objectFit="contain"
                      wrapperProps={{
                        margin: "0 auto",
                        width: "84px",
                        height: "84px",
                        borderRadius: "full",
                        overflow: "hidden",
                      }}
                    />
                  ) : (
                    <SehatqUserIcon boxSize="84px" />
                  )}
                </Box>
                <Box>
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    fontSize="md"
                  >
                    {doctor.name}
                  </Text>
                  <Text fontSize="xs" color="sea.500">
                    {doctor.speciality}
                  </Text>
                </Box>
              </HStack>
              <Flex
                boxShadow="xs"
                borderRadius="base"
                py={3}
                justify="space-evenly"
                width="full"
              >
                <TelemedicineHCPExperienceRating
                  doctorSlug={doctor.slug}
                  isMobile
                />
              </Flex>
              <Box py={5}>
                <TelemedicineHCPProfileContent
                  doctorSlug={doctor.slug}
                  isMobile
                />
              </Box>
              <Button
                isFullWidth
                variant="outline"
                color="sea.500"
                borderColor="main.500"
                fontSize="sm"
                height="38px"
                onClick={onClose}
                autoFocus={false}
              >
                Tutup
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}
