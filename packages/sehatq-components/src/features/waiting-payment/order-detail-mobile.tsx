import React from "react";
import { useAssets } from "@sehatq/utils";

import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  StackDivider,
  Image as ImageComp,
  useImage,
  HStack,
  Skeleton,
} from "../../user-interfaces";
import { CountDownSection } from "./count-down";

type OrderDetailType = {
  coNumber: string;
  paymentTimeout: string;
  paymentType: string;
  grandTotal: string;
  vaNumbers: string;
  currency: string;
};

type OrderDetailMobileProps = {
  data: OrderDetailType;
  isLoading: boolean;
  error: string;
  isEWallet?: boolean;
};

type SectionProps = {
  label: string;
  description: string;
  customDesc: string;
  imageSrc: string;
};

export function OrderDetailMobile(props: OrderDetailMobileProps) {
  const { data, isLoading, error, isEWallet } = props;

  const {
    coNumber,
    paymentTimeout,
    paymentType,
    grandTotal,
    currency,
    vaNumbers,
  } = data;

  const Image = useImage();

  const ASSETS = useAssets([
    "WAITING_PAYMENT",
    "BANK_BCA_ICON",
    "BANK_BNI_ICON",
    "BANK_MANDIRI_ICON",
    "BANK_PERMATA_ICON",
  ]);

  if (isLoading) {
    return <OrderDetailMobileSkeleton />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <>
      <VStack>
        <Image
          src={ASSETS.WAITING_PAYMENT}
          alt="SehatQ"
          width={130}
          height={102}
        />

        <Text
          fontFamily="poppins"
          fontSize="md"
          fontWeight="semibold"
          color="brownGrey.100"
        >
          Batas Waktu Pembayaran
        </Text>

        <CountDownSection
          paymentType={paymentType}
          expiredTime={paymentTimeout}
          isMobile
        />
      </VStack>

      <Box
        maxW="md"
        paddingX="4"
        paddingY="2"
        borderRadius="lg"
        marginTop="5"
        boxShadow="base"
        bgColor="white"
      >
        <VStack
          divider={<StackDivider borderColor="gray.800" />}
          spacing="3"
          align="stretch"
        >
          <Section
            label="Order Id"
            description={coNumber}
            imageSrc=""
            customDesc=""
          />

          <VStack spacing="2">
            <Section
              label="Metode Pembayaran"
              description={paymentType}
              imageSrc=""
              customDesc=""
            />

            {!isEWallet && (
              <Section
                label="Nomor Virtual Account"
                description={vaNumbers}
                imageSrc=""
                customDesc=""
              />
            )}

            {!isEWallet && (
              <Flex justifyContent="center" marginTop="3">
                <Button
                  size="xs"
                  variant="outline"
                  width="70px"
                  fontSize="xs"
                  height="20px"
                  fontWeight="bold"
                >
                  Salin
                </Button>
              </Flex>
            )}
          </VStack>

          <Section
            label="Total Tagihan"
            description={`${currency} ${grandTotal}`}
            customDesc="sea.500"
            imageSrc=""
          />
        </VStack>
      </Box>
    </>
  );
}

function Section(params: SectionProps) {
  const { label, description, customDesc, imageSrc } = params;
  return (
    <Flex minWidth="max-content" flexDir="column" alignItems="center" gap="1">
      <Box>
        <Text
          fontFamily="poppins"
          textTransform="capitalize"
          fontWeight="medium"
          color="brownGrey.100"
          fontSize="sm"
        >
          {label}
        </Text>
      </Box>

      <HStack>
        {imageSrc && (
          <ImageComp
            src={imageSrc}
            width="70px"
            height="23px"
            alt="waiting_payment"
          />
        )}
        <Text
          fontFamily="poppins"
          textTransform="capitalize"
          fontWeight="bold"
          color={customDesc || "charcoalGrey"}
          fontSize="sm"
        >
          {description}
        </Text>
      </HStack>
    </Flex>
  );
}

export function OrderDetailMobileSkeleton() {
  return (
    <>
      <VStack gap="3">
        <Skeleton width={130} height={102} />
        <Skeleton width="200px" height="16px" />
        <Skeleton width="150px" height="16px" />
      </VStack>
      <Box
        maxW="md"
        paddingX="4"
        paddingY="2"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.800"
        marginTop="5"
      >
        <VStack
          divider={<StackDivider borderColor="gray.800" />}
          spacing="3"
          align="stretch"
        >
          <Flex
            flexBasis="1"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            gap="2"
          >
            <Skeleton width="200px" height="16px" />
            <Skeleton width="150px" height="16px" />
          </Flex>

          <Box>
            <Flex
              flexBasis="1"
              flexDir="column"
              alignItems="center"
              justifyContent="space-between"
              gap="2"
            >
              <Skeleton width="200px" height="16px" />
              <Skeleton width="150px" height="16px" />
            </Flex>

            <Flex
              flexBasis="1"
              flexDir="column"
              alignItems="center"
              justifyContent="space-between"
              gap="2"
              mt="3"
            >
              <Skeleton width="200px" height="16px" />
              <Skeleton width="150px" height="16px" />
            </Flex>

            <Flex justifyContent="center" marginTop="3">
              <Skeleton width="70px" height="20px" />
            </Flex>
          </Box>

          <Flex
            flexBasis="1"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            gap="2"
          >
            <Skeleton width="200px" height="16px" />
            <Skeleton width="150px" height="16px" />
          </Flex>
        </VStack>
      </Box>
    </>
  );
}
