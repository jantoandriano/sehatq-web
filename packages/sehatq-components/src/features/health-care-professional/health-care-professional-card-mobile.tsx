import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  Skeleton,
  useImage,
  Text,
  LinkBox,
  LinkOverlay,
  SkeletonCircle,
  GraySehatQIcon,
} from "../../user-interfaces";

export type HealthCareProfessionalCardMobileProps = {
  doctorName: string;
  doctorSlug: string;
  speciality: string;
  hcfName: string;
  hcfAddress: string;
  imageUrl: string;
  imageAlt: string;
  imagePriority?: boolean;
};

export function HealthCareProfessionalCardMobile(
  props: HealthCareProfessionalCardMobileProps
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
    <LinkBox>
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
        ></Image>
        <Box width="68%">
          <Navigate
            name="HEALTH_CARE_PROFESIONAL"
            query={(oldQuery) => ({
              slugs: [doctorSlug],
              ...(oldQuery && oldQuery.hcfId
                ? { hcfId: oldQuery.hcfId }
                : null),
              ...(oldQuery && oldQuery.date ? { date: oldQuery.date } : null),
            })}
          >
            <LinkOverlay
              fontSize="15px"
              display="inline-block"
              fontWeight="semibold"
              fontFamily="poppins"
              lineHeight="short"
            >
              {doctorName}
            </LinkOverlay>
          </Navigate>
          <Text color="sea.500" fontSize="xs" marginBottom={1.5}>
            {speciality}
          </Text>
          <Text fontSize="xs" fontWeight="semibold" lineHeight="shorter">
            {hcfName}
          </Text>
          <Text fontFamily="openSans" color="brownGrey.500" fontSize="xs">
            {hcfAddress}
          </Text>
        </Box>
      </Flex>
    </LinkBox>
  );
}

export function HealthCareProfessionalCardMobileSkeleton() {
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
    </Flex>
  );
}
