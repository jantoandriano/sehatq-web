import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, Text, Skeleton, Flex } from "../../user-interfaces";
import {
  SimpleTelemedicineHCPCard,
  SimpleTelemedicineHCPCardProps,
  SimpleTelemedicineHCPCardSkeleton,
} from "./simple-telemedicine-hcp-card";

export type TelemedicineLandingHCPSMobileProps = {
  hcps: SimpleTelemedicineHCPCardProps[];
};

export function TelemedicineLandingHCPSMobile(
  props: TelemedicineLandingHCPSMobileProps
) {
  const { hcps } = props;
  const ASSETS = useAssets(["TELEMED_LANDING_HCPS_BG2"]);
  return (
    <Box
      backgroundImage={ASSETS.TELEMED_LANDING_HCPS_BG2}
      backgroundColor="sea.500"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center center"
      pt={5}
    >
      <Box px={4}>
        <Text color="white" fontFamily="poppins" fontWeight="semibold">
          Chat Dokter untuk Konsultasi
        </Text>
        <Text color="white" fontSize="sm">
          Tanyakan kondisi kesehatanmu ke ahlinya
        </Text>
      </Box>
      <Flex px={3} mt={4} pb={5} overflowX="auto">
        {hcps.map((hcp) => (
          <Box key={hcp.doctorId} mx={1}>
            <SimpleTelemedicineHCPCard {...hcp} isMobile />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export function TelemedicineLandingHCPSMobileSkeleton() {
  const ASSETS = useAssets(["TELEMED_LANDING_HCPS_BG2"]);
  return (
    <Box
      backgroundImage={ASSETS.TELEMED_LANDING_HCPS_BG2}
      backgroundColor="sea.500"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center center"
      pt={5}
    >
      <Box px={4}>
        <Skeleton width="237px" height="16px" mt={1} />
        <Skeleton width="full" height="14px" mt={2} />
      </Box>
      <Flex px={3} mt={4} pb={5} overflowX="auto">
        {Array.from(Array(5).keys()).map((id) => (
          <Box key={id} mx={1}>
            <SimpleTelemedicineHCPCardSkeleton isMobile={true} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
