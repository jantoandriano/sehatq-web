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
  LinkBox,
  LinkOverlay,
} from "../../user-interfaces";

export type SimpleHealthCareProfessionalCardDesktopProps = {
  doctorName: string;
  doctorSlug: string;
  speciality: string;
  hcfName: string;
  hcfAddress: string;
  imageUrl: string;
  imageAlt: string;
};

export function SimpleHealthCareProfessionalCardDesktop(
  props: SimpleHealthCareProfessionalCardDesktopProps
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
  } = props;
  return (
    <LinkBox>
      <Flex
        flexDirection="column"
        align="center"
        maxWidth="144px"
        minHeight="256px"
        borderRadius="xl"
        boxShadow="base"
        paddingY="2.5"
      >
        <Image
          alt={imageAlt ?? `dokter-${doctorName}`}
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          sizes="80px"
          wrapperProps={{
            boxSize: "80px",
            position: "relative",
            borderRadius: "full",
            overflow: "hidden",
          }}
        />
        <Navigate
          name="HEALTH_CARE_PROFESIONAL"
          query={{
            slugs: [doctorSlug],
          }}
        >
          <LinkOverlay
            paddingX="3"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="xs"
            marginTop={1}
            textAlign="center"
            noOfLines={2}
            title={`${doctorName} (${speciality}) di ${hcfName}, ${hcfAddress}`}
          >
            {doctorName}
          </LinkOverlay>
        </Navigate>
        <Text
          color="sea.500"
          fontSize="xxs"
          marginBottom={1.5}
          noOfLines={2}
          textAlign="center"
        >
          {speciality}
        </Text>
        <Flex
          align="center"
          flexDirection="column"
          paddingY="2.5"
          paddingX="2"
          marginX="2.5"
          bg="white"
          borderRadius="base"
        >
          <Text
            fontSize="xs"
            lineHeight="3"
            fontWeight="semibold"
            textAlign="center"
            noOfLines={2}
          >
            {hcfName}
          </Text>
          <Text
            mt="0.5"
            fontFamily="openSans"
            color="brownGrey.500"
            fontSize="xxs"
            textAlign="center"
            noOfLines={2}
          >
            {hcfAddress}
          </Text>
        </Flex>
      </Flex>
    </LinkBox>
  );
}

export function SimpleHealthCareProfessionalCardDesktopSkeleton() {
  return (
    <Flex
      flexDirection="column"
      align="center"
      maxWidth="144px"
      borderRadius="xl"
      boxShadow="base"
      paddingY="2.5"
    >
      <Box width="80px" height="80px" position="relative" marginBottom={1}>
        <SkeletonCircle boxSize="80px" />
        <GraySehatQIcon
          boxSize="40px"
          position="absolute"
          transform="translate(-50%,-50%)"
          left="50%"
          top="50%"
        />
      </Box>
      <Flex width="70%" flexDirection="column" align="center">
        <Skeleton width={124} height={4} />
        <Skeleton width={70} marginBottom={1.5} mt={0.5} height={4} />
      </Flex>
      <Flex
        align="center"
        flexDirection="column"
        paddingY="2.5"
        paddingX="2"
        marginX="2.5"
        bg="white"
        borderRadius="base"
      >
        <Skeleton width={110} height={8} />
        <Skeleton width={110} mt={0.5} height={7} />
      </Flex>
    </Flex>
  );
}
