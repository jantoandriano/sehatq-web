import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  LinkBox,
  HStack,
  LinkOverlay,
  Icon,
  ArrowForwardIcon,
} from "../../user-interfaces";

export function InternistClinicInfoMobile() {
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
      <Image
        priority
        src={ASSETS.ILLUSTRATION_BOTTLE_DIABETES}
        alt="ilustrasi diabetes"
        width={457}
        height={375}
        layout="responsive"
        wrapperProps={{ mb: 9 }}
      />
      <Text
        fontSize="3xl"
        fontFamily="poppins"
        fontWeight="bold"
        color="charcoalGrey"
        mb={3.5}
      >
        Fakta Diabetes
      </Text>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="charcoalGrey"
        lineHeight={7}
        mb={3}
      >
        Indonesia berada di posisi kelima dunia dengan jumlah pengidap diabetes
        sebanyak 19,47 juta.
      </Text>
      <Text fontSize="sm" color="charcoalGrey" fontStyle="italic" mb={7}>
        (International Diabetes Federation, 2021)
      </Text>
      <LinkBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2.5}
      >
        <HStack>
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
        </HStack>
        <Icon as={ArrowForwardIcon} h={5} w={6} color="#279091" />
      </LinkBox>

      <Image
        priority
        src={ASSETS.ILLUSTRATION_DOCTOR_DIABETES}
        alt="ilustrasi dokter diabetes"
        width={562}
        height={482}
        layout="responsive"
        wrapperProps={{ mb: 9 }}
      />
      <Text
        fontSize="3xl"
        fontFamily="poppins"
        fontWeight="bold"
        color="charcoalGrey"
        mb={3.5}
      >
        Stres & Kecemasan Bisa Berdampak pada Lambung
      </Text>
      <Text fontSize="sm" color="charcoalGrey" lineHeight={7} mb={7}>
        Meski berat rasanya, coba yuk kelola stres kamu. Cari tahu cara tepat
        mencegah kenaikan asam lambung.
      </Text>
      <LinkBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        <HStack>
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
        </HStack>
        <Icon as={ArrowForwardIcon} h={5} w={6} color="#279091" />
      </LinkBox>
      <LinkBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          <Image
            priority
            src={ASSETS.ICON_COMMENT_LIKE}
            alt="icon tanya dokter"
            width={56}
            height={56}
            layout="fixed"
          />
          <Navigate name="TELEMED_HCPS" query={{ slugs: ["penyakit-dalam"] }}>
            <LinkOverlay fontSize="md" fontWeight="semibold">
              Tanya Dokter
            </LinkOverlay>
          </Navigate>
        </HStack>
        <Icon as={ArrowForwardIcon} h={5} w={6} color="#279091" />
      </LinkBox>
    </Box>
  );
}

export function InternistClinicInfoSkeletonMobile() {
  return (
    <Box>
      {Array.from(Array(2).keys()).map((id) => (
        <React.Fragment key={id}>
          <Skeleton height="315px" borderRadius="lg" />
          <SkeletonText mt={5} />
          <SkeletonText mt={5} mb={5} />
          <Skeleton h={14} w="full" borderRadius="lg" mb={5} />
        </React.Fragment>
      ))}
      <Skeleton h={14} w="full" borderRadius="lg" />
    </Box>
  );
}
