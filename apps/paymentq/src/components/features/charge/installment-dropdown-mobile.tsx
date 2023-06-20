import React, { forwardRef } from "react";
import {
  Text,
  ChevronDownIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  ButtonProps,
  Box,
  Flex,
  Button,
  Stack,
  VStack,
  CheckCircleIcon,
  Divider,
  HStack,
} from "@sehatq/components";
import { generatePriceDisplay } from "@sehatq/utils";

type Option = {
  adminFee: number;
  id: number;
  name: string;
  period: number;
  unit: string;
  amount: number;
};
export type InstallmentDropdownMobileProps = {
  title?: string;
  options: Option[];
  selectedOption?: Option;
  onChange: (newOption: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isError?: boolean;
  placeholder?: string;
  inputProps?: ButtonProps;
  subTitle?: string;
};

export const InstallmentDropdownMobile = forwardRef(
  function InstallmentDropdownMobile(props: InstallmentDropdownMobileProps) {
    return (
      <>
        <Button
          colorScheme="whiteAlpha"
          variant="outline"
          width="full"
          height="40px"
          borderRadius="base"
          fontWeight="normal"
          borderColor={props.isError ? "red.500" : "veryLightPink"}
          fontSize={!props.selectedOption ? "xs" : "sm"}
          color={!props.selectedOption ? "veryLightPink" : "charcoalGrey"}
          justifyContent="space-between"
          background="white"
          onClick={props.onOpen}
          padding="0"
          _hover={{
            borderColor: "main.500",
          }}
          rightIcon={
            <ChevronDownIcon
              color={props.isError ? "red.500" : "brownGrey.500"}
            />
          }
          {...(props.selectedOption
            ? {
                value: props.selectedOption.id,
              }
            : null)}
          {...props.inputProps}
        >
          <HStack margin="0">
            {props.selectedOption && props.selectedOption.unit === "full" && (
              <>
                <Text>{`Bayar penuh x ${generatePriceDisplay(
                  props.selectedOption.amount
                )}`}</Text>
              </>
            )}
            {props.selectedOption && props.selectedOption.unit !== "full" && (
              <Text>
                {`Cicilan ${props.selectedOption.period} ${
                  props.selectedOption.unit
                } x ${generatePriceDisplay(props.selectedOption.amount)}`}
              </Text>
            )}
            {!props.selectedOption && (
              <>
                <Text>{props.placeholder}</Text>
              </>
            )}
          </HStack>
        </Button>

        <Drawer
          placement="bottom"
          onClose={props.onClose}
          isOpen={props.isOpen}
        >
          <DrawerOverlay />
          <DrawerContent borderTopRadius="lg">
            {props.title ? (
              <DrawerHeader
                pb={2}
                pt={3}
                borderBottom="0.5px solid"
                borderBottomColor="veryLightPink"
              >
                <Text
                  fontSize="lg"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  color="charcoalGrey"
                >
                  {props.title}
                </Text>

                <Text fontSize="xs" color="veryLightPink">
                  {props.subTitle}
                </Text>
              </DrawerHeader>
            ) : null}

            <DrawerBody>
              <Stack defaultValue="" role="menu">
                <VStack alignItems="left" mt="0" gap="2">
                  {props.options.map((item) => {
                    return (
                      <Box
                        key={item.id}
                        onClick={() => {
                          props.onChange(String(item.id));
                          props.onClose();
                        }}
                      >
                        <Flex flexDir="row" alignItems="center">
                          <Flex flexDir="column" width="60%">
                            {item.unit !== "full" ? (
                              <Text fontWeight="semiBold">
                                {item.period} {item.unit}
                              </Text>
                            ) : (
                              <Text fontWeight="semiBold">Bayar penuh</Text>
                            )}

                            {item.unit !== "full" ? (
                              <Text fontSize="xs" color="brownGrey.500">
                                {generatePriceDisplay(item.amount)}/{item.unit}
                              </Text>
                            ) : (
                              <Text fontSize="xs" color="brownGrey.500">
                                {generatePriceDisplay(item.amount)}
                              </Text>
                            )}
                          </Flex>
                          <Divider />
                          {props.selectedOption?.id === item.id ? (
                            <CheckCircleIcon color="main.500" />
                          ) : (
                            <Box />
                          )}
                        </Flex>
                      </Box>
                    );
                  })}
                </VStack>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
);
