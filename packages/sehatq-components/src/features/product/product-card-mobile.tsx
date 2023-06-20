import React from "react";
import { useNavigation } from "@sehatq/utils";

import {
  Image,
  Box,
  Text,
  StarRating,
  Link,
  VStack,
} from "../../user-interfaces";

export interface ProductCardMobileProps {
  name: string;
  imageUrl: string;
  slug: string;
  priceFrom: string | null;
  rating: number | null;
  ratingTotal: number | null;
  discountMax: string | null;
  discount: string | null;
}

export function ProductCardMobile(props: ProductCardMobileProps) {
  const { Navigate } = useNavigation();
  const {
    name,
    imageUrl,
    slug,
    priceFrom,
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
      justify="space-around"
      position="relative"
    >
      <Navigate name="EXTERNAL_PRODUCT" query={{ slug }}>
        <Link>
          <Image
            src={imageUrl}
            alt="product-image"
            height="144px"
            width="144px"
          />
        </Link>
      </Navigate>
      {!!discountMax && (
        <Box
          position="absolute"
          width="34px"
          height="46px"
          top={0}
          right={2.5}
          overflowX="hidden"
        >
          <Box width="100%" height="36px" bgColor="squash.500">
            <Text textAlign="center" pt={1} display="block">
              <Text
                color="white"
                fontSize="8px"
                fontStyle="poppins"
                fontWeight="semibold"
                display="block"
              >
                Up to
              </Text>
              <Text
                color="white"
                fontSize="sm"
                fontStyle="poppins"
                fontWeight="semibold"
                display="block"
              >
                {discountMax}
              </Text>
            </Text>
          </Box>
          <BadgeSkews />
        </Box>
      )}
      {!!discount && (
        <Box
          position="absolute"
          width="34px"
          height="46px"
          top={0}
          right={2.5}
          overflowX="hidden"
        >
          <Box width="100%" height="36px" bgColor="squash.500">
            <Text
              position="absolute"
              top="8px"
              left={0}
              right={0}
              textAlign="center"
              fontWeight="bold"
              fontSize="sm"
              color="white"
              display="block"
            >
              {discount}
            </Text>
          </Box>
          <BadgeSkews />
        </Box>
      )}
      <Box px={2.5} pb={2.5}>
        <Navigate name="EXTERNAL_PRODUCT" query={{ slug }}>
          <Link
            mb={1}
            fontSize="xs"
            fontFamily="poppins"
            lineHeight="1.33"
            variant="unstyled"
          >
            {name}
          </Link>
        </Navigate>
        <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
          Mulai dari
        </Text>
        <Text color="sea.500" fontSize="sm" fontWeight="bold">
          {priceFrom}
        </Text>
        {rating && ratingTotal ? (
          <Box mt={1}>
            <StarRating
              rating={rating}
              ratingTotal={ratingTotal}
              iconWidth={2.5}
              iconHeight={2.5}
              fontSize="xxs"
            />
          </Box>
        ) : null}
      </Box>
      <Box px={3} pb={3} width="100%">
        <Navigate name="EXTERNAL_PRODUCT" query={{ slug }}>
          <Link
            color="white"
            bgColor="main.500"
            fontSize="xs"
            variant="solid"
            fontWeight="semibold"
            height="34px"
            width="100%"
          >
            Beli
          </Link>
        </Navigate>
      </Box>
    </VStack>
  );
}

export function BadgeSkews() {
  return (
    <Box
      height="10px"
      mt="-1px"
      position="relative"
      sx={{
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          backgroundColor: "squash.500",
          height: "10px",
          width: "17px",
          right: "-7px",
          transform: "skewX(58deg)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          backgroundColor: "squash.500",
          height: "10px",
          width: "17px",
          left: "-7px",
          transform: "skewX(-58deg)",
        },
      }}
    />
  );
}
