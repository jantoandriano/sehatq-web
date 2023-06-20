import React, { MouseEventHandler } from "react";
import {
  Image,
  Flex,
  Box,
  Text,
  Badge,
  OfficialStoreIcon,
  Button,
  LocationIcon,
  Skeleton,
  GraySehatQIcon,
  SkeletonCircle,
} from "../../user-interfaces";

export interface MerchantProductCardMobileProps {
  city: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  distance: number;
  isSelected: boolean;
  discountDisplay: string;
  isOfficialStore: boolean;
  sellingPriceDisplay?: string;
  originalPriceDisplay?: string;
  onClick: MouseEventHandler;
  onShowShippingInfo?: MouseEventHandler;
}

export function MerchantProductCardMobile(
  props: MerchantProductCardMobileProps
) {
  const {
    city,
    name,
    onClick,
    imageUrl,
    imageAlt,
    distance,
    isSelected,
    discountDisplay,
    isOfficialStore,
    originalPriceDisplay,
    sellingPriceDisplay,
    onShowShippingInfo,
  } = props;

  return (
    <Box
      onClick={onClick}
      padding={4}
      boxShadow={isSelected ? "base" : "none"}
      border="1px"
      borderColor={isSelected ? "main.500" : "veryLightPink"}
      borderRadius="xl"
      background="white"
    >
      <Flex justify="space-between" align="flex-start" width="100%">
        <Image src={imageUrl} alt={imageAlt} boxSize="38px" objectFit="cover" />
        <Box flex="1" marginX="3">
          <Text
            fontSize="xs"
            fontFamily="poppins"
            fontWeight="semibold"
            noOfLines={3}
          >
            {name}
            {isOfficialStore ? (
              <OfficialStoreIcon boxSize="15px" marginLeft={1} />
            ) : null}
          </Text>
          <Text fontSize="xxs">{city}</Text>
          <Flex align="center">
            <LocationIcon boxSize="10px" />
            <Text marginLeft={1} color="brownGrey.500" fontSize="xxs">
              {distance} km
            </Text>
          </Flex>
        </Box>
        <Box>
          {originalPriceDisplay ? (
            <Text
              textDecoration="line-through"
              color="brownGrey.500"
              fontSize="xs"
              marginBotom={1}
            >
              {originalPriceDisplay}
              {discountDisplay ? (
                <Badge
                  marginLeft={1}
                  colorScheme="squash"
                  variant="subtle"
                  size="sm"
                >
                  {discountDisplay}
                </Badge>
              ) : null}
            </Text>
          ) : null}
          <Text
            textAlign="right"
            fontSize="xs"
            fontWeight="bold"
            color="sea.500"
          >
            {sellingPriceDisplay}
          </Text>
        </Box>
      </Flex>
      {onShowShippingInfo && (
        <Button
          size="xs"
          color="sea.500"
          justifyContent="left"
          fontWeight="normal"
          marginTop={2}
          isFullWidth
        >
          Informasi Pilihan Pengiriman
        </Button>
      )}
    </Box>
  );
}

export interface MerchantProductSkeletonMobileProps {
  hideShippingInfo?: boolean;
}

export function MerchantProductSkeletonMobile(
  props: MerchantProductSkeletonMobileProps
) {
  const { hideShippingInfo } = props;
  return (
    <Box
      padding={4}
      border="1px"
      borderRadius="xl"
      background="white"
      borderColor="veryLightPink"
    >
      <Flex justify="space-between">
        <Flex>
          <Box width="38px" height="38px" position="relative" marginRight={3}>
            <SkeletonCircle boxSize="38px" />
            <GraySehatQIcon
              boxSize="24px"
              position="absolute"
              transform="translate(-50%,-50%)"
              left="50%"
              top="50%"
            />
          </Box>
          <Box width="content-fit">
            <Skeleton width="100px" height="12px" />
            <Skeleton width="60px" height="10px" marginY={1.5} />
            <Skeleton width="50px" height="10px" />
          </Box>
        </Flex>
        <Flex direction="column" align="flex-end">
          <Flex marginBottom={2}>
            <Skeleton width="50px" height="10px" />
          </Flex>
          <Skeleton width="64px" height="12px" />
        </Flex>
      </Flex>
      {hideShippingInfo ? null : <Skeleton height="25px" marginTop={4} />}
    </Box>
  );
}
