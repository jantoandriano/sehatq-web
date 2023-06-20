import React from "react";

import {
  Flex,
  Box,
  Text,
  Grid,
  GridItem,
  Skeleton,
  Button,
} from "../../user-interfaces";

import { ProductCard } from "./product-card";

export interface RelatedProductsMobileProps {
  relatedProducts?: {
    name: string;
    imageUrl: string;
    slug: string;
    priceFrom: string;
    priceTo: string;
    rating: number | null;
    ratingTotal: number | null;
    discountMax: string | null;
    discount: string | null;
  }[];
  isLoading: boolean;
}

export function RelatedProductsMobile({
  relatedProducts,
  isLoading,
}: RelatedProductsMobileProps) {
  return (
    <Box>
      <Text mb={6} fontSize="md" fontFamily="poppins" fontWeight="semibold">
        Beli di Toko SehatQ
      </Text>

      {relatedProducts?.length ? (
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={3}
          overflowX="auto"
          width="100%"
        >
          {relatedProducts.map((relatedProduct) => (
            <GridItem key={relatedProduct.slug} minW="144px">
              <ProductCard isMobile {...relatedProduct} />
            </GridItem>
          ))}
        </Grid>
      ) : isLoading ? (
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={3}
          overflowX="auto"
          width="100%"
        >
          {Array.from(Array(4).keys()).map((id) => (
            <RelatedProductsSkeletonMobile key={id} />
          ))}
        </Grid>
      ) : (
        <RelatedProductsSkeletonMobile />
      )}
    </Box>
  );
}

export function RelatedProductsSkeletonMobile() {
  return (
    <Flex
      flexDirection="column"
      justify="space-between"
      background="white"
      borderRadius="base"
      boxShadow="base"
    >
      <Skeleton width="144px" height="144px" />
      <Box px={2.5}>
        <Skeleton width="122px" height="33px" />
        <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
          Mulai dari
        </Text>
        <Skeleton width="66px" height="19px" />
        <Skeleton mt={1} width="86px" height="14px" />
      </Box>
      <Button
        color="white"
        bgColor="main.500"
        fontSize="xs"
        variant="solid"
        fontWeight="semibold"
        mx={2.5}
        my={3}
        height="34px"
      >
        Beli
      </Button>
    </Flex>
  );
}
