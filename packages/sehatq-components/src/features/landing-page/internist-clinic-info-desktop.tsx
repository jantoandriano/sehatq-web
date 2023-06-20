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
  Icon,
  HStack,
  ArrowForwardIcon,
  LinkOverlay,
  LinkBox,
} from "../../user-interfaces";

export function InternistClinicInfoDesktop() {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets([
    "ILLUSTRATION_BOTTLE_DIABETES",
    "ICON_DRINKING_BOTTLES",
    "ILLUSTRATION_DOCTOR_DIABETES",
    "ICON_HOT_STOMACH",
    "ICON_COMMENT_LIKE",
  ]);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text
            fontSize="7xl"
            fontFamily="poppins"
            fontWeight="bold"
            color="charcoalGrey"
            mb={3}
          >
            Fakta Diabetes
          </Text>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="charcoalGrey"
            lineHeight={11}
            mb={2}
            w="570px"
          >
            Indonesia berada di posisi kelima dunia dengan jumlah pengidap
            diabetes sebanyak 19,47 juta.
          </Text>
          <Text fontSize="md" color="charcoalGrey" fontStyle="italic" mb={5}>
            (International Diabetes Federation, 2021)
          </Text>
          <LinkBox>
            <HStack spacing={4}>
              <Image
                priority
                src={ASSETS.ICON_DRINKING_BOTTLES}
                alt="icon info diabetes"
                width={56}
                height={56}
                layout="fixed"
              />
              <Navigate name="DISEASE" query={{ slugs: ["diabetes"] }}>
                <LinkOverlay fontSize="md" fontWeight="semibold">
                  Info Seputar Diabetes
                </LinkOverlay>
              </Navigate>
              <Icon as={ArrowForwardIcon} h={5} w={6} color="#279091" />
            </HStack>
          </LinkBox>
        </Box>
        <Image
          priority
          src={ASSETS.ILLUSTRATION_BOTTLE_DIABETES}
          alt="ilustrasi diabetes"
          width={457}
          height={375}
          layout="fixed"
        />
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" gap={10}>
        <Image
          priority
          src={ASSETS.ILLUSTRATION_DOCTOR_DIABETES}
          alt="ilustrasi dokter diabetes"
          width={562}
          height={482}
          layout="fixed"
        />
        <Box>
          <Text
            fontSize="7xl"
            fontFamily="poppins"
            fontWeight="bold"
            color="charcoalGrey"
            w="570px"
            mb={3}
          >
            Stres & Kecemasan Bisa Berdampak pada Lambung
          </Text>
          <Text color="charcoalGrey" lineHeight={9} mb={5} w="570px">
            Meski berat rasanya, coba yuk kelola stres kamu. Cari tahu cara
            tepat mencegah kenaikan asam lambung.
          </Text>
          <LinkBox mb={5}>
            <HStack spacing={4}>
              <Image
                priority
                src={ASSETS.ICON_HOT_STOMACH}
                alt="icon lambung"
                width={56}
                height={56}
                layout="fixed"
              />
              <Navigate name="SEARCH" query={{ q: "asam lambung" }}>
                <LinkOverlay fontSize="md" fontWeight="semibold">
                  Mencegah Asam Lambung
                </LinkOverlay>
              </Navigate>
              <Icon as={ArrowForwardIcon} h={5} w={6} color="#279091" />
            </HStack>
          </LinkBox>
          <LinkBox>
            <HStack spacing={4}>
              <Image
                priority
                src={ASSETS.ICON_COMMENT_LIKE}
                alt="icon tanya dokter"
                width={56}
                height={56}
                layout="fixed"
              />
              <Navigate
                name="TELEMED_HCPS"
                query={{ slugs: ["penyakit-dalam"] }}
              >
                <LinkOverlay fontSize="md" fontWeight="semibold">
                  Tanya Dokter
                </LinkOverlay>
              </Navigate>
              <Icon as={ArrowForwardIcon} h={5} w={6} color="#279091" />
            </HStack>
          </LinkBox>
        </Box>
      </Flex>
    </Box>
  );
}

export function InternistClinicInfoSkeletonDesktop() {
  return (
    <Box>
      <Flex justifyContent="space-between" mb={10}>
        <Box w="570px">
          <VStack spacing={7} alignItems="flex-start" w="full">
            <SkeletonText w="full" />
            <SkeletonText w="full" />
            <SkeletonText w="full" />
            <Skeleton h={14} w="300px" borderRadius="lg" />
          </VStack>
        </Box>
        <Skeleton width="538px" height="482px" borderRadius="2xl" />
      </Flex>
      <Flex justifyContent="space-between">
        <Skeleton width="538px" height="482px" borderRadius="2xl" />
        <Box w="570px">
          <VStack spacing={7} alignItems="flex-start" w="full">
            <SkeletonText w="full" />
            <SkeletonText w="full" />
            <SkeletonText w="full" />
            <Skeleton h={14} w="300px" borderRadius="lg" />
            <Skeleton h={14} w="300px" borderRadius="lg" />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
