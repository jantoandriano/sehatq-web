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

export type MyBookedTelemedicineCardGeneralProps = {
  patientName: string;
  createdAt: string;
  doctorName: string;
  speciality: string;
  doctorImageUrl: string;
  consultationId: string;
  bookingStartDate: string;
  bookingStartTime: string;
  status: "unfilled" | "filled" | "start";
};

export type MyBookedTelemedicineCardMobileProps =
  MyBookedTelemedicineCardGeneralProps;

export function MyTelemedicineBookedStartMobile(props: {
  consultationId: string;
  bookingStartDate: string;
  bookingStartTime: string;
}) {
  const { Navigate } = useNavigation();
  return (
    <HStack
      justify="space-between"
      background="iceBlue.500"
      height="63px"
      p={3}
      borderRadius="base"
    >
      <Box width="50%">
        <Text color="charcoalGrey" fontSize="xs">
          {props.bookingStartDate}
        </Text>
        <Text
          color="charcoalGrey"
          fontSize="sm"
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
          height="36px"
          variant="solid"
          background="main.500"
          fontSize="sm"
          fontWeight="semibold"
        >
          Mulai Chat
        </Link>
      </Navigate>
    </HStack>
  );
}

export function MyTelemedicineBookedFilledMobile(props: {
  bookingStartDate: string;
  bookingStartTime: string;
}) {
  return (
    <Box background="gray.500" height="63px" p={3} borderRadius="base">
      <Text color="brownGrey.500" fontSize="xs">
        Jadwal Mendatang
      </Text>
      <Text
        color="charcoalGrey"
        fontSize="sm"
        fontWeight="semibold"
        noOfLines={1}
      >
        {props.bookingStartDate}, {props.bookingStartTime}
      </Text>
    </Box>
  );
}

export function MyTelemedicineBookedUnFilledMobile(props: {
  consultationId: string;
}) {
  const { Navigate } = useNavigation();
  return (
    <HStack
      justify="space-between"
      background="squash.50"
      height="63px"
      p={3}
      borderRadius="base"
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
        <Text color="squash.700" fontSize="xs">
          Lengkapi form konsultasi ini sebelum chat dokter, ya
        </Text>
      </HStack>
      <Navigate
        name="TELEMEDICINE_FORM"
        query={{ consultationId: props.consultationId }}
      >
        <Link fontSize="xs" color="squash.600" fontWeight="semibold">
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
      return <MyTelemedicineBookedStartMobile {...props} />;
    case "unfilled":
      return <MyTelemedicineBookedUnFilledMobile {...props} />;
    default:
      return <MyTelemedicineBookedFilledMobile {...props} />;
  }
}

export function MyBookedTelemedicineCardMobile(
  props: MyBookedTelemedicineCardMobileProps
) {
  const Image = useImage();
  return (
    <VStack
      background="white"
      borderRadius="lg"
      boxShadow="base"
      p={4}
      alignItems="normal"
      spacing={4}
    >
      <HStack justify="space-between">
        <Text
          color="charcoalGrey"
          fontSize="xs"
          fontWeight="semibold"
          noOfLines={1}
          width="70%"
        >
          <SimpleUserIcon boxSize="16px" mr={2} />
          {props.patientName}
        </Text>
        <Text color="brownGrey.500" fontSize="xs">
          {props.createdAt}
        </Text>
      </HStack>
      <Divider border="0.5px solid" borderColor="veryLightPink" />
      <HStack spacing={3} align="flex-start" width="full">
        <Image
          alt={props.doctorName}
          src={props.doctorImageUrl}
          layout="fill"
          objectFit="cover"
          sizes="40px"
          wrapperProps={{
            boxSize: "40px",
            position: "relative",
            borderRadius: "full",
            overflow: "hidden",
          }}
        />
        <Box width="80%">
          <Text
            color="charcoalGrey"
            fontFamily="poppins"
            fontSize="sm"
            fontWeight="semibold"
            noOfLines={2}
            mb={0.5}
          >
            {props.doctorName}
          </Text>
          <Text color="sea.500" fontSize="xs">
            {props.speciality}
          </Text>
        </Box>
      </HStack>
      <GenerateStatusMyTelemedicineBooked {...props} />
    </VStack>
  );
}

export function MyBookedTelemedicineCardMobileSkeleton() {
  return (
    <VStack
      background="white"
      borderRadius="lg"
      boxShadow="base"
      p={4}
      alignItems="normal"
      spacing={4}
    >
      <HStack justify="space-between">
        <Skeleton width="126px" height="18px" />
        <Skeleton width="69px" height="16px" />
      </HStack>
      <Divider border="0.5px solid" borderColor="veryLightPink" />
      <HStack spacing={3} align="flex-start" width="full">
        <SkeletonCircle boxSize="40px" />
        <Box width="80%">
          <Skeleton width="193px" height="20px" />
          <Skeleton width="193px" height="20px" my={0.5} />
          <Skeleton width="80px" height="16px" />
        </Box>
      </HStack>
      <Skeleton width="full" height="60px" borderRadius="base" />
    </VStack>
  );
}
