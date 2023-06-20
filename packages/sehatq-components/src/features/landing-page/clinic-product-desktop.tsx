import React from "react";

import {
  useNavigation,
  useAssets,
  priceFormat,
  NavigationValue,
} from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
  Link,
  Icon,
  ArrowForwardIcon,
  LinkOverlay,
  LinkBox,
} from "../../user-interfaces";
import { ClinicCarousel } from "./clinic-carousel";

type ClinicProductDesktopProps = {
  title: string;
  productsNavigation: NavigationValue;
  products: {
    id: number;
    thumbUrl: string;
    name: string;
    priceFrom: number;
    slug: string;
  }[];
};

export function ClinicProductDesktop(props: ClinicProductDesktopProps) {
  const { title, products, productsNavigation } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ICON_FREE_SHIPPING", "NO_IMAGE"]);

  return (
    <Box position="relative">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" mb={3.5}>
          <Text fontSize="3xl" fontWeight="bold" mr={3.5} fontFamily="poppins">
            {title}
          </Text>
          <Image
            src={ASSETS.ICON_FREE_SHIPPING}
            alt="icon gratis ongkir"
            layout="fixed"
            height={24}
            width={127}
          />
        </Flex>
        <Navigate {...productsNavigation}>
          <Link
            fontSize="sm"
            fontFamily="poppins"
            color="#279091"
            fontWeight="semibold"
          >
            Lihat Semua
            <Icon as={ArrowForwardIcon} h="12px" w="12px" ml={3.5} />
          </Link>
        </Navigate>
      </Flex>

      <ClinicCarousel
        slides={products}
        slideGap={5}
        slidesToShow={6}
        renderSlide={({ slide }) => (
          <LinkBox
            key={slide.id}
            w="160px"
            h="315px"
            bgColor="white"
            boxShadow="base"
            borderRadius="xl"
            px={3}
            py={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            mt={1}
            mb={3}
          >
            <Box>
              <Flex justifyContent="center" mb="12px">
                <Image
                  src={slide.thumbUrl || ASSETS.NO_IMAGE}
                  alt={slide.name}
                  layout="fill"
                  objectFit="contain"
                  wrapperProps={{
                    width: "141px",
                    height: "141px",
                    overflow: "hidden",
                  }}
                />
              </Flex>
              <Text
                fontSize="md"
                fontFamily="poppins"
                fontWeight="semibold"
                mb={2}
                lineHeight={5}
                noOfLines={2}
              >
                {slide.name}
              </Text>
              <Text fontSize="xxs" color="#94A4B0">
                Mulai dari
              </Text>
              <Text color="#269090" fontWeight="bold">
                {slide.priceFrom ? priceFormat(slide.priceFrom) : ""}
              </Text>
            </Box>
            <Navigate
              name="EXTERNAL_PRODUCT"
              query={{
                slug: slide.slug,
              }}
            >
              <LinkOverlay
                h="32px"
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="xs"
                bgColor="main.500"
                borderRadius="base"
                color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                Lihat Detail
              </LinkOverlay>
            </Navigate>
          </LinkBox>
        )}
      />
    </Box>
  );
}

export function ClinicProductSkeletonDesktop() {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="flex-end" mb={7}>
        <SkeletonText w="570px" />
        <Skeleton w={40} h={5} />
      </Flex>
      <HStack spacing={5}>
        {Array.from(Array(6).keys()).map((id) => (
          <Box key={id}>
            <Skeleton w={44} h={142} borderRadius="2xl" mb={4} />
            <SkeletonText />
          </Box>
        ))}
      </HStack>
    </>
  );
}
