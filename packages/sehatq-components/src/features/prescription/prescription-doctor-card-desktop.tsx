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
  Flex,
  Link,
} from "../../user-interfaces";

export type PrescriptionDoctorCardDesktopProps = {
  prescription?: {
    name: string;
    speciality: string;
    image: string;
  };
};

export function PrescriptionDoctorCardDesktop(
  props: PrescriptionDoctorCardDesktopProps
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
          px={8}
          pt={4}
          pb={5}
          spacing={4}
          width="full"
        >
          <Text
            color="charcoalGrey"
            fontSize="md"
            lineHeight="7"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Informasi Dokter
          </Text>
          <Flex justify="space-between" align="center" width="full">
            <HStack spacing={3}>
              <Image
                alt={prescription.name ?? "no-image"}
                src={prescription.image ?? ASSETS.NO_IMAGE_DOCTOR_MALE}
                priority
                layout="fill"
                objectFit="cover"
                wrapperProps={{
                  boxSize: "80px",
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
              >
                Lihat Chat dengan Dokter
              </Link>
            </Navigate>
          </Flex>
        </VStack>
      )}
    </>
  );
}

export function PrescriptionDoctorCardSkeletonDesktop() {
  return (
    <VStack
      align="start"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      px={8}
      pt={4}
      pb={5}
      spacing={4}
      width="full"
    >
      <Skeleton width="242px" height="24px" />
      <Flex justify="space-between" align="center" width="full">
        <HStack spacing={3}>
          <SkeletonCircle boxSize="80px" />
          <VStack spacing={1} align="flex-start">
            <Skeleton width="218px" height="21px" />
            <Skeleton width="75px" height="19px" />
          </VStack>
        </HStack>
        <Skeleton width="181px" height="28px" />
      </Flex>
    </VStack>
  );
}
