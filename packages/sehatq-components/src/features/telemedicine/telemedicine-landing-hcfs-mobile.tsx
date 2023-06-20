import { useNavigation, useAssets } from "@sehatq/utils";
import React from "react";
import { Box, Flex, HStack, Link, Skeleton, Text } from "../../user-interfaces";
import {
  TelemedicineLandingHCFCard,
  TelemedicineLandingHCFCardSkeleton,
} from "./telemedicine-landing-hcf-card";

export type TelemedicineLandingHCFSMobileProps = {
  hcfs: {
    name: string;
    logoUrl: string;
    slug: string;
  }[];
};

export function TelemedicineLandingHCFSMobile(
  props: TelemedicineLandingHCFSMobileProps
) {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["HCF_PARTNER_MWEB_BG"]);
  return (
    <Flex direction="column" justify="space-between">
      <Text
        px={4}
        color="charcoalGrey"
        fontSize="md"
        fontFamily="poppins"
        fontWeight="semibold"
      >
        Chat Dokter dari RS Partner
      </Text>
      <Box
        backgroundImage={ASSETS.HCF_PARTNER_MWEB_BG}
        backgroundRepeat="no-repeat"
        justifyContent="flex-start"
        backgroundSize="cover"
        backgroundPosition="center center"
        marginTop={3}
        marginBottom={4}
        py={4}
        height="132px"
      >
        <HStack ml="132px" spacing={1} align="center" overflowX="auto">
          {props.hcfs.map((hcf) => (
            <Box key={hcf.slug} px={0.5}>
              <TelemedicineLandingHCFCard {...hcf} isMobile={true} />
            </Box>
          ))}
        </HStack>
      </Box>
      <Box px={4}>
        <Navigate name="TELEMED_FASKES">
          <Link
            variant="outline"
            fontSize="sm"
            fontWeight="semibold"
            color="sea.500"
            borderColor="main.500"
            borderRadius="base"
            width="full"
            height="36px"
            background="white"
          >
            Lihat Semua RS Partner
          </Link>
        </Navigate>
      </Box>
    </Flex>
  );
}

export function TelemedicineLandingHCFSMobileSkeleton() {
  return (
    <Flex direction="column" justify="space-between">
      <Box px={4}>
        <Skeleton width="221px" height="23px" />
      </Box>
      <Box
        marginTop={3}
        marginBottom={4}
        py={4}
        height="132px"
        background="linear-gradient(290deg, #54abad 100%, #2b8e8e)"
      >
        <HStack ml="132px" spacing={1} align="center" overflowX="auto">
          {Array.from(Array(5).keys()).map((id) => (
            <Box key={id} px={0.5}>
              <TelemedicineLandingHCFCardSkeleton isMobile={true} />
            </Box>
          ))}
        </HStack>
      </Box>
      <Box px={4}>
        <Skeleton width="full" height="36px" borderRadius="base" />
      </Box>
    </Flex>
  );
}
