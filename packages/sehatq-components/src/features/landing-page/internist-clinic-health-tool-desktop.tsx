import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  VStack,
  ArrowForwardIcon,
  Icon,
  IconButton,
  HStack,
  LinkOverlay,
  LinkBox,
} from "../../user-interfaces";

export function InternistClinicHealthToolDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["ICON_STOMACH", "ICON_GLUKOMETER"]);
  const { Navigate } = useNavigation();

  return (
    <HStack alignItems="flex-start" spacing={6}>
      <Box>
        <Text
          fontSize="7xl"
          fontFamily="poppins"
          fontWeight="bold"
          color="charcoalGrey"
          mb={5}
          lineHeight="48px"
        >
          Hindari Risiko Diabetes dan GERD. Cek Sekarang!
        </Text>
        <Text fontSize="md" color="charcoalGrey" lineHeight={9}>
          Melalui tes berikut, kamu dapat mengetahui seberapa besar risikomu
          terkena diabetes atau penyakit asam lambung dan apa saja yang harus
          kamu lakukan untuk menghindari penyakit tersebut.
        </Text>
      </Box>
      <VStack w="full" spacing={6}>
        <LinkBox
          display="flex"
          bgColor="white"
          borderRadius="lg"
          py={5}
          pl={12}
          pr={6}
          w="full"
          shadow="base"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center">
            <Image
              priority
              src={ASSETS.ICON_GLUKOMETER}
              alt="Icon Glukometer"
              height={56}
              width={56}
              layout="fixed"
            />

            <Navigate
              name="HEALTH_TOOL_DETAIL"
              query={{ slug: "cek-risiko-diabetes" }}
            >
              <LinkOverlay
                fontFamily="poppins"
                fontWeight="bold"
                fontSize="md"
                color="charcoalGrey"
                ml={5}
              >
                Diabetes
              </LinkOverlay>
            </Navigate>
          </Flex>
          <IconButton
            h={10}
            w={12}
            aria-label="views"
            borderRadius="full"
            icon={<Icon as={ArrowForwardIcon} w={6} h={6} />}
          />
        </LinkBox>
        <LinkBox
          display="flex"
          bgColor="white"
          borderRadius="lg"
          py={5}
          pl={12}
          pr={6}
          w="full"
          shadow="base"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center">
            <Image
              priority
              src={ASSETS.ICON_STOMACH}
              alt="Icon Lambung"
              height={56}
              width={56}
              layout="fixed"
            />
            <Navigate
              name="HEALTH_TOOL_DETAIL"
              query={{ slug: "cek-gejala-gerd" }}
            >
              <LinkOverlay
                fontFamily="poppins"
                fontWeight="bold"
                fontSize="md"
                color="charcoalGrey"
                ml={5}
              >
                GERD
              </LinkOverlay>
            </Navigate>
          </Flex>
          <IconButton
            h={10}
            w={12}
            aria-label="views"
            borderRadius="full"
            icon={<Icon as={ArrowForwardIcon} w={6} h={6} />}
          />
        </LinkBox>
      </VStack>
    </HStack>
  );
}

export function InternistClinicHealthToolSkeletonDesktop() {
  return (
    <HStack spacing={6} alignItems="flex-start">
      <VStack spacing={6} w="full">
        <SkeletonText w="full" />
        <SkeletonText w="full" />
      </VStack>
      <VStack spacing={6} w="full">
        <Skeleton h="88px" w="full" borderRadius="lg" />
        <Skeleton h="88px" w="full" borderRadius="lg" />
      </VStack>
    </HStack>
  );
}
