import React from "react";

import { useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  ArrowForwardIcon,
} from "../../user-interfaces";

export type InternistClinicHealthServiceMobileProps = {
  contents: {
    id: number;
    title: string;
    image: unknown;
    slugs: string[];
  }[];
};

export function InternistClinicHealthServiceMobile(
  props: InternistClinicHealthServiceMobileProps
) {
  const { contents } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Box px={4}>
        <Text
          fontSize="sm"
          color="sea.500"
          fontWeight="medium"
          fontFamily="poppins"
          mb={3}
        >
          LAYANAN KESEHATAN
        </Text>
        <Text
          fontSize="3xl"
          fontFamily="poppins"
          fontWeight="bold"
          lineHeight={12}
          mb={5}
        >
          Temukan Layanan yang Kamu Butuhkan di Sini
        </Text>
      </Box>
      <HStack spacing={2.5} overflowX="auto" px={4}>
        {contents.map((content) => (
          <LinkBox key={content.id} position="relative">
            <Image
              priority
              src={content.image as string}
              alt={content.title}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                w: "157px",
                h: "185px",
                overflow: "hidden",
              }}
            />
            <Flex
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              p={2.5}
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Navigate
                name="HEALTH_SERVICE_DETAIL"
                query={{ slugs: content.slugs }}
              >
                <LinkOverlay
                  color="white"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  fontSize="xs"
                  mb={1}
                >
                  {content.title}
                </LinkOverlay>
              </Navigate>
              <Text
                fontSize="7px"
                fontFamily="poppins"
                color="white"
                fontWeight="semibold"
              >
                Lihat Detail
                <Icon as={ArrowForwardIcon} h={1.5} w={2} ml={1} />
              </Text>
            </Flex>
          </LinkBox>
        ))}
      </HStack>
      <Navigate name="HEALTH_SERVICES">
        <Link
          marginLeft={4}
          marginTop={5}
          fontSize="sm"
          fontFamily="poppins"
          color="sea.500"
          fontWeight="semibold"
        >
          Lihat Semua Layanan Kesehatan{" "}
          <Icon as={ArrowForwardIcon} h={3} w={3} ml={3.5} />
        </Link>
      </Navigate>
    </Box>
  );
}

export function InternistClinicHealthServiceSkeletonMobile() {
  return (
    <Box>
      <SkeletonText mb={5} />
      <HStack spacing={3}>
        <Skeleton w="157px" h="185px" borderRadius="lg" />
        <Skeleton w="157px" h="185px" borderRadius="lg" />
      </HStack>
    </Box>
  );
}
