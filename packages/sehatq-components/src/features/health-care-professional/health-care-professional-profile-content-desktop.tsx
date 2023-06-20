import React from "react";
import { Box, Skeleton, SkeletonText, Text } from "../../user-interfaces";
import { Content } from "../layout";

export type HCPProfileContentDesktopProps = {
  profile: string;
};

export function HCPProfileContentDesktop(props: HCPProfileContentDesktopProps) {
  const { profile } = props;
  return (
    <Box fontSize="sm" color="charcoalGrey" lineHeight="base">
      <Text fontSize="3xl" fontFamily="poppins" fontWeight="semibold">
        Profile
      </Text>
      <Content isMobile={false}>{profile}</Content>
    </Box>
  );
}

export function HCPProfileContentDesktopSkeleton() {
  return (
    <Box>
      <Skeleton width={100} height={5} mb={2} />
      <SkeletonText noOfLines={5} />
    </Box>
  );
}
