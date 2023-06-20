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
  Switch,
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";
import { type StateSelectPaymentType } from "./payment";
import { type ItemCashless } from "./cashless-payment";

type CashlessPaymentMobileProps = {
  statePaymentSelect: StateSelectPaymentType[];
  cashless: ItemCashless[];
  onSelected: (param: StateSelectPaymentType) => void;
};

export function CashlessPaymentMobile(props: CashlessPaymentMobileProps) {
  const { statePaymentSelect, onSelected, cashless } = props;

  return (
    <Box w="full">
      <HStack spacing={3}>
        <Box>
          <Image
            src={ASSETS.RECOMENDED_ICON}
            alt="recomended"
            w={25}
            h={25}
            align="center"
          />
        </Box>
        <Box>
          <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold">
            Pembayaran Direkomendasikan
          </Text>
        </Box>
      </HStack>
      <Box
        p={5}
        borderRadius="md"
        bgColor="white"
        boxShadow="0px 2px 12px rgba(0, 0, 0, 0.08)"
        mt={5}
        borderColor="#70CBCF"
        borderWidth={1}
      >
        <VStack
          divider={<StackDivider borderColor="veryLightPink" />}
          spacing={2}
        >
          {cashless.map((cashles) => {
            return cashles.options.map((item) => (
              <Flex
                key={item.id}
                w="full"
                alignItems="center"
                justifyContent="space-between"
                cursor="pointer"
                onClick={(event) => {
                  event.preventDefault();
                  onSelected({ ...item, slug: cashles.slug });
                }}
              >
                <HStack>
                  <Box w={16} h={10} flexShrink={0}>
                    {item.imageUrl && (
                      <Image
                        h={10}
                        priority
                        src={item.imageUrl}
                        alt="icon payment"
                        layout="fill"
                        objectFit="contain"
                        align="center"
                      />
                    )}
                  </Box>

                  <Box>
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
                <Switch
                  isChecked={statePaymentSelect.some(
                    (select) => select.id === item.id
                  )}
                  isDisabled={item.disable}
                />
              </Flex>
            ));
          })}
        </VStack>
      </Box>
    </Box>
  );
}

export function CashlessPaymentSkeletonMobile() {
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
    </Box>
  );
}
