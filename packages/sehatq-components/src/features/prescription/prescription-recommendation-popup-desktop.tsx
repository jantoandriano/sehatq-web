import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
  ChevronRightIcon,
  ModalCloseButton,
  SehatQPdfIcon,
  Button,
  StackDivider,
} from "../../user-interfaces";
import { PrescriptionProductsResponse } from "./prescription-products-model";
import { PrescriptionStatusCode } from "./prescription-constant";

export type PrescriptionRecommendationPopupDesktopProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: PrescriptionStatusCode;
  source: string;
  prescriptionProducts: PrescriptionProductsResponse["data"];
  productsReplacement: PrescriptionProductsResponse["data"];
};

export function PrescriptionRecommendationPopupDesktop(
  props: PrescriptionRecommendationPopupDesktopProps
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
      <Flex
        justify="space-between"
        boxShadow="base"
        borderRadius="xl"
        background="white"
        px={6}
        py={4}
        width="full"
      >
        <HStack spacing={3}>
          <Box
            borderRadius="base"
            background="iceBlue.500"
            boxSize="40px"
            alignItems="center"
            p={2}
          >
            <SehatQPdfIcon boxSize={6} />
          </Box>
          <Text
            fontSize="sm"
            color="charcoalGrey"
            fontWeight="semibold"
            fontFamily="poppins"
            lineHeight="4"
          >
            Rekomendasi Resep
          </Text>
        </HStack>
        <Button
          variant="fit"
          fontSize="sm"
          color="sea.500"
          fontWeight="semibold"
          lineHeight="4"
          rightIcon={<ChevronRightIcon boxSize={7} color="sea.500" />}
          onClick={onOpen}
        >
          Lihat Detail
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="md"
            textAlign="center"
            borderBottom="1px solid"
            borderColor="veryLightPink"
          >
            Rekomendasi Resep
          </ModalHeader>
          <ModalCloseButton
            boxSize={4}
            top="5"
            color="sea.500"
            fontWeight="semibold"
          />
          <ModalBody p={6}>
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
          </ModalBody>
        </ModalContent>
      </Modal>
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

export function PrescriptionRecommendationPopupSkeletonDesktop() {
  return (
    <Flex
      justify="space-between"
      boxShadow="base"
      borderRadius="xl"
      background="white"
      align="center"
      px={6}
      py={4}
      width="full"
    >
      <HStack spacing={3}>
        <Box
          borderRadius="base"
          background="iceBlue.500"
          boxSize="40px"
          alignItems="center"
          p={2}
        >
          <SehatQPdfIcon boxSize={6} />
        </Box>
        <Skeleton width="124px" height="18px" />
      </HStack>
      <Skeleton width="120px" height="19px" />
    </Flex>
  );
}
