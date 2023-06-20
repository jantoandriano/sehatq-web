import React from "react";

import { useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  Link,
  Icon,
  ArrowForwardIcon,
  HStack,
  LinkOverlay,
  SimpleGrid,
  LinkBox,
} from "../../user-interfaces";

export type InternistClinicHealthServiceDesktopProps = {
  contents: {
    id: number;
    title: string;
    image: unknown;
    slugs: string[];
  }[];
};

export function InternistClinicHealthServiceDesktop(
  props: InternistClinicHealthServiceDesktopProps
) {
  const { contents } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Text
        fontSize="xl"
        color="sea.500"
        fontFamily="poppins"
        fontWeight="medium"
        mb={3}
      >
        LAYANAN KESEHATAN
      </Text>
      <Flex justifyContent="space-between" alignItems="flex-end" mb={6}>
        <Text
          fontSize="7xl"
          fontWeight="bold"
          color="charcoalGrey"
          lineHeight="48px"
          fontFamily="poppins"
          w="426px"
        >
          Temukan Layanan yang Kamu Butuhkan di Sini
        </Text>
        <Navigate name="HEALTH_SERVICES">
          <Link
            fontSize="sm"
            fontFamily="poppins"
            color="#279091"
            fontWeight="semibold"
          >
            Lihat Semua Layanan Kesehatan{" "}
            <Icon as={ArrowForwardIcon} h={3} w={3} ml={3.5} />
          </Link>
        </Navigate>
      </Flex>

      <SimpleGrid columns={4} spacing={5}>
        {contents.map((content) => (
          <LinkBox key={content.id} position="relative">
            <Image
              priority
              src={content.image as string}
              alt={content.title}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                width: "100%",
                paddingTop: "118%",
                overflow: "hidden",
              }}
            />
            <Flex
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              px={4}
              py={5}
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
                  fontSize="xl"
                  mb={2}
                >
                  {content.title}
                </LinkOverlay>
              </Navigate>
              <Text
                fontSize="sm"
                fontFamily="poppins"
                color="white"
                fontWeight="semibold"
              >
                Lihat Detail
                <Icon as={ArrowForwardIcon} h={3} w={3} ml={1.5} />
              </Text>
            </Flex>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export function InternistClinicHealthServiceSkeletonDesktop() {
  return (
    <Box>
      <SkeletonText w="426px" mb={3} />
      <Flex justifyContent="space-between" mb={6}>
        <SkeletonText w="426px" />
        <Skeleton w={56} h={7} />
      </Flex>
      <HStack spacing={5}>
        {Array.from(Array(4).keys()).map((id) => (
          <Skeleton key={id} w="275px" h="324px" borderRadius="lg" />
        ))}
      </HStack>
    </Box>
  );
}
