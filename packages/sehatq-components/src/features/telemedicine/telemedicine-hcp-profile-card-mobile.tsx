import React from "react";

import {
  Box,
  Text,
  HStack,
  IconButton,
  Skeleton,
  SkeletonCircle,
  Badge,
  OfflineIcon,
  SehatqUserIcon,
  useImage,
} from "../../user-interfaces";

export type TelemedicineHcpProfileCardMobileProps = {
  doctor?: {
    slug: string;
    name: string;
    photoUrl: string;
    specialityName: string;
    displayPrice: string;
    consultationFee: string;
    indicator: string;
    isPrivateChannel: boolean;
    isBookingChannel: boolean;
    isPublicChannel: boolean;
  };
  messageHCPSchedule: string | null;
};

export function TelemedicineHcpProfileCardMobile(
  props: TelemedicineHcpProfileCardMobileProps
) {
  const Image = useImage();
  const { doctor, messageHCPSchedule } = props;
  return (
    <>
      {doctor && (
        <>
          <HStack spacing={4} align="flex-start">
            <Box textAlign="center" position="relative">
              {doctor.photoUrl ? (
                <Image
                  alt={doctor.name}
                  src={doctor.photoUrl}
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
              <Badge
                background={
                  doctor.indicator === "green"
                    ? "shamrock.500"
                    : "brownGrey.500"
                }
                px={2.5}
                size="sm"
                textTransform="capitalize"
                position="absolute"
                top="73px"
                left="16px"
              >
                {doctor.indicator === "green" ? "Online" : "Away"}
              </Badge>
            </Box>
            <Box>
              <Text fontFamily="poppins" fontWeight="semibold" fontSize="md">
                {doctor.name}
              </Text>
              <Text fontSize="xs" color="sea.500">
                {doctor.specialityName}
              </Text>
              <HStack spacing={1}>
                <Text fontWeight="bold" color="sea.500">
                  {doctor.consultationFee}
                </Text>
                {doctor.displayPrice && (
                  <Text
                    fontSize="sm"
                    color="brownGrey.500"
                    textDecoration="line-through"
                  >
                    {doctor.displayPrice}
                  </Text>
                )}
              </HStack>
            </Box>
          </HStack>
          {doctor.indicator !== "green" &&
            (doctor.isPrivateChannel || doctor.isBookingChannel) && (
              <HStack
                mt={5}
                spacing={2}
                background="squash.50"
                borderRadius="base"
                p={3}
                align="flex-start"
              >
                <IconButton
                  aria-label="offline button"
                  variant="fit"
                  borderRadius="full"
                  border="solid 5px"
                  borderColor="squash.500"
                  boxSize={6}
                  icon={<OfflineIcon w={4} h={4} />}
                />
                <Text lineHeight="4" color="#a65c00" fontSize="xs">
                  {messageHCPSchedule}
                </Text>
              </HStack>
            )}
        </>
      )}
    </>
  );
}

export function TelemedicineHcpProfileCardSkeletonMobile() {
  return (
    <Box p={4}>
      <HStack spacing={4}>
        <SkeletonCircle width="90px" height="90px" />
        <Box>
          <Skeleton width="160px" height="39px" mb={0.5} />
          <Skeleton width="80px" height="16px" mb={0.5} />
          <Skeleton width="80px" height="23px" mb={0.5} />
        </Box>
      </HStack>
    </Box>
  );
}
