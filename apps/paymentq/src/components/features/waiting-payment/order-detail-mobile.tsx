import React from "react";
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
} from "@sehatq/components";
import { generatePriceDisplay } from "@sehatq/utils";
import { ASSETS } from "@sehatq/constants";
import { CountDownSection } from "./count-down";
import { DetailType } from "./waiting-payment-types";

type OrderDetailMobileProps = {
  data: DetailType;
  isEWallet?: boolean;
  isLoading: boolean | undefined;
  error: string | undefined;
  onCopy: () => void;
  serverTime: string;
};

type SectionProps = {
  label: string;
  description: string;
  customDesc: string;
  imageSrc: string;
};

export function OrderDetailMobile(props: OrderDetailMobileProps) {
  const { data, isEWallet, isLoading, onCopy, serverTime } = props;

  const Image = useImage();

  if (!data || isLoading) {
    return (
      <>
        <OrderDetailMobileSkeleton />
      </>
    );
  }

  return (
    <>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
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
          paymentType={data.paymentType || ""}
          transactionTime={data.paymentTimeout || ""}
          serverTime={serverTime || ""}
          isMobile
        />
      </Flex>

      <Box
        borderRadius="lg"
        marginTop="5"
        boxShadow="base"
        bgColor="white"
        padding="4"
      >
        <VStack
          divider={<StackDivider borderColor="veryLightPink" />}
          spacing="3"
          align="stretch"
        >
          <Section
            label="Order Id"
            description={data.coNumber || ""}
            imageSrc=""
            customDesc=""
          />

          <VStack spacing="2">
            <Section
              label="Metode Pembayaran"
              description={data.name || ""}
              imageSrc={data.iconUrl || ""}
              customDesc=""
            />

            {!isEWallet && (
              <Section
                label="Nomor Virtual Account"
                description={data.vaNumbers}
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
                  onClick={onCopy}
                >
                  Salin
                </Button>
              </Flex>
            )}
          </VStack>

          <Section
            label="Total Tagihan"
            description={`${generatePriceDisplay(Number(data.grandTotal))}`}
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
          <ImageComp src={imageSrc} width="70px" alt="waiting_payment" />
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
