import { useNavigation, useAssets } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  Link,
  HStack,
  Skeleton,
  Text,
  Slider,
} from "../../user-interfaces";
import {
  TelemedicineLandingHCFCard,
  TelemedicineLandingHCFCardSkeleton,
} from "./telemedicine-landing-hcf-card";

export type TelemedicineLandingHCFSDesktopProps = {
  hcfs: {
    name: string;
    logoUrl: string;
    slug: string;
  }[];
};

export function TelemedicineLandingHCFSDesktop(
  props: TelemedicineLandingHCFSDesktopProps
) {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["HCF_PARTNER_WEB_BG"]);
  return (
    <>
      <Flex align="center" justify="space-between">
        <Text
          fontFamily="poppins"
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="9"
        >
          Chat Dokter dari RS Partner
        </Text>
        <Navigate name="TELEMED_FASKES">
          <Link variant="outline" size="md" borderColor="main.500">
            Lihat Semua RS Partner
          </Link>
        </Navigate>
      </Flex>
      <Box
        py={6}
        marginTop={5}
        borderRadius="xl"
        backgroundImage={ASSETS.HCF_PARTNER_WEB_BG}
        backgroundRepeat="no-repeat"
        justifyContent="flex-start"
        backgroundSize="cover"
        backgroundPosition="center center"
        height="228px"
      >
        {props.hcfs && (
          <Box ml="265px">
            <Slider
              slides={props.hcfs.map((dt, index) => ({
                ...dt,
                id: index,
              }))}
              slideGap={3}
              renderSlide={({ slide: hcf }) => (
                <Box key={hcf.slug} px={1}>
                  <TelemedicineLandingHCFCard {...hcf} isMobile={false} />
                </Box>
              )}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export function TelemedicineLandingHCFSDesktopSkeleton() {
  return (
    <>
      <Flex align="center" justify="space-between">
        <Skeleton width="250px" height="28px" />
        <Skeleton width="214px" height="40px" />
      </Flex>
      <Box
        py={6}
        marginTop={5}
        borderRadius="xl"
        background="linear-gradient(290deg, #54abad 100%, #2b8e8e)"
        height="228px"
      >
        <HStack spacing={3} overflowX="hidden" ml="265px">
          {Array.from(Array(5).keys()).map((id) => (
            <Box key={id} px={1}>
              <TelemedicineLandingHCFCardSkeleton isMobile={false} />
            </Box>
          ))}
        </HStack>
      </Box>
    </>
  );
}
