import React from "react";
import { useAssets } from "@sehatq/utils";

import {
  Box,
  Flex,
  Text,
  Button,
  Spacer,
  StackDivider,
  Image as ImageComp,
  VStack,
  useImage,
  Container,
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

type OrderDetailDesktopProps = {
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

export function OrderDetailDesktop(props: OrderDetailDesktopProps) {
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

  const ASSETS = useAssets(["WAITING_PAYMENT"]);

  if (isLoading) {
    return <OrderDetailDesktopSkeleton />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Container maxW="2xl">
      <VStack>
        <Image
          src={ASSETS.WAITING_PAYMENT}
          alt="SehatQ"
          width={160}
          height={132}
        />
        <Text
          fontFamily="poppins"
          fontSize="2xl"
          fontWeight="bold"
          color="charcoalGrey"
        >
          Menunggu Pembayaran
        </Text>

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
        />
      </VStack>

      <Box
        maxW="2xl"
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
          <Section
            label="Order Id"
            description={coNumber}
            imageSrc=""
            customDesc=""
          />

          <Box>
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
              <Flex justifyContent="end" marginTop="3">
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
          </Box>

          <Section
            label="Total Tagihan"
            description={`${currency} ${grandTotal}`}
            customDesc="sea.500"
            imageSrc=""
          />
        </VStack>
      </Box>
    </Container>
  );
}

function Section(params: SectionProps) {
  const { label, description, customDesc, imageSrc } = params;
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box>
        <Text
          fontFamily="poppins"
          textTransform="capitalize"
          fontWeight="medium"
          color="brownGrey.100"
        >
          {label}
        </Text>
      </Box>
      <Spacer />
      {imageSrc && (
        <ImageComp
          src={imageSrc}
          width="70px"
          height="23px"
          alt="waiting_payment"
        />
      )}
      <Box>
        <Text
          fontFamily="poppins"
          textTransform="capitalize"
          fontWeight="bold"
          color={customDesc || "charcoalGrey"}
        >
          {description}
        </Text>
      </Box>
    </Flex>
  );
}

export function OrderDetailDesktopSkeleton() {
  return (
    <Container maxW="2xl">
      <VStack>
        <Skeleton width={160} height={132} />
        <Skeleton width="200px" height="16px" />
        <Skeleton width="200px" height="16px" />
        <Skeleton width="200px" height="16px" />
      </VStack>
      <Box
        maxW="2xl"
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
          <Flex minWidth="max-content" justifyContent="space-between">
            <Skeleton width="200px" height="16px" />
            <Skeleton width="200px" height="16px" />
          </Flex>

          <Box>
            <Flex minWidth="max-content" justifyContent="space-between">
              <Skeleton width="200px" height="16px" />
              <Skeleton width="200px" height="16px" />
            </Flex>

            <Flex minWidth="max-content" justifyContent="space-between" mt="3">
              <Skeleton width="200px" height="16px" />
              <Skeleton width="200px" height="16px" />
            </Flex>

            <Flex justifyContent="end" marginTop="3">
              <Skeleton width="70px" height="20px" />
            </Flex>
          </Box>

          <Flex minWidth="max-content" justifyContent="space-between">
            <Skeleton width="200px" height="16px" />
            <Skeleton width="200px" height="16px" />
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
}
