import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  SehatQPdfIcon,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  ChevronRightIcon,
  Button,
  Skeleton,
  IconButton,
  ArrowBackIcon,
  StackDivider,
} from "../../user-interfaces";
import { PrescriptionProductsResponse } from "./prescription-products-model";
import { PrescriptionStatusCode } from "./prescription-constant";

export type PrescriptionRecommendationPopupMobileProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: PrescriptionStatusCode;
  source: string;
  prescriptionProducts: PrescriptionProductsResponse["data"];
  productsReplacement: PrescriptionProductsResponse["data"];
};

export function PrescriptionRecommendationPopupMobile(
  props: PrescriptionRecommendationPopupMobileProps
) {
  const {
    onOpen,
    isOpen,
    onClose,
    status,
    prescriptionProducts,
    productsReplacement,
  } = props;
  return (
    <>
      <Button
        variant="fit"
        border="solid 0.5px"
        borderColor="veryLightPink"
        borderRadius="base"
        background="white"
        isFullWidth
        height="40px"
        fontSize="xs"
        lineHeight="5"
        color="charcoalGrey"
        fontWeight="semibold"
        justifyContent="space-between"
        py={0}
        pl={0}
        pr={2}
        onClick={onOpen}
        rightIcon={<ChevronRightIcon boxSize={6} color="charcoalGrey" />}
      >
        <Flex align="center">
          <Box
            borderLeftRadius="base"
            background="iceBlue.500"
            alignItems="center"
            p={2}
            mr={3}
          >
            <SehatQPdfIcon width={6} height={5} />
          </Box>
          Rekomendasi Resep
        </Flex>
      </Button>
      <Drawer isOpen={isOpen} size="full" onClose={onClose} trapFocus={false}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
              lineHeight={5}
              boxShadow="base"
              px="18px"
              py={3.5}
            >
              <IconButton
                aria-label="back button"
                onClick={onClose}
                variant="fit"
                colorScheme="sea"
                mr={2}
                icon={<ArrowBackIcon w={6} h={6} color="sea.600" />}
              />
              Rekomendasi Resep
            </DrawerHeader>
            <DrawerBody px={4} py={5}>
              {prescriptionProducts.length > 0 ? (
                <PrescriptionRecommendationItem
                  prescriptionProducts={prescriptionProducts}
                  label="Daftar Obat"
                  status={status}
                />
              ) : (
                <Text
                  fontSize="sm"
                  color="charcoalGrey"
                  fontWeight="semibold"
                  fontStyle="italic"
                  lineHeight="4"
                >
                  Daftar obat tidak ditemukan.
                </Text>
              )}
              {productsReplacement.length > 0 && (
                <Box mt={4}>
                  <PrescriptionRecommendationItem
                    prescriptionProducts={productsReplacement}
                    label="Obat Pengganti"
                    status={status}
                    isReplacement={true}
                  />
                </Box>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

type PrescriptionRecommendationItemProps = {
  prescriptionProducts: PrescriptionProductsResponse["data"];
  label: string;
  isReplacement?: boolean;
  status?: PrescriptionStatusCode;
};

function PrescriptionRecommendationItem(
  props: PrescriptionRecommendationItemProps
) {
  const { prescriptionProducts, label, isReplacement, status } = props;
  return (
    <VStack spacing={3} align="flex-start">
      <Flex align="center" justify="space-between" width="full">
        <Text
          fontSize="sm"
          lineHeight="5"
          color="charcoalGrey"
          fontFamily="poppins"
          fontWeight="semibold"
        >
          {label}
        </Text>
        <Text fontSize="xs" color="charcoalGrey">
          Total{" "}
          <Text as="span" fontSize="xs" color="sea.500" fontWeight="semibold">
            {prescriptionProducts.length}
          </Text>
        </Text>
      </Flex>
      <Box borderRadius="xl" boxShadow="base" p={4} width="full">
        <VStack
          align="flex-start"
          divider={<StackDivider borderColor="veryLightPink" />}
          spacing={3}
        >
          {prescriptionProducts.length > 0 &&
            prescriptionProducts.map((product) => (
              <Text
                key={product.id}
                color="charcoalGrey"
                fontWeight="semibold"
                fontSize="sm"
                lineHeight="5"
              >
                {product.name}
              </Text>
            ))}
        </VStack>
        {!isReplacement &&
          (status === "created" ||
            status === "requested" ||
            status === "approved" ||
            status === "purchased") && (
            <Text
              pt={3}
              pb={3.5}
              mt={4}
              height="38px"
              background="#f0f0f0"
              fontSize="xxs"
              textAlign="center"
              color="charcoalGrey"
              borderRadius="base"
            >
              {status === "created" ||
              status === "requested" ||
              status === "approved"
                ? "Produk ini hanya dapat ditebus di Apotek mitra SehatQ."
                : "Resep ini sudah ditebus dan tidak dapat digunakan lagi"}
            </Text>
          )}
      </Box>
    </VStack>
  );
}

export function PrescriptionRecommendationPopupSkeletonMobile() {
  return (
    <Button
      variant="fit"
      border="solid 0.5px"
      borderColor="veryLightPink"
      borderRadius="base"
      background="white"
      isFullWidth
      height="40px"
      fontSize="xs"
      lineHeight="5"
      color="charcoalGrey"
      fontWeight="semibold"
      justifyContent="space-between"
      py={0}
      pl={0}
      pr={2}
      rightIcon={<ChevronRightIcon boxSize={6} color="charcoalGrey" />}
    >
      <Flex align="center">
        <Box
          borderLeftRadius="base"
          background="iceBlue.500"
          alignItems="center"
          p={2}
          mr={3}
        >
          <SehatQPdfIcon width={6} height={5} />
        </Box>
        <Skeleton width="117px" height="20px" />
      </Flex>
    </Button>
  );
}
