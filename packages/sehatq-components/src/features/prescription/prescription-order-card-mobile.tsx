import React from "react";
import { formatDate, parseToDate, useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  LinkBox,
  LinkOverlay,
  ChevronRightIcon,
  Skeleton,
} from "../../user-interfaces";

export type PrescriptionOrderCardMobileProps = {
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

export function PrescriptionOrderCardMobile(
  props: PrescriptionOrderCardMobileProps
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
            p={4}
            width="full"
          >
            <Text
              fontSize="md"
              color="charcoalGrey"
              lineHeight="5"
              fontFamily="poppins"
              fontWeight="semibold"
            >
              Detail Pesanan
            </Text>
            <VStack
              spacing={2}
              align="flex-start"
              background="gray.500"
              borderRadius="base"
              p={3}
              width="full"
            >
              {prescription.purchasedAt && (
                <Flex justify="space-between" width="full" align="center">
                  <Text fontSize="xs" lineHeight="3">
                    Tanggal Pesanan
                  </Text>
                  <Text
                    fontSize="xs"
                    lineHeight="5"
                    fontWeight="semibold"
                    color="charcoalGrey"
                  >
                    {formatDate(
                      parseToDate(prescription.purchasedAt, "iso"),
                      "dd MMMM yyyy"
                    )}
                  </Text>
                </Flex>
              )}
              {prescription.merchantName && (
                <Flex justify="space-between" width="full" align="center">
                  <Text fontSize="xs" lineHeight="3" color="charcoalGrey">
                    Dipesan di
                  </Text>
                  <Text fontSize="xs" lineHeight="5" color="sea.500">
                    {prescription.merchantName}
                  </Text>
                </Flex>
              )}
            </VStack>
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
              fontSize="xs"
              height="28px"
            >
              Lihat Detail
            </Button>
          </VStack>
          <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
            trapFocus={false}
          >
            <DrawerOverlay>
              <DrawerContent
                borderTopRadius="lg"
                maxHeight="calc(100vh - 45px)"
              >
                <DrawerBody px={4} py={5}>
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    fontSize="md"
                    mb={4}
                  >
                    Pilih Order
                  </Text>
                  <VStack spacing={3} align="flex-start">
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
                          px={3}
                        >
                          <Box mr={1.5}>
                            <Text
                              fontSize="sm"
                              lineHeight="5"
                              color="charcoalGrey"
                              fontStyle="poppins"
                              fontWeight="semibold"
                              noOfLines={1}
                            >
                              {order.merchantName}
                            </Text>
                            {prescription.purchasedAt && (
                              <Text
                                fontSize="xxs"
                                color="brownGrey.500"
                                mt={0.5}
                              >
                                Tanggal Pesan:{" "}
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
                              whiteSpace="nowrap"
                            >
                              {order.number}
                              <ChevronRightIcon
                                boxSize={4}
                                color="sea.500"
                                ml={0.5}
                              />
                            </LinkOverlay>
                          </Navigate>
                        </LinkBox>
                      );
                    })}
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      )}
    </>
  );
}

export function PrescriptionOrderCardSkeletonMobile() {
  return (
    <VStack
      spacing={4}
      align="flex-start"
      background="white"
      boxShadow="base"
      borderRadius="xl"
      p={4}
      width="full"
    >
      <Text
        fontSize="md"
        color="charcoalGrey"
        lineHeight="5"
        fontFamily="poppins"
        fontWeight="semibold"
      >
        Detail Pesanan
      </Text>
      <VStack
        spacing={2}
        align="flex-start"
        background="gray.500"
        borderRadius="base"
        p={3}
        width="full"
      >
        <Flex justify="space-between" width="full" align="center">
          <Skeleton width="95px" height="16px" />
          <Skeleton width="69px" height="20px" />
        </Flex>
        <Flex justify="space-between" width="full" align="center">
          <Skeleton width="60px" height="16px" />
          <Skeleton width="73px" height="20px" />
        </Flex>
      </VStack>
      <Skeleton width="296px" height="28px" />
    </VStack>
  );
}
