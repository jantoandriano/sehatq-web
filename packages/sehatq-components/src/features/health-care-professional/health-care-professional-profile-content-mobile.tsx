import React from "react";
import { Box, Skeleton, SkeletonText, Text } from "../../user-interfaces";
import { Content } from "../layout";

export type HCPProfileContentMobileProps = {
  profile: string;
};

export function HCPProfileContentMobile(props: HCPProfileContentMobileProps) {
  const { profile } = props;
  return (
    <Box color="charcoalGrey" fontSize="xs" lineHeight="taller">
      <Text fontSize="md" fontFamily="poppins" fontWeight="semibold">
        Profile
      </Text>
      <Content isMobile={true}>{profile}</Content>
    </Box>
  );
}

export function HCPProfileContentMobileSkeleton() {
  return (
    <Box>
      <Skeleton width={100} height={5} mb={2} />
      <SkeletonText noOfLines={5} />
    </Box>
  );
}
