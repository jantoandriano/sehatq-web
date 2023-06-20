import React from "react";

import {
  Box,
  Text,
  Skeleton,
  SkeletonText,
  Flex,
  VStack,
  StackDivider,
  HStack,
  RadioFillIcon,
  Divider,
  Image,
} from "@sehatq/components";

import { type ItemPayments } from "./payment-method";
import { type StateSelectPaymentType } from "./payment";
import { ModalConfirm } from "./modal-confirm";

type PaymentMethodDesktopProps = {
  payments: ItemPayments[];
  onSelected: (param: StateSelectPaymentType) => void;
  statePaymentSelect: StateSelectPaymentType[];
  stateModal: {
    isVisible: boolean;
    title: string;
  };
  onConfirmModal: () => void;
};

export function PaymentMethodDesktop(props: PaymentMethodDesktopProps) {
  const { statePaymentSelect, onSelected, payments } = props;

  return (
    <Box w="full">
      <Text fontFamily="poppins" fontWeight="semibold">
        Metode Pembayaran Lain
      </Text>
      <Box bgColor="white" mt={5}>
        {payments.map((payment) => {
          if (payment.slug !== "split-bill") {
            const isCreditCard = payment.slug === "cc";
            return (
              <Box
                borderRadius="8px"
                borderColor="veryLightPink"
                boxShadow="0px 2px 12px rgba(0, 0, 0, 0.08)"
                borderWidth={1}
                key={payment.slug}
                mb={5}
                py={3}
              >
                <Box w="full">
                  <Text
                    px={5}
                    py={3}
                    fontFamily="poppins"
                    fontWeight="semibold"
                  >
                    {payment.name}
                  </Text>
                  <Divider borderColor="veryLightPink" />
                </Box>
                <VStack
                  divider={<StackDivider borderColor="veryLightPink" />}
                  spacing={2}
                  px={5}
                  mt={2}
                >
                  {payment.options.map((item) => {
                    return (
                      <Flex
                        key={item.id}
                        w="full"
                        alignItems="center"
                        justifyContent="space-between"
                        cursor="pointer"
                        onClick={() => {
                          onSelected({ ...item, slug: payment.slug });
                        }}
                      >
                        <HStack spacing={8}>
                          {item.imageUrl && !isCreditCard && (
                            <Box w={24} h={12}>
                              <Image
                                h={12}
                                priority
                                src={item.imageUrl}
                                alt="icon payment"
                                layout="fill"
                                objectFit="contain"
                                align="center"
                              />
                            </Box>
                          )}
                          <Box>
                            {isCreditCard && (
                              <Box w={24}>
                                <Image
                                  priority
                                  src={item.imageUrl}
                                  alt="icon payment"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </Box>
                            )}
                            <Text
                              fontWeight="semibold"
                              {...(item.disable && { color: "brownGrey.500" })}
                            >
                              {item.name}
                            </Text>
                            {item.disable && (
                              <Text fontSize="sm">{item.disabledReason}</Text>
                            )}
                          </Box>
                        </HStack>
                        {statePaymentSelect.some(
                          (select) => select.id === item.id
                        ) ? (
                          <RadioFillIcon boxSize="16px" />
                        ) : (
                          <Box
                            borderRadius="50%"
                            {...(item.disable
                              ? { bgColor: "veryLightPink" }
                              : { border: "1px solid" })}
                            boxSize="15px"
                          />
                        )}
                      </Flex>
                    );
                  })}
                </VStack>
              </Box>
            );
          } else {
            return null;
          }
        })}
      </Box>

      <ModalConfirm
        isOpen={props.stateModal.isVisible}
        title={props.stateModal.title}
        onCancel={props.onConfirmModal}
        cancelText="OK"
      />
    </Box>
  );
}

export function PaymentMethodSkeletonDesktop() {
  return (
    <Box w="full">
      <SkeletonText skeletonHeight="3" width="40%" noOfLines={1} mb={1} />
      <VStack mt={6}>
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
      </VStack>
      <VStack mt={6}>
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
      </VStack>
      <VStack mt={6}>
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
      </VStack>
      <VStack mt={6}>
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
      </VStack>
    </Box>
  );
}
