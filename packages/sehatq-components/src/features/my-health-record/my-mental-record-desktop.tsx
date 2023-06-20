import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Text,
  Link,
  HStack,
  Skeleton,
  useImage,
} from "../../user-interfaces";
import { Content } from "../layout";

export interface MyMentalRecordDesktopProps {
  iconUrl: string;
  diagnosisName: string;
  description: string;
  recommendation: string;
  telemedSpecialityId: string;
}

export function MyMentalRecordDesktop(props: MyMentalRecordDesktopProps) {
  const {
    iconUrl = "",
    diagnosisName = "",
    description = "",
    recommendation = "",
    telemedSpecialityId = "23",
  } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();

  return (
    <Box
      p={7}
      borderRadius="xl"
      border="0.5px solid"
      borderColor="veryLightPink"
    >
      <HStack spacing={5}>
        <Image
          src={iconUrl}
          alt={diagnosisName}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            width: "127px",
            height: "130px",
            overflow: "hidden",
          }}
        />
        <Box>
          <Text fontSize="sm" lineHeight="6" fontWeight="semibold">
            Kamu menunjukkan gejala
          </Text>
          <Text
            mb={1}
            fontSize="3xl"
            lineHeight="11"
            fontWeight="semibold"
            fontFamily="poppins"
            color={diagnosisName.includes("Berat") ? "cherry.500" : "sea.500"}
          >
            {diagnosisName}
          </Text>
          <Text fontSize="md" lineHeight="6" fontWeight="semibold">
            {description}
          </Text>
        </Box>
      </HStack>
      <Box
        my={4}
        py={5}
        px={6}
        borderRadius="xl"
        background="main.100"
        width="100%"
      >
        <Text lineHeight="6" fontWeight="semibold" fontFamily="poppins">
          Rekomendasi:
        </Text>
        <Content isMobile>{recommendation}</Content>
      </Box>
      <Navigate
        name="TELEMED_HCPS"
        query={{
          slug: "psikolog",
          specialityId: telemedSpecialityId,
        }}
      >
        <Link variant="solid" colorScheme="main" w="100%" fontSize="md">
          Lanjutkan ke Chat Dokter
        </Link>
      </Navigate>
    </Box>
  );
}

export function MyMentalRecordSkeletonDesktop() {
  return (
    <Box
      p={7}
      borderRadius="xl"
      border="0.5px solid"
      borderColor="veryLightPink"
    >
      <HStack spacing={5} align="flex-start">
        <Skeleton width="127px" height="125px" />
        <Box>
          <Skeleton width="174px" height="22px" mb={1} />
          <Skeleton width="184px" height="32px" mb={1} />
          <Skeleton width="559px" height="44px" />
        </Box>
      </HStack>
      <Box
        my={4}
        py={5}
        px={6}
        borderRadius="xl"
        background="main.100"
        width="100%"
      >
        <Skeleton width="109px" height="24px" />
        <Skeleton width="660px" height="70px" mt={2.5} />
      </Box>
      <Skeleton mx={6} width="660px" height="50px" />
    </Box>
  );
}
