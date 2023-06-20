import React from "react";

import {
  Box,
  Image,
  Text,
  Skeleton,
  SkeletonText,
  Switch,
  Flex,
  VStack,
  StackDivider,
  HStack,
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";
import { type StateSelectPaymentType } from "./payment";
import { type ItemCashless } from "./cashless-payment";

type CashlessPaymentDesktopProps = {
  statePaymentSelect: StateSelectPaymentType[];
  cashless: ItemCashless[];
  onSelected: (param: StateSelectPaymentType) => void;
};

export function CashlessPaymentDesktop(props: CashlessPaymentDesktopProps) {
  const { statePaymentSelect, onSelected, cashless } = props;

  return (
    <Box w="full">
      <HStack spacing={2}>
        <Box>
          <Image
            src={ASSETS.RECOMENDED_ICON}
            alt="recomended"
            w={30}
            h={30}
            align="center"
          />
        </Box>
        <Box>
          <Text fontFamily="poppins" fontWeight="semibold">
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
        borderColor="veryLightPink"
        borderWidth={1}
      >
        <VStack
          divider={<StackDivider borderColor="veryLightPink" />}
          spacing={2}
        >
          {cashless.map((cashles) => {
            return cashles.options.map((item) => {
              return (
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
                  <HStack spacing={8}>
                    <Box w={24} h={12}>
                      {item.imageUrl && (
                        <Image
                          h={12}
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
                        fontWeight="semibold"
                        {...(item.disable && { color: "brownGrey.500" })}
                      >
                        {item.name}
                      </Text>
                      {item.disable ? (
                        <Text fontSize="sm">{item.disabledReason}</Text>
                      ) : (
                        <Text fontSize="sm">{item.description || ""}</Text>
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
              );
            });
          })}
        </VStack>
      </Box>
    </Box>
  );
}

export function CashlessPaymentSkeletonDesktop() {
  return (
    <Box w="full">
      <SkeletonText skeletonHeight="3" width="40%" noOfLines={1} mb={2} />
      <VStack>
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
        <Skeleton height={20} w="full" />
      </VStack>
    </Box>
  );
}
