import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  Text,
  Link,
  Skeleton,
  useImage,
} from "../../user-interfaces";
import { Content } from "../layout";

export interface MyMentalRecordMobileProps {
  iconUrl: string;
  diagnosisName: string;
  description: string;
  recommendation: string;
  telemedSpecialityId: string;
}

export function MyMentalRecordMobile(props: MyMentalRecordMobileProps) {
  const {
    iconUrl,
    diagnosisName,
    description,
    recommendation,
    telemedSpecialityId = "23",
  } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();

  return (
    <Box pt={5} background="main.100" width="100%">
      <Box px={8} pb={2} textAlign="center">
        <Image
          priority
          src={iconUrl}
          alt={diagnosisName}
          layout="fixed"
          height={141}
          width={129}
          wrapperProps={{
            overflow: "hidden",
          }}
        />
        <Text mt={5} fontSize="sm" fontWeight="semibold">
          Kamu menunjukkan gejala
        </Text>
        <Text
          mb={2}
          mt={1}
          fontSize="xl"
          fontWeight="semibold"
          fontFamily="poppins"
          color={diagnosisName.includes("Berat") ? "cherry.500" : "sea.500"}
        >
          {diagnosisName}
        </Text>
        <Text fontSize="sm" lineHeight="5" fontWeight="semibold">
          {description}
        </Text>
      </Box>
      <Box px={8} mt={2} mb={4}>
        <Content isMobile>{recommendation}</Content>
      </Box>
      <Box
        p={4}
        position="sticky"
        zIndex={2}
        bottom={0}
        width="100%"
        background="main.100"
      >
        <Navigate
          name="TELEMED_HCPS"
          query={{
            slug: "psikolog",
            specialityId: telemedSpecialityId,
          }}
        >
          <Link variant="solid" colorScheme="main" fontSize="md" width="100%">
            Lanjutkan ke Chat Dokter
          </Link>
        </Navigate>
      </Box>
    </Box>
  );
}

export function MyMentalRecordSkeletonMobile() {
  return (
    <Box background="main.100" width="100%">
      <Flex
        flexDirection="column"
        justify="center"
        align="center"
        px={8}
        pt={5}
        pb={2}
      >
        <Skeleton width="129px" height="120px" />
        <Skeleton mt={5} width="181px" height="19px" />
        <Skeleton mb={2} mt={1} width="137px" height="28px" />
        <Skeleton width="296px" height="40px" />
        <Box px={8} mt={2} mb={4}>
          <Skeleton width="296px" height="124px" />
        </Box>
      </Flex>
      <Box
        p={4}
        position="sticky"
        zIndex={2}
        bottom={0}
        width="100%"
        background="main.100"
      >
        <Skeleton width="100%" height="40px" />
      </Box>
    </Box>
  );
}
