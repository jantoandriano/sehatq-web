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

export type MyTelemedicineHistoryCardGeneralProps = {
  patientName?: string;
  createdAt: string;
  doctorName: string;
  speciality: string;
  doctorImageUrl: string;
  ratingAvg?: number;
  totalReview?: number;
  hasDoctorNote?: boolean;
  fileName?: string;
  consultationFee: string;
  consultationId: string;
  doctorNoteId: string;
  hasPrescription: boolean;
};

export type MyTelemedicineHistoryCardMobileProps =
  MyTelemedicineHistoryCardGeneralProps & {
    isDownloading: boolean;
    downloadDoctorNote: () => void;
  };

export function MyTelemedicineHistoryCardMobile(
  props: MyTelemedicineHistoryCardMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["DOCTOR_NOTE_BLUE"]);
  return (
    <VStack
      divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
      background="white"
      borderRadius="lg"
      boxShadow="base"
      p={4}
      alignItems="normal"
      spacing={3}
    >
      <HStack justify="space-between">
        <Text
          color="charcoalGrey"
          fontSize="xs"
          fontWeight="semibold"
          noOfLines={1}
          width="70%"
        >
          {props.patientName && <SimpleUserIcon boxSize="16px" mr={2} />}
          {props.patientName || props.consultationId}
        </Text>
        <Text color="brownGrey.500" fontSize="xs">
          {props.createdAt}
        </Text>
      </HStack>
      <VStack spacing={3}>
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
            >
              {props.doctorName}
            </Text>
            <Text color="sea.500" fontSize="xs" my={0.5}>
              {props.speciality}
            </Text>
            {props.ratingAvg && (
              <StarRating
                rating={props.ratingAvg ?? 0}
                useSingleStar
                iconWidth="14px"
                iconHeight="14px"
                fontSize="xs"
                colorRatingLabel="charcoalGrey"
                ratingTotal={props.totalReview}
              />
            )}
          </Box>
        </HStack>
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
              <GoToPrescriptionDetail
                isMobile
                consultationId={props.consultationId}
              />
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
      </VStack>
      <HStack justify="space-between">
        <Box width="50%">
          <Text color="charcoalGrey" fontSize="xs">
            Total pembayaran
          </Text>
          <Text color="sea.500" fontSize="sm" fontWeight="bold" noOfLines={1}>
            {props.consultationFee}
          </Text>
        </Box>
        <Navigate
          name="TELEMED_HISTORY"
          query={{ consultationId: props.consultationId }}
        >
          <Link
            width="121px"
            height="36px"
            variant="outline"
            color="sea.500"
            fontSize="sm"
            fontWeight="semibold"
            borderColor="main.500"
          >
            Lihat Detail
          </Link>
        </Navigate>
      </HStack>
    </VStack>
  );
}

export function MyTelemedicineHistoryCardMobileSkeleton() {
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
        <Skeleton width="126px" height="18px" />
        <Skeleton width="69px" height="16px" />
      </HStack>
      <HStack spacing={3} align="flex-start" width="full">
        <SkeletonCircle boxSize="40px" />
        <Box width="80%">
          <Skeleton width="193px" height="20px" />
          <Skeleton width="193px" height="20px" my={0.5} />
          <Skeleton width="80px" height="16px" />
        </Box>
      </HStack>
      <HStack justify="space-between">
        <Box width="50%">
          <Text color="charcoalGrey" fontSize="xs">
            Total pembayaran
          </Text>
          <Skeleton width="63px" height="19px" />
        </Box>
        <Skeleton width="121px" height="36px" borderRadius="base" />
      </HStack>
    </VStack>
  );
}
