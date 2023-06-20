import React from "react";

import {
  HStack,
  Box,
  Text,
  Grid,
  GridItem,
  Skeleton,
} from "../../user-interfaces";

import { ProductCard } from "./product-card";

export interface RelatedProductsDesktopProps {
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

export function RelatedProductsDesktop({
  relatedProducts,
  isLoading,
}: RelatedProductsDesktopProps) {
  return (
    <Box>
      <Text mb={5} fontSize="xl" fontFamily="poppins" fontWeight="semibold">
        Beli di Toko SehatQ
      </Text>
      {relatedProducts?.length ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {relatedProducts.map((relatedProduct) => (
            <GridItem key={relatedProduct.slug}>
              <ProductCard isMobile={false} {...relatedProduct} />
            </GridItem>
          ))}
        </Grid>
      ) : isLoading ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {Array.from(Array(4).keys()).map((id) => (
            <RelatedProductsSkeletonDesktop key={id} />
          ))}
        </Grid>
      ) : (
        <RelatedProductsSkeletonDesktop />
      )}
    </Box>
  );
}

export function RelatedProductsSkeletonDesktop() {
  return (
    <Box background="white" borderRadius="base" boxShadow="base">
      <Skeleton width="178px" height="178px" />
      <Box px={2.5} pb={2.5}>
        <Skeleton mb={1} width="159px" height="40px" />
        <HStack spacing={1}>
          <Skeleton width="52px" height="16px" />
          <Skeleton width="23px" height="16px" />
        </HStack>
        <Skeleton width="85px" height="22px" />
        <Skeleton width="44px" height="17px" />
        <Skeleton width="158px" height="19px" />
      </Box>
    </Box>
  );
}
