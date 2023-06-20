import React from "react";
import { useNavigation, parseToDate } from "@sehatq/utils";
import {
  Flex,
  HStack,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  TelemedicineIcon,
  useImage,
} from "../../user-interfaces";

type MyBookedTelemedicineItemProps = {
  id: number;
  status: string;
  doctorImageUrl: string;
  doctorName: string;
  speciality: string;
  hcfName: string;
  bookingStartAt: string;
  bookingEndAt: string;
  schedule: string;
  isSingleItem?: boolean;
};

export type MyBookedTelemedicineBannerMobileProps = {
  bookedConsultations: MyBookedTelemedicineItemProps[];
};

export function MyBookedTelemedicineBannerMobile(
  props: MyBookedTelemedicineBannerMobileProps
) {
  const { bookedConsultations } = props;
  return (
    <Flex direction="column" pt={5} pb={2}>
      <Flex direction="row" justify="space-between" px={4}>
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
        >
          Sesi Konsultasi Mendatang
        </Text>
      </Flex>
      <HStack
        width="full"
        overflowX="auto"
        mt={3}
        px={4}
        pb={3}
        spacing={2.5}
        alignItems="stretch"
      >
        {bookedConsultations.length &&
          bookedConsultations.map((booked) => (
            <MyBookedTelemedicineItem
              {...booked}
              key={booked.id}
              isSingleItem={bookedConsultations.length == 1}
            />
          ))}
      </HStack>
    </Flex>
  );
}

function MyBookedTelemedicineItem(props: MyBookedTelemedicineItemProps) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const {
    id,
    doctorName,
    speciality,
    hcfName,
    schedule,
    doctorImageUrl,
    status,
    bookingStartAt,
    bookingEndAt,
    isSingleItem,
  } = props;
  const currentConsultation =
    parseToDate(bookingStartAt, "yyyy-MM-dd HH:mm:ss").getTime() <=
      new Date().getTime() &&
    parseToDate(bookingEndAt, "yyyy-MM-dd HH:mm:ss").getTime() >=
      new Date().getTime();
  return (
    <Flex
      direction="column"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      {...(isSingleItem && { maxWidth: "328px", width: "100%" })}
    >
      <Flex px={3} py={2}>
        <TelemedicineIcon />
        <Text color="sea.500" fontWeight="semibold" fontSize="xs" pl={1}>
          Chat Dokter
        </Text>
      </Flex>
      <HStack
        spacing={5}
        borderTop="solid 0.5px"
        borderTopColor="veryLightPink"
        pb={3}
        px={3}
        justify="space-between"
      >
        <Flex direction="column" pt={2} width="192px">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            fontFamily="poppins"
            color="charcoalGrey"
            noOfLines={1}
          >
            {doctorName}
          </Text>
          <HStack spacing={0.5} pt={0.5} pb={2} align="flex-start">
            <Text fontSize="xs" noOfLines={1}>
              {speciality}
            </Text>
            <Text fontSize="sm" color="brownGrey.500">
              •
            </Text>
            <Text fontSize="xs" noOfLines={1}>
              {hcfName}
            </Text>
          </HStack>
          {status === "init" ? (
            <Navigate name="TELEMEDICINE_FORM" query={{ consultationId: id }}>
              <Link
                variant="fit"
                display="flex"
                justifyContent="space-between"
                p={2}
                borderRadius="base"
                background="squash.50"
              >
                <Text fontSize="xxs" color="#a65c00">
                  Form belum dilengkapi
                </Text>
                <Text fontSize="xxs" fontWeight="semibold" color="#d88400">
                  Isi Form
                </Text>
              </Link>
            </Navigate>
          ) : status === "pending" ? (
            <Text
              fontSize="xxs"
              color="charcoalGrey"
              p={2}
              background="gray.500"
              borderRadius="base"
            >
              {schedule}
            </Text>
          ) : currentConsultation ? (
            <Navigate name="TELEMED_CHAT" query={{ consultationId: id }}>
              <Link
                variant="solid"
                fontSize="xs"
                fontWeight="semibold"
                colorScheme="main"
                borderRadius="base"
              >
                Mulai Chat
              </Link>
            </Navigate>
          ) : null}
        </Flex>
        <Image
          alt={doctorName}
          src={doctorImageUrl}
          priority
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            width: "72px",
            height: "72px",
            position: "relative",
            borderRadius: "full",
            overflow: "hidden",
          }}
        />
      </HStack>
    </Flex>
  );
}

export function MyBookedTelemedicineBannerMobileSkeleton() {
  return (
    <Flex direction="column" py={3}>
      <Flex direction="row" justify="space-between" px={3}>
        <Skeleton width="164px" height="20px" />
      </Flex>
      <HStack
        width="full"
        overflowX="auto"
        mt={3}
        px={3}
        pb={1}
        spacing={2.5}
        alignItems="stretch"
      >
        {Array.from(Array(4).keys()).map((index) => (
          <Flex
            direction="column"
            background="white"
            borderRadius="xl"
            boxShadow="base"
            key={index}
          >
            <Flex px={3} py={2}>
              <SkeletonCircle boxSize="16px" />
              <Skeleton width="70px" height="17px" ml={1} />
            </Flex>
            <HStack
              spacing={5}
              borderTop="solid 0.5px"
              borderTopColor="veryLightPink"
              pb={3}
              px={3}
            >
              <Flex direction="column" pt={2} width="192px">
                <Skeleton width="80%" height="20px" />
                <Skeleton width="60%" height="17px" mt={1} mb={2} />
                <Skeleton width="full" height="30px" />
              </Flex>
              <SkeletonCircle boxSize="72px" />
            </HStack>
          </Flex>
        ))}
      </HStack>
    </Flex>
  );
}
