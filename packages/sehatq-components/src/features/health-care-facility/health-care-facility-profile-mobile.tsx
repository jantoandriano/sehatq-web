import React from "react";
import { Box, Button, Skeleton, Text } from "../../user-interfaces";
import { Content } from "../layout";

export type HealthCareFacilityProfileMobileProps = {
  description: string;
  showMoreButton: boolean;
  showAll: boolean;
  onShowMore: () => void;
  hcfType: string;
};

export function HealthCareFacilityProfileMobile(
  props: HealthCareFacilityProfileMobileProps
) {
  return (
    <Box width="full">
      <Text
        fontSize="md"
        color="charcoalGrey"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Profil {props.hcfType}
      </Text>
      <Box mt={2} noOfLines={props.showAll ? undefined : 9}>
        <Content>{props.description}</Content>
      </Box>
      {props.showMoreButton && (
        <Button
          _focus={{ border: "none" }}
          variant="unstyled"
          fontSize="sm"
          fontWeight="semibold"
          color="sea.500"
          onClick={props.onShowMore}
          cursor="pointer"
        >
          {props.showAll ? "Sembunyikan" : "Lihat selengkapnya"}
        </Button>
      )}
    </Box>
  );
}

export function HealthCareFacilityProfileMobileSkeleton() {
  return (
    <Box width="full">
      <Skeleton width="147px" height="22px" />
      <Skeleton width="full" height="18px" mt={2} />
      <Skeleton width="full" height="18px" mt={1} />
      <Skeleton width="100px" height="18px" mt={1} />
    </Box>
  );
}
