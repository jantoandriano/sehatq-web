import React from "react";
import { useNavigation } from "@sehatq/utils";

import {
  Image,
  Box,
  Text,
  StarRating,
  Badge,
  HStack,
  VStack,
  Link,
} from "../../user-interfaces";

export interface ProductCardDesktopProps {
  name: string;
  imageUrl: string;
  slug: string;
  priceFrom: string;
  priceTo: string;
  rating: number | null;
  ratingTotal: number | null;
  discountMax: string | null;
  discount: string | null;
}

export function ProductCardDesktop(props: ProductCardDesktopProps) {
  const { Navigate } = useNavigation();
  const {
    name,
    imageUrl,
    slug,
    priceFrom,
    priceTo,
    rating,
    ratingTotal,
    discountMax,
    discount,
  } = props;
  return (
    <VStack
      spacing={0}
      height="100%"
      align="flex-start"
      background="white"
      borderRadius="base"
      boxShadow="base"
    >
      <Navigate name="EXTERNAL_PRODUCT" query={{ slug }}>
        <Link>
          <Image
            src={imageUrl}
            alt="product-image"
            height="178px"
            width="178px"
          />
        </Link>
      </Navigate>
      <Box px={2.5} pb={2.5}>
        <Navigate name="EXTERNAL_PRODUCT" query={{ slug }}>
          <Link mb={1} fontSize="sm" fontFamily="poppins" variant="unstyled">
            {name}
          </Link>
        </Navigate>
        {discountMax && (
          <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
            Mulai dari
          </Text>
        )}
        {discount && (
          <HStack spacing={1}>
            <Text
              fontSize="xxs"
              lineHeight="3"
              color="brownGrey.500"
              textDecoration="line-through"
            >
              {priceFrom}&nbsp;
            </Text>
            <Badge
              color="squash.500"
              bgColor="squash.100"
              variant="solid"
              fontSize="xxs"
            >
              {discount}
            </Badge>
          </HStack>
        )}
        <Text color="sea.500" fontSize="md" fontWeight="bold">
          {discountMax ? priceFrom : priceTo}
        </Text>
        {rating && ratingTotal ? (
          <StarRating
            rating={rating}
            ratingTotal={ratingTotal}
            iconWidth={3}
            iconHeight={3}
            useSingleStar
          />
        ) : null}
        <Text
          fontSize="xxs"
          color="sea.500"
          fontWeight="semibold"
          lineHeight="4"
          bgColor="iceBlue.500"
          borderRadius="base"
          textAlign="center"
          mt={2.5}
        >
          {discountMax && `Potensi Hemat ${discountMax}`}
        </Text>
      </Box>
    </VStack>
  );
}
