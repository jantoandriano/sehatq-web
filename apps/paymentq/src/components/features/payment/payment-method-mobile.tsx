import React from "react";

import {
  Box,
  Image,
  Text,
  Skeleton,
  SkeletonText,
  Flex,
  VStack,
  StackDivider,
  HStack,
  RadioFillIcon,
  Divider,
} from "@sehatq/components";
import { type ItemPayments } from "./payment-method";
import { type StateSelectPaymentType } from "./payment";
import { ModalConfirm } from "./modal-confirm";

type PaymentMethodMobileProps = {
  statePaymentSelect: StateSelectPaymentType[];
  payments: ItemPayments[];
  onSelected: (param: StateSelectPaymentType) => void;
  stateModal: {
    isVisible: boolean;
    title: string;
  };
  onConfirmModal: () => void;
};

export function PaymentMethodMobile(props: PaymentMethodMobileProps) {
  const { statePaymentSelect, onSelected, payments } = props;

  return (
    <Box w="full">
      <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold">
        Metode Pembayaran Lain
      </Text>
      <Box bgColor="white" mt={5}>
        {payments.map((payment, index) => {
          if (payment.slug !== "split-bill") {
            const isCreditCard = payment.slug === "cc";
            return (
              <Box
                pb={3}
                mb={payments.length - 2 !== index ? 5 : 0}
                borderRadius="md"
                key={payment.slug}
                borderColor="veryLightPink"
                boxShadow="0px 2px 12px rgba(0, 0, 0, 0.08)"
                borderWidth={1}
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
                        <HStack>
                          {item.imageUrl && !isCreditCard && (
                            <Box w={16} h={10} flexShrink={0}>
                              <Image
                                h={10}
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
                              fontSize="sm"
                              fontWeight="semibold"
                              {...(item.disable && { color: "brownGrey.500" })}
                            >
                              {item.name}
                            </Text>
                            {item.disable && (
                              <Text fontSize="xs">{item.disabledReason}</Text>
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
                            flexShrink={0}
                          />
                        )}
                      </Flex>
                    );
                  })}
                </VStack>
              </Box>
            );
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

export function PaymentMethodSkeletonMobile() {
  return (
    <Box w="full">
      <SkeletonText
        skeletonHeight="3"
        width="40%"
        noOfLines={1}
        mb={2}
        mt={2}
      />
      <VStack>
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
      </VStack>
      <VStack mt={4}>
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
      </VStack>
      <VStack mt={4}>
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
      </VStack>
      <VStack mt={4}>
        <Skeleton height={12} w="full" />
        <Skeleton height={12} w="full" />
      </VStack>
    </Box>
  );
}
