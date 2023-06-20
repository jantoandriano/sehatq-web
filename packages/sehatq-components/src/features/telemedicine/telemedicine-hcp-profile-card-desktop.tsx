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

export type TelemedicineHcpProfileCardDesktopProps = {
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

export function TelemedicineHcpProfileCardDesktop(
  props: TelemedicineHcpProfileCardDesktopProps
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
                    width: "96px",
                    height: "96px",
                    borderRadius: "full",
                    overflow: "hidden",
                  }}
                />
              ) : (
                <SehatqUserIcon boxSize="96px" />
              )}
              <Badge
                background={
                  doctor.indicator === "green"
                    ? "shamrock.500"
                    : "brownGrey.500"
                }
                width="78px"
                height="28px"
                textTransform="capitalize"
                position="absolute"
                top="77px"
                left="9px"
                fontSize="sm"
                fontWeight="semibold"
                fontFamily="poppins"
              >
                {doctor.indicator === "green" ? "Online" : "Away"}
              </Badge>
            </Box>
            <Box>
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="lg"
                color="charcoalGrey"
              >
                {doctor.name}
              </Text>
              <Text fontSize="sm" color="brownGrey.500" mt={1.5} mb={5}>
                {doctor.specialityName}
              </Text>
              <HStack spacing={1}>
                <Text fontWeight="bold" color="sea.500" fontSize="3xl">
                  {doctor.consultationFee}
                </Text>
                {doctor.displayPrice && (
                  <Text
                    fontSize="lg"
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
                mt={4}
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
                <Text lineHeight="6" color="#a65c00" fontSize="sm">
                  {messageHCPSchedule}
                </Text>
              </HStack>
            )}
        </>
      )}
    </>
  );
}

export function TelemedicineHcpProfileCardSkeletonDesktop() {
  return (
    <>
      <HStack spacing={4} align="flex-start">
        <SkeletonCircle width="96px" height="96px" />
        <Box>
          <Skeleton width="352px" height="27px" />
          <Skeleton width="93px" height="19px" mt={1.5} mb={5} />
          <Skeleton width="114px" height="33px" />
        </Box>
      </HStack>
      <HStack
        mt={4}
        spacing={2}
        background="squash.50"
        borderRadius="base"
        p={3}
      >
        <Skeleton width="590px" height="44px" />
      </HStack>
    </>
  );
}
