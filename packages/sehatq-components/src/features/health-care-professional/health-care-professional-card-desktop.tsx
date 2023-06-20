import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Flex,
  Skeleton,
  SkeletonCircle,
  GraySehatQIcon,
  Box,
  Text,
  useImage,
  Link,
} from "../../user-interfaces";

export type HealthCareProfessionalCardDesktopProps = {
  doctorName: string;
  doctorSlug: string;
  speciality: string;
  hcfName: string;
  hcfAddress: string;
  imageUrl: string;
  imageAlt: string;
  imagePriority?: boolean;
};

export function HealthCareProfessionalCardDesktop(
  props: HealthCareProfessionalCardDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const {
    doctorName,
    speciality,
    hcfName,
    hcfAddress,
    imageUrl,
    imageAlt,
    doctorSlug,
    imagePriority,
  } = props;
  return (
    <Flex
      flexDirection="row"
      borderRadius="lg"
      boxShadow="base"
      backgroundColor="white"
      p={5}
      justify="space-between"
      alignItems="flex-start"
    >
      <Image
        alt={imageAlt ?? `dokter-${doctorName}`}
        src={imageUrl}
        priority={imagePriority}
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          boxSize: "70px",
          position: "relative",
          borderRadius: "full",
          overflow: "hidden",
        }}
      />
      <Flex flex="1" alignItems="center" marginLeft={4}>
        <Box flex="1">
          <Text fontFamily="poppins" fontWeight="semibold">
            {doctorName}
          </Text>
          <Text color="sea.500" fontSize="xs" marginBottom={1}>
            {speciality}
          </Text>
          <Text fontSize="xs" lineHeight="tall" fontWeight="semibold">
            {hcfName}
          </Text>
          <Text fontFamily="openSans" color="brownGrey.500" fontSize="xs">
            {hcfAddress}
          </Text>
        </Box>
        <Navigate
          name="HEALTH_CARE_PROFESIONAL"
          query={(oldQuery) => ({
            slugs: [doctorSlug],
            ...(oldQuery && oldQuery.hcfId ? { hcfId: oldQuery.hcfId } : null),
            ...(oldQuery && oldQuery.date ? { date: oldQuery.date } : null),
          })}
        >
          <Link
            fontFamily="openSans"
            variant="solid"
            colorScheme="main"
            size="md"
          >
            Lihat Detail
          </Link>
        </Navigate>
      </Flex>
    </Flex>
  );
}

export function HealthCareProfessionalCardDesktopSkeleton() {
  return (
    <Flex
      flexDirection="row"
      borderRadius="lg"
      boxShadow="base"
      backgroundColor="white"
      p={5}
      justify="space-between"
      alignItems="center"
    >
      <Box width="70px" height="70px" position="relative">
        <SkeletonCircle boxSize="70px" />
        <GraySehatQIcon
          boxSize="40px"
          position="absolute"
          transform="translate(-50%,-50%)"
          left="50%"
          top="50%"
        />
      </Box>
      <Box width="70%">
        <Skeleton width={150} height={3} />
        <Skeleton width={70} mt={2} height={3} />
        <Skeleton width={155} mt={2} height={3} />
        <Skeleton width={200} mt={2} height={3} />
      </Box>
      <Skeleton width={120} height={10} borderRadius="md" />
    </Flex>
  );
}
