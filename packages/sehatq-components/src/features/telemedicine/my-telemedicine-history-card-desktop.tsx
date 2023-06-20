import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import {
  Box,
  Divider,
  HStack,
  Link,
  SehatQDownloadIcon,
  SimpleUserIcon,
  Skeleton,
  SkeletonCircle,
  StarRating,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";
import { GoToPrescriptionDetail } from "../prescription";
import { MyTelemedicineHistoryCardGeneralProps } from "./my-telemedicine-history-card-mobile";

export type MyTelemedicineHistoryCardDesktopProps =
  MyTelemedicineHistoryCardGeneralProps & {
    isDownloading: boolean;
    downloadDoctorNote: () => void;
  };

export function MyTelemedicineHistoryCardDesktop(
  props: MyTelemedicineHistoryCardDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["DOCTOR_NOTE_BLUE"]);
  return (
    <VStack
      divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
      background="white"
      borderRadius="2xl"
      boxShadow="base"
      p={4}
      alignItems="normal"
      spacing={3}
    >
      <HStack justify="space-between">
        <Text
          color="charcoalGrey"
          fontSize="sm"
          fontWeight="semibold"
          noOfLines={1}
          width="70%"
        >
          {props.patientName && <SimpleUserIcon boxSize="20px" mr={2} />}
          {props.patientName || props.consultationId}
        </Text>
        <Text color="brownGrey.500" fontSize="sm">
          {props.createdAt}
        </Text>
      </HStack>
      <HStack align="flex-start" spacing={3} justify="space-between">
        <HStack spacing={3} align="flex-start" width="50%">
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
            >
              {props.doctorName}
            </Text>
            <Text color="sea.500" fontSize="sm" my={1}>
              {props.speciality}
            </Text>
            {props.ratingAvg && (
              <StarRating
                rating={props.ratingAvg ?? 0}
                useSingleStar
                fontSize="sm"
                iconHeight="16px"
                iconWidth="16px"
                colorRatingLabel="charcoalGrey"
                ratingTotal={props.totalReview}
              />
            )}
          </Box>
        </HStack>
        <VStack spacing={3} width="50%">
          {(props.hasPrescription || props.hasDoctorNote) && (
            <VStack
              spacing={2}
              border="0.5px solid"
              borderColor="veryLightPink"
              borderRadius="base"
              p={2}
              width="full"
              divider={<Divider margin={0} borderColor="veryLightPink" />}
            >
              {props.hasPrescription && (
                <GoToPrescriptionDetail consultationId={props.consultationId} />
              )}
              {props.hasDoctorNote && (
                <HStack
                  width="full"
                  justifyContent="space-between"
                  align="center"
                  cursor={props.doctorNoteId ? "pointer" : undefined}
                  background={props.isDownloading ? "gray.500" : undefined}
                  onClick={
                    !props.isDownloading && props.doctorNoteId
                      ? props.downloadDoctorNote
                      : undefined
                  }
                >
                  <HStack>
                    <Image
                      src={ASSETS.DOCTOR_NOTE_BLUE}
                      alt="Doctor Note"
                      width={24}
                      height={24}
                      layout="fixed"
                      priority
                    />
                    <Text
                      fontSize="sm"
                      color="charcoalGrey"
                      fontWeight="semibold"
                      textAlign="start"
                      lineHeight="4"
                    >
                      Catatan Dokter
                    </Text>
                  </HStack>
                  {props.doctorNoteId && (
                    <SehatQDownloadIcon color="charcoalGrey" boxSize="24px" />
                  )}
                </HStack>
              )}
            </VStack>
          )}
          <HStack justify="space-between" width="full">
            <Box width="50%">
              <Text color="charcoalGrey" fontSize="sm">
                Total pembayaran
              </Text>
              <Text
                color="sea.500"
                fontSize="md"
                fontWeight="bold"
                noOfLines={1}
              >
                {props.consultationFee}
              </Text>
            </Box>
            <Navigate
              name="TELEMED_HISTORY"
              query={{ consultationId: props.consultationId }}
            >
              <Link
                width="140px"
                height="40px"
                variant="outline"
                color="sea.500"
                fontSize="md"
                fontWeight="semibold"
                borderColor="main.500"
              >
                Lihat Detail
              </Link>
            </Navigate>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

export function MyTelemedicineHistoryCardDesktopSkeleton() {
  return (
    <VStack
      divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
      background="white"
      borderRadius="lg"
      boxShadow="base"
      p={4}
      alignItems="normal"
      spacing={4}
    >
      <HStack justify="space-between">
        <Skeleton width="126px" height="22px" />
        <Skeleton width="69px" height="22px" />
      </HStack>
      <HStack align="flex-start" spacing={3} justify="space-between">
        <HStack spacing={3} align="flex-start" width="50%">
          <SkeletonCircle boxSize="56px" />
          <Box width="80%">
            <Skeleton width="193px" height="24px" />
            <Skeleton width="193px" height="24px" my={1} />
            <Skeleton width="80px" height="22px" />
          </Box>
        </HStack>
        <HStack justify="space-between" width="50%">
          <Box width="50%">
            <Text color="charcoalGrey" fontSize="sm">
              Total pembayaran
            </Text>
            <Skeleton width="150px" height="28px" />
          </Box>
          <Skeleton width="140px" height="40px" borderRadius="base" />
        </HStack>
      </HStack>
    </VStack>
  );
}
