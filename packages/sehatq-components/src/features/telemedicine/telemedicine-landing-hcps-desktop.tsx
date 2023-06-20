import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, SimpleGrid, Text, Skeleton } from "../../user-interfaces";
import {
  SimpleTelemedicineHCPCard,
  SimpleTelemedicineHCPCardProps,
  SimpleTelemedicineHCPCardSkeleton,
} from "./simple-telemedicine-hcp-card";

export type TelemedicineLandingHCPSDesktopProps = {
  hcps: SimpleTelemedicineHCPCardProps[];
};

export function TelemedicineLandingHCPSDesktop(
  props: TelemedicineLandingHCPSDesktopProps
) {
  const { hcps } = props;
  const ASSETS = useAssets(["TELEMED_LANDING_HCPS_BG"]);
  return (
    <Box
      backgroundImage={ASSETS.TELEMED_LANDING_HCPS_BG}
      backgroundColor="sea.500"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center center"
      borderRadius="3xl"
      p={6}
    >
      <Text
        fontSize="lg"
        color="white"
        fontFamily="poppins"
        fontWeight="semibold"
      >
        Chat Dokter untuk Konsultasi
      </Text>
      <Text color="white" mt={1}>
        Tanyakan kondisi kesehatanmu ke ahlinya
      </Text>
      <SimpleGrid columns={5} spacing={4} mt={4}>
        {hcps.map((hcp) => (
          <Box key={hcp.doctorId}>
            <SimpleTelemedicineHCPCard {...hcp} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export function TelemedicineLandingHCPSDesktopSkeleton() {
  const ASSETS = useAssets(["TELEMED_LANDING_HCPS_BG"]);
  return (
    <Box
      backgroundImage={ASSETS.TELEMED_LANDING_HCPS_BG}
      backgroundColor="sea.500"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center center"
      borderRadius="3xl"
      p={6}
    >
      <Skeleton width="268px" height="18px" mt={1} />
      <Skeleton width="315px" height="16px" mt={3} />
      <SimpleGrid columns={5} spacing={4} mt={5}>
        {Array.from(Array(5).keys()).map((id) => (
          <Box key={id}>
            <SimpleTelemedicineHCPCardSkeleton isMobile={false} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
