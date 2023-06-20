import React from "react";
import { useNavigation } from "@sehatq/utils";
import { ASSETS } from "@sehatq/constants";
import {
  HStack,
  Skeleton,
  SkeletonCircle,
  Text,
  useImage,
  VStack,
  Link,
} from "../../user-interfaces";

export type PrescriptionDoctorCardMobileProps = {
  prescription?: {
    name: string;
    speciality: string;
    image: string;
  };
};

export function PrescriptionDoctorCardMobile(
  props: PrescriptionDoctorCardMobileProps
) {
  const Image = useImage();
  const { prescription } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      {prescription && (
        <VStack
          align="start"
          background="white"
          borderRadius="lg"
          boxShadow="base"
          p={4}
          spacing={4}
          width="full"
        >
          <Text
            color="charcoalGrey"
            fontSize="sm"
            lineHeight="7"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Informasi Dokter
          </Text>
          <HStack spacing={3} align="flex-start">
            <Image
              alt={prescription.name ?? "no-image"}
              src={prescription.image ?? ASSETS.NO_IMAGE_DOCTOR_MALE}
              priority
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                boxSize: "52px",
                position: "relative",
                borderRadius: "full",
                overflow: "hidden",
              }}
            />
            <VStack spacing={1} align="flex-start">
              <Text
                color="charcoalGrey"
                fontSize="sm"
                fontWeight="semibold"
                fontFamily="poppins"
                lineHeight="5"
              >
                {prescription.name}
              </Text>
              <Text color="sea.500" fontSize="sm" lineHeight="4">
                {prescription.speciality}
              </Text>
            </VStack>
          </HStack>
          <Navigate name="TELEMED_HISTORIES">
            <Link
              variant="outline"
              color="sea.500"
              borderColor="main.500"
              size="sm"
              fontSize="xs"
              height="28px"
              borderRadius="base"
              width="full"
            >
              Lihat Chat dengan Dokter
            </Link>
          </Navigate>
        </VStack>
      )}
    </>
  );
}

export function PrescriptionDoctorCardSkeletonMobile() {
  return (
    <VStack
      align="start"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      p={4}
      spacing={4}
      width="full"
    >
      <Skeleton width="119px" height="21px" />
      <HStack spacing={3} align="flex-start">
        <SkeletonCircle boxSize="52px" />
        <VStack spacing={1} align="flex-start">
          <Skeleton width="218px" height="21px" />
          <Skeleton width="65px" height="16px" />
        </VStack>
      </HStack>
      <Skeleton width="296px" height="28px" />
    </VStack>
  );
}
