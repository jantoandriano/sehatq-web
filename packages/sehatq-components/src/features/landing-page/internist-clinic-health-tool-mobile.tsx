import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  LinkBox,
  Flex,
  LinkOverlay,
  IconButton,
  Icon,
  ArrowForwardIcon,
  VStack,
} from "../../user-interfaces";

export function InternistClinicHealthToolMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["ICON_STOMACH", "ICON_GLUKOMETER"]);
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Text
        fontSize="3xl"
        fontFamily="poppins"
        fontWeight="bold"
        color="charcoalGrey"
        lineHeight={12}
        mb={3}
      >
        Hindari Risiko Diabetes dan GERD. Cek Sekarang!
      </Text>
      <Text fontSize="sm" color="charcoalGrey" lineHeight={8} mb={5}>
        Melalui tes berikut, kamu dapat mengetahui seberapa besar risikomu
        terkena diabetes atau penyakit asam lambung dan apa saja yang harus kamu
        lakukan untuk menghindari penyakit tersebut.
      </Text>
      <LinkBox
        display="flex"
        bgColor="white"
        borderRadius="lg"
        px={3}
        py={5}
        shadow="sm"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
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
        px={3}
        py={5}
        shadow="sm"
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
    </Box>
  );
}

export function InternistClinicHealthToolSkeletonMobile() {
  return (
    <Box>
      <SkeletonText mb={3} />
      <SkeletonText mb={5} />
      <VStack spacing={3} w="full">
        <Skeleton h={24} w="full" borderRadius="lg" />
        <Skeleton h={24} w="full" borderRadius="lg" />
      </VStack>
    </Box>
  );
}
