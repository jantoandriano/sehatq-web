import React from "react";
import { useNavigation, parseToDate } from "@sehatq/utils";
import {
  Box,
  Flex,
  HStack,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  TelemedicineIcon,
  useImage,
  Grid,
  LinkBox,
  LinkOverlay,
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
};

export type MyBookedTelemedicineBannerDesktopProps = {
  bookedConsultations: MyBookedTelemedicineItemProps[];
};

export function MyBookedTelemedicineBannerDesktop(
  props: MyBookedTelemedicineBannerDesktopProps
) {
  const { bookedConsultations } = props;
  return (
    <Flex
      padding={6}
      direction="column"
      backgroundImage="linear-gradient(to bottom, rgba(240, 249, 250, 0) 0%, #f0f9fa 100%);"
      borderRadius="3xl"
    >
      <Text
        color="charcoalGrey"
        fontSize="xl"
        fontFamily="poppins"
        fontWeight="semibold"
        marginBottom={4}
      >
        Sesi Konsultasi Mendatang
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {bookedConsultations?.length &&
          bookedConsultations.map((booked) => (
            <MyBookedTelemedicineItem {...booked} key={booked.id} />
          ))}
      </Grid>
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
      borderRadius="2xl"
      boxShadow="base"
    >
      <Flex p={3} align="center">
        <TelemedicineIcon />
        <Text color="sea.500" fontWeight="semibold" fontSize="sm" pl={2}>
          Chat Dokter
        </Text>
      </Flex>
      <HStack
        spacing={1.5}
        borderTop="solid 0.5px"
        borderTopColor="veryLightPink"
        px={3}
        pb={3}
        pt={2}
        justify="space-between"
        width="full"
      >
        <Box flex={1}>
          <Text
            fontSize="base"
            fontWeight="semibold"
            fontFamily="poppins"
            color="charcoalGrey"
            noOfLines={1}
          >
            {doctorName}
          </Text>
          <HStack spacing={0.5} pb={1.5}>
            <Text fontSize="sm" noOfLines={1}>
              {speciality}
            </Text>
            <Text fontSize="lg" color="brownGrey.500">
              •
            </Text>
            <Text fontSize="sm" noOfLines={1}>
              {hcfName}
            </Text>
          </HStack>
          {status === "init" ? (
            <LinkBox>
              <Flex
                justifyContent="space-between"
                px={2}
                py={1.5}
                borderRadius="base"
                background="squash.50"
              >
                <Text fontSize="xs" color="#a65c00">
                  Form belum dilengkapi
                </Text>
                <Navigate
                  name="TELEMEDICINE_FORM"
                  query={{ consultationId: id }}
                >
                  <LinkOverlay
                    fontSize="xs"
                    fontWeight="semibold"
                    color="#d88400"
                  >
                    Isi Form
                  </LinkOverlay>
                </Navigate>
              </Flex>
            </LinkBox>
          ) : status === "pending" ? (
            <Text
              fontSize="xs"
              color="charcoalGrey"
              px={2}
              py={1.5}
              background="gray.500"
              borderRadius="base"
              display="inline-block"
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
        </Box>
        <Image
          alt={doctorName}
          src={doctorImageUrl}
          priority
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            width: "80px",
            height: "80px",
            position: "relative",
            borderRadius: "full",
            overflow: "hidden",
          }}
        />
      </HStack>
    </Flex>
  );
}

export function MyBookedTelemedicineBannerDesktopSkeleton() {
  return (
    <Flex
      padding={6}
      direction="column"
      backgroundImage="linear-gradient(to bottom, rgba(240, 249, 250, 0) 0%, #f0f9fa 100%);"
      borderRadius="3xl"
    >
      <Skeleton width="275px" height="20px" mt={2} mb={6} />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {Array.from(Array(3).keys()).map((id) => (
          <Flex
            key={id}
            direction="column"
            background="white"
            borderRadius="2xl"
            boxShadow="base"
          >
            <Flex p={3} align="center">
              <SkeletonCircle boxSize="16px" />
              <Skeleton width="82px" height="14px" ml={2} my={1} />
            </Flex>
            <HStack
              spacing={1.5}
              borderTop="solid 0.5px"
              borderTopColor="veryLightPink"
              px={3}
              pb={3}
              pt={2}
              justify="space-between"
              width="full"
            >
              <Box flex={1}>
                <Skeleton width="80%" height="16px" mt={1} />
                <Skeleton width="full" height="14px" mt={3} mb={3} />
                <Skeleton width="90%" height="30px" />
              </Box>
              <SkeletonCircle boxSize="80px" />
            </HStack>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
