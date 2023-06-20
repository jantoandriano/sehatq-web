import React from "react";

import { useAssets, useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  Icon,
  ArrowForwardIcon,
  Link,
} from "../../user-interfaces";

export type ClinicForumDesktopProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function ClinicForumDesktop(props: ClinicForumDesktopProps) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const { title, description, link } = props;

  const ASSETS = useAssets(["ILLUSTRATION_FORUM"]);

  return (
    <Box position="relative" w="full">
      <Image
        priority
        src={ASSETS.ILLUSTRATION_FORUM}
        alt={title}
        height={242}
        width={1160}
        layout="responsive"
      />
      <Box
        position="absolute"
        top={0}
        h="full"
        display="flex"
        px={14}
        justifyContent="center"
        flexDirection="column"
      >
        <Box>
          <Text
            fontSize="7xl"
            fontWeight="bold"
            color="white"
            fontFamily="poppins"
            mb={2}
          >
            {title}
          </Text>
          <Text color="white" w="570px" mb={5}>
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
            >
              {link.label} <Icon as={ArrowForwardIcon} w={5} h={5} ml={3.5} />
            </Link>
          </Navigate>
        </Box>
      </Box>
    </Box>
  );
}

export function ClinicForumSkeletonDesktop() {
  return (
    <Box position="relative" h="242px">
      <Skeleton backgroundColor="gray.500" h="242px" borderRadius="12px" />
      <Box px="52px" position="absolute" top="32px" left={0} right={0}>
        <Skeleton width="200px" height={8} mb={5} />
        <SkeletonText w="570px" mb={5} />
        <Skeleton width="207px" height={10} borderRadius="2xl" />
      </Box>
    </Box>
  );
}
