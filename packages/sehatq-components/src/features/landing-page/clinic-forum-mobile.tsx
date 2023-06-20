import React from "react";

import { useAssets, useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Box,
  Text,
  Skeleton,
  SkeletonText,
  Icon,
  ArrowForwardIcon,
  Link,
} from "../../user-interfaces";

export type ClinicForumMobileProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function ClinicForumMobile(props: ClinicForumMobileProps) {
  const { Navigate } = useNavigation();
  const { title, description, link } = props;
  const ASSETS = useAssets(["ILLUSTRATION_FORUM_MOBILE"]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundImage={ASSETS.ILLUSTRATION_FORUM_MOBILE}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="4xl"
      paddingX={4}
      paddingY={7}
    >
      <Text
        fontSize="24px"
        fontWeight="bold"
        color="white"
        fontFamily="poppins"
        mb="22px"
      >
        {title}
      </Text>
      <Text fontSize="sm" color="white" mb={5}>
        {description}
      </Text>
      <Navigate {...link.value}>
        <Link
          variant="solid"
          borderRadius="full"
          bgColor="main.500"
          fontSize="sm"
          fontFamily="poppins"
          fontWeight="semibold"
          maxW="fit-content"
        >
          {link.label}{" "}
          <Icon as={ArrowForwardIcon} w="20px" h="20px" ml="14px" />
        </Link>
      </Navigate>
    </Box>
  );
}

export function ClinicForumSkeletonMobile() {
  return (
    <>
      <Box position="relative" h="242px">
        <Skeleton backgroundColor="gray.500" h="242px" borderRadius="12px" />
        <Box px="16px" position="absolute" top="28px" left={0} right={0}>
          <Skeleton width="200px" height="30px" mb="30px" />
          <SkeletonText w="full" mb="25px" />
          <Skeleton width="207px" height="42px" borderRadius="12px" />
        </Box>
      </Box>
    </>
  );
}
