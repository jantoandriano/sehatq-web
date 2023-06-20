import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Divider,
  HStack,
  Link,
  SimpleUserIcon,
  Skeleton,
  SkeletonCircle,
  Text,
  useImage,
  VStack,
  WarningIcon,
} from "../../user-interfaces";
import { MyBookedTelemedicineCardGeneralProps } from "./my-booked-telemedicine-card-mobile";

export type MyBookedTelemedicineCardDesktopProps =
  MyBookedTelemedicineCardGeneralProps;

export function MyTelemedicineBookedStartDesktop(props: {
  consultationId: string;
  bookingStartDate: string;
  bookingStartTime: string;
}) {
  const { Navigate } = useNavigation();
  return (
    <HStack
      justify="space-between"
      background="iceBlue.500"
      height="68px"
      p={3}
      borderRadius="base"
      width="full"
    >
      <Box width="50%">
        <Text color="charcoalGrey" fontSize="sm">
          {props.bookingStartDate}
        </Text>
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontWeight="semibold"
          noOfLines={1}
        >
          {props.bookingStartTime}
        </Text>
      </Box>
      <Navigate
        name="TELEMED_CHAT"
        query={{ consultationId: props.consultationId }}
      >
        <Link
          width="121px"
          height="40px"
          variant="solid"
          background="main.500"
          fontSize="md"
          fontWeight="semibold"
        >
          Mulai Chat
        </Link>
      </Navigate>
    </HStack>
  );
}

export function MyTelemedicineBookedFilledDesktop(props: {
  bookingStartDate: string;
  bookingStartTime: string;
}) {
  return (
    <Box
      background="gray.500"
      height="68px"
      p={3}
      borderRadius="base"
      width="full"
    >
      <Text color="brownGrey.500" fontSize="sm">
        Jadwal Mendatang
      </Text>
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontWeight="semibold"
        noOfLines={1}
      >
        {props.bookingStartDate}, {props.bookingStartTime}
      </Text>
    </Box>
  );
}

export function MyTelemedicineBookedUnFilledDesktop(props: {
  consultationId: string;
}) {
  const { Navigate } = useNavigation();
  return (
    <HStack
      justify="space-between"
      background="squash.50"
      height="68px"
      p={3}
      borderRadius="base"
      width="full"
    >
      <HStack width="70%">
        <WarningIcon
          bgColor="squash.500"
          color="white"
          borderRadius="full"
          border="5px solid"
          borderColor="squash.500"
          boxSize="24px"
          boxShadow="0 3px 6px 0 rgba(243, 159, 30, 0.4)"
        />
        <Text color="squash.700" fontSize="sm">
          Lengkapi form konsultasi ini sebelum chat dokter, ya
        </Text>
      </HStack>
      <Navigate
        name="TELEMEDICINE_FORM"
        query={{ consultationId: props.consultationId }}
      >
        <Link fontSize="sm" color="squash.600" fontWeight="semibold">
          Isi Form
        </Link>
      </Navigate>
    </HStack>
  );
}

function GenerateStatusMyTelemedicineBooked(props: {
  consultationId: string;
  bookingStartDate: string;
  bookingStartTime: string;
  status: "unfilled" | "filled" | "start";
}) {
  switch (props.status) {
    case "start":
      return <MyTelemedicineBookedStartDesktop {...props} />;
    case "unfilled":
      return <MyTelemedicineBookedUnFilledDesktop {...props} />;
    default:
      return <MyTelemedicineBookedFilledDesktop {...props} />;
  }
}

export function MyBookedTelemedicineCardDesktop(
  props: MyBookedTelemedicineCardDesktopProps
) {
  const Image = useImage();
  return (
    <VStack
      background="white"
      borderRadius="2xl"
      boxShadow="base"
      p={4}
      alignItems="normal"
      spacing={4}
    >
      <HStack justify="space-between">
        <Text
          color="charcoalGrey"
          fontSize="sm"
          fontWeight="semibold"
          noOfLines={1}
          width="70%"
        >
          <SimpleUserIcon boxSize="20px" mr={2} />
          {props.patientName}
        </Text>
        <Text color="brownGrey.500" fontSize="sm">
          {props.createdAt}
        </Text>
      </HStack>
      <Divider border="0.5px solid" borderColor="veryLightPink" />
      <HStack spacing={3} align="flex-start" width="full">
        <HStack width="full" align="flex-start">
          <Image
            alt={props.doctorName}
            src={props.doctorImageUrl}
            layout="fill"
            objectFit="cover"
            sizes="56px"
            wrapperProps={{
              boxSize: "56px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Box width="80%">
            <Text
              color="charcoalGrey"
              fontFamily="poppins"
              fontSize="md"
              fontWeight="semibold"
              noOfLines={2}
              mb={0.5}
            >
              {props.doctorName}
            </Text>
            <Text color="sea.500" fontSize="sm">
              {props.speciality}
            </Text>
          </Box>
        </HStack>
        <GenerateStatusMyTelemedicineBooked {...props} />
      </HStack>
    </VStack>
  );
}

export function MyBookedTelemedicineCardDesktopSkeleton() {
  return (
    <VStack
      background="white"
      borderRadius="2xl"
      boxShadow="base"
      p={4}
      alignItems="normal"
      spacing={4}
    >
      <HStack justify="space-between">
        <Skeleton width="126px" height="22px" />
        <Skeleton width="69px" height="22px" />
      </HStack>
      <Divider border="0.5px solid" borderColor="veryLightPink" />
      <HStack spacing={3} align="flex-start" width="full">
        <HStack width="full" align="flex-start">
          <SkeletonCircle boxSize="56px" />
          <Box width="80%">
            <Skeleton width="193px" height="24px" />
            <Skeleton width="193px" height="24px" my={0.5} />
            <Skeleton width="80px" height="22px" />
          </Box>
        </HStack>
        <Skeleton width="full" height="68px" borderRadius="base" />
      </HStack>
    </VStack>
  );
}
