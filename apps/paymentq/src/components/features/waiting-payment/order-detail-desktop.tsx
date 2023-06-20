import React from "react";

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
} from "@sehatq/components";
import { generatePriceDisplay } from "@sehatq/utils";
import { ASSETS } from "@sehatq/constants";
import { CountDownSection } from "./count-down";
import { DetailType } from "./waiting-payment-types";

type OrderDetailDesktopProps = {
  data: DetailType;
  isLoading: boolean | undefined;
  error: string | undefined;
  isEWallet?: boolean;
  isMobile?: boolean;
  onCopy: () => void;
  serverTime: string;
};

type SectionProps = {
  label: string;
  description: string;
  customDesc: string;
  imageSrc: string;
};

export function OrderDetailDesktop(props: OrderDetailDesktopProps) {
  const { data, isLoading, isEWallet, onCopy, serverTime } = props;

  const Image = useImage();

  if (!data || isLoading) {
    return (
      <>
        <OrderDetailDesktopSkeleton />
      </>
    );
  }

  return (
    <Container maxW="3xl">
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
          paymentType={data.paymentType || ""}
          transactionTime={data.paymentTimeout || ""}
          serverTime={serverTime || ""}
        />
      </VStack>

      <Box
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
            description={data.coNumber || ""}
            imageSrc=""
            customDesc=""
          />

          <Box>
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
              <Flex justifyContent="end" marginTop="3">
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
          </Box>

          <Section
            label="Total Tagihan"
            description={`${generatePriceDisplay(Number(data.grandTotal))}`}
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
          fontWeight="thin"
          color="brownGrey.100"
        >
          {label}
        </Text>
      </Box>
      <Spacer />
      {imageSrc && <ImageComp src={imageSrc} width="70px" alt="icon_payment" />}
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
