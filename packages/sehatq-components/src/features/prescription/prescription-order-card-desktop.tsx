import React from "react";
import { formatDate, parseToDate, useNavigation } from "@sehatq/utils";
import {
  Box,
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  LinkBox,
  LinkOverlay,
  Skeleton,
  ChevronRightIcon,
  ModalCloseButton,
} from "../../user-interfaces";

export type PrescriptionOrderCardDesktopProps = {
  prescription?: {
    purchasedAt: string | null;
    merchantName: string | null;
    merchantOrders: {
      id: number;
      number: string;
      merchantName: string;
    }[];
  };
  handleOpenDetail: (haveMultipleOrders: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
};

export function PrescriptionOrderCardDesktop(
  props: PrescriptionOrderCardDesktopProps
) {
  const { prescription, handleOpenDetail, isOpen, onClose } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      {prescription && (
        <>
          <VStack
            spacing={4}
            align="flex-start"
            background="white"
            boxShadow="base"
            borderRadius="xl"
            px={8}
            py={4}
            pb={5}
            width="full"
          >
            <Text
              color="charcoalGrey"
              fontSize="md"
              lineHeight="7"
              fontWeight="semibold"
              fontFamily="poppins"
            >
              Detail Pesanan
            </Text>
            {prescription.purchasedAt && (
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Tanggal Pesanan
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="5"
                  color="charcoalGrey"
                  fontWeight="semibold"
                >
                  {formatDate(
                    parseToDate(prescription.purchasedAt, "iso"),
                    "dd MMMM yyyy"
                  )}
                </Text>
              </VStack>
            )}
            {prescription.merchantName && (
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Dipesan di
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="5"
                  color="sea.500"
                  fontWeight="semibold"
                >
                  {prescription.merchantName}
                </Text>
              </VStack>
            )}
            <Button
              isFullWidth
              variant="solid"
              colorScheme="main"
              onClick={() =>
                handleOpenDetail(
                  prescription.merchantOrders?.length > 1 ? true : false
                )
              }
              borderRadius="base"
              size="md"
            >
              Lihat Detail
            </Button>
          </VStack>
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
                Daftar Order
              </ModalHeader>
              <ModalCloseButton
                boxSize={4}
                top="5"
                color="sea.500"
                fontWeight="semibold"
              />
              <ModalBody p={6}>
                <VStack spacing={3} align="flex-start">
                  <Text
                    fontSize="sm"
                    lineHeight="5"
                    color="charcoalGrey"
                    fontFamily="poppins"
                    fontWeight="semibold"
                  >
                    Mau Lihat Pesanan yang Mana?
                  </Text>
                  {prescription.merchantOrders?.map((order) => {
                    const splitMerchantNo = order.number.split("-");
                    return (
                      <LinkBox
                        key={order.id}
                        width="full"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        boxShadow="base"
                        borderRadius="xl"
                        py="18px"
                        pl={4}
                        pr={6}
                      >
                        <Box>
                          <Text
                            fontSize="sm"
                            lineHeight="5"
                            color="charcoalGrey"
                            fontStyle="poppins"
                            fontWeight="semibold"
                          >
                            {order.merchantName}
                          </Text>
                          {prescription.purchasedAt && (
                            <Text fontSize="xxs" color="brownGrey.500" mt={0.5}>
                              Tanggal Pesan:
                              {formatDate(
                                parseToDate(prescription.purchasedAt, "iso"),
                                "dd MMMM yyyy"
                              )}
                            </Text>
                          )}
                        </Box>
                        <Navigate
                          name="EXTERNAL_PROFILE_ORDER_DETAIL"
                          query={{
                            coNumber: splitMerchantNo[0],
                            moSequence: splitMerchantNo[1],
                          }}
                        >
                          <LinkOverlay
                            fontSize="xxs"
                            fontWeight="medium"
                            textAlign="center"
                            color="sea.500"
                          >
                            {order.number}
                            <ChevronRightIcon
                              boxSize={5}
                              color="sea.500"
                              ml={2}
                            />
                          </LinkOverlay>
                        </Navigate>
                      </LinkBox>
                    );
                  })}
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export function PrescriptionOrderCardSkeletonDesktop() {
  return (
    <VStack
      spacing={4}
      align="flex-start"
      background="white"
      boxShadow="base"
      borderRadius="xl"
      px={8}
      py={4}
      pb={5}
      width="full"
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        lineHeight="7"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Detail Pesanan
      </Text>
      <VStack align="flex-start" spacing={1}>
        <Skeleton width="140px" height="16px" />
        <Skeleton width="173px" height="20px" />
      </VStack>
      <VStack align="flex-start" spacing={1}>
        <Skeleton width="100px" height="16px" />
        <Skeleton width="126px" height="20px" />
      </VStack>
      <Skeleton width="666px" height="40px" />
    </VStack>
  );
}
