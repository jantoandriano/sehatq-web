import React from "react";
import { Box, Button, Skeleton, Text } from "../../user-interfaces";
import { Content } from "../layout";

export type HealthCareFacilityProfileDesktopProps = {
  description: string;
  showMoreButton: boolean;
  showAll: boolean;
  onShowMore: () => void;
  hcfType: string;
};

export function HealthCareFacilityProfileDesktop(
  props: HealthCareFacilityProfileDesktopProps
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
      <Box mt={2} noOfLines={props.showAll ? undefined : 3}>
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

export function HealthCareFacilityProfileDesktopSkeleton() {
  return (
    <Box width="full">
      <Skeleton width="149px" height="24px" />
      <Skeleton width="full" height="20px" mt={2} />
      <Skeleton width="full" height="20px" mt={1} />
      <Skeleton width="300px" height="20px" mt={1} />
    </Box>
  );
}
