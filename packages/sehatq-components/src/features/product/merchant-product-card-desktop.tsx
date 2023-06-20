import React, { MouseEventHandler } from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Image,
  Flex,
  Box,
  Text,
  Badge,
  Link,
  OfficialStoreIcon,
  Button,
  LocationIcon,
  Skeleton,
  GraySehatQIcon,
  SkeletonCircle,
  VStack,
} from "../../user-interfaces";

export interface MerchantProductCardDesktopProps {
  city: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  distance: number;
  isSelected: boolean;
  discountDisplay: string;
  isOfficialStore: boolean;
  onClick: MouseEventHandler;
  sellingPriceDisplay?: string;
  originalPriceDisplay?: string;
  merchantNavigation?: NavigationValue;
  onShowShippingInfo?: MouseEventHandler;
}

export function MerchantProductCardDesktop(
  props: MerchantProductCardDesktopProps
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
    merchantNavigation,
    originalPriceDisplay,
    sellingPriceDisplay,
    onShowShippingInfo,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <Flex
      onClick={onClick}
      padding={4}
      boxShadow="base"
      border="1px"
      borderColor={isSelected ? "main.500" : "white"}
      borderRadius="xl"
      background="white"
      height="100%"
      direction="column"
      justify="space-between"
      cursor="pointer"
    >
      <Flex justify="space-between" align="center" width="100%">
        <Image
          src={imageUrl}
          alt={imageAlt}
          boxSize="50.5px"
          objectFit="cover"
        />
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
                <Badge marginLeft={1} colorScheme="squash" variant="subtle">
                  {discountDisplay}
                </Badge>
              ) : null}
            </Text>
          ) : null}
          <Text
            textAlign="right"
            fontSize="md"
            fontWeight="bold"
            color="sea.500"
          >
            {sellingPriceDisplay}
          </Text>
        </Box>
      </Flex>
      <Flex justify="space-between" align="center" width="100%" marginTop={1}>
        <Box maxWidth={merchantNavigation ? "calc(100% - 100px)" : "100%"}>
          <Text
            fontSize="sm"
            fontFamily="poppins"
            fontWeight="semibold"
            noOfLines={3}
            marginBottom={0.5}
          >
            {name}
            {isOfficialStore ? (
              <OfficialStoreIcon boxSize="18px" marginLeft={1} />
            ) : null}
          </Text>
          <Text fontSize="xs">{city}</Text>
        </Box>
        {merchantNavigation ? (
          <Navigate
            name={merchantNavigation.name}
            query={merchantNavigation.query}
          >
            <Link fontSize="xs" color="sea.500">
              Kunjungi Toko
            </Link>
          </Navigate>
        ) : null}
      </Flex>
      <Flex align="center">
        <LocationIcon boxSize="12px" />
        <Text marginLeft={1} color="brownGrey.500" fontSize="xs">
          {distance} km
        </Text>
      </Flex>
      {onShowShippingInfo && (
        <Button
          size="xs"
          color="sea.500"
          justifyContent="left"
          fontWeight="normal"
          isFullWidth
          marginTop={2}
        >
          Informasi Pilihan Pengiriman
        </Button>
      )}
    </Flex>
  );
}

export interface MerchantProductSkeletonDesktopProps {
  hideShippingInfo?: boolean;
}

export function MerchantProductSkeletonDesktop(
  props: MerchantProductSkeletonDesktopProps
) {
  const { hideShippingInfo } = props;
  return (
    <VStack
      spacing={3}
      padding={4}
      boxShadow="base"
      borderRadius="xl"
      background="white"
    >
      <Flex justify="space-between" width="100%">
        <Box width="50px" height="50px" position="relative">
          <SkeletonCircle boxSize="50px" />
          <GraySehatQIcon
            boxSize="24px"
            position="absolute"
            transform="translate(-50%,-50%)"
            left="50%"
            top="50%"
          />
        </Box>
        <Flex direction="column" align="flex-end">
          <Flex marginBottom={2}>
            <Skeleton width="70px" height="10px" marginRight={2} />
            <Skeleton width="32px" height="10px" />
          </Flex>
          <Skeleton width="100px" height="14px" />
        </Flex>
      </Flex>
      <Box width="100%">
        <Skeleton width="140px" height="14px" />
        <Skeleton width="100px" height="10px" marginY={2} />
        <Skeleton width="60px" height="10px" />
      </Box>
      {hideShippingInfo ? null : <Skeleton height="25px" width="100%" />}
    </VStack>
  );
}
