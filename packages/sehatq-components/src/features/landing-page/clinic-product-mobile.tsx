import React from "react";

import { useNavigation, useAssets, priceFormat } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  LinkOverlay,
  LinkBox,
  Flex,
  HStack,
} from "../../user-interfaces";

type ClinicProductMobileProps = {
  title: string;
  products: {
    id: number;
    thumbUrl: string;
    name: string;
    priceFrom: number;
    slug: string;
  }[];
};

export function ClinicProductMobile(props: ClinicProductMobileProps) {
  const { title, products } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ICON_FREE_SHIPPING", "NO_IMAGE"]);

  return (
    <Box position="relative">
      <Box px={4}>
        <Text fontWeight="bold" fontFamily="poppins" mb={1.5}>
          {title}
        </Text>
        <Image
          priority
          src={ASSETS.ICON_FREE_SHIPPING}
          alt="icon gratis ongkir"
          layout="fixed"
          height={24}
          width={127}
          wrapperProps={{
            mb: "12px",
          }}
        />
      </Box>

      <HStack
        spacing={3}
        overflowX="auto"
        px={4}
        py={2}
        alignItems="self-start"
      >
        {products.map((product) => (
          <LinkBox
            key={product.id}
            maxW="150px"
            w="150px"
            h={80}
            bgColor="white"
            boxShadow="base"
            borderRadius="xl"
            px={3}
            py={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Flex justifyContent="center" mb={3} w="full">
                <Image
                  src={product.thumbUrl || ASSETS.NO_IMAGE}
                  alt={product.name}
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
                fontSize="sm"
                fontFamily="poppins"
                fontWeight="semibold"
                mb={2}
                lineHeight="6"
                noOfLines={2}
              >
                {product.name}
              </Text>
              <Text fontSize="xxs" color="#94A4B0">
                Mulai dari
              </Text>
              <Text color="#269090" fontWeight="bold" mb={1}>
                {product.priceFrom ? priceFormat(product.priceFrom) : ""}
              </Text>
            </Box>
            <Navigate
              name="EXTERNAL_PRODUCT"
              query={{
                slug: product.slug,
              }}
            >
              <LinkOverlay
                h="32px"
                w="129px"
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
        ))}
      </HStack>
    </Box>
  );
}

export function ClinicProductSkeletonMobile() {
  return (
    <>
      <HStack spacing={3}>
        <Box w={40}>
          <Skeleton w={40} h={36} borderRadius="2xl" mb={4} />
          <SkeletonText />
        </Box>
        <Box w={40}>
          <Skeleton w={40} h={36} borderRadius="2xl" mb={4} />
          <SkeletonText />
        </Box>
      </HStack>
    </>
  );
}
