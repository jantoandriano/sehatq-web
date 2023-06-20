import React from "react";
import { useRadio, useRadioGroup } from "@chakra-ui/react";
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
} from "../../user-interfaces";

type Option = { name: string; amount: string; value: string };

export type DropdownMobileProps = {
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

export function InstallmentDropdownMobile(props: DropdownMobileProps) {
  function handleChange(params: string) {
    props.onChange(params);
  }

  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: "",
    onChange: handleChange,
  });

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
              value: props.selectedOption.value,
            }
          : null)}
        {...props.inputProps}
      >
        {props.selectedOption?.name ?? props.placeholder}
      </Button>

      <Drawer placement="bottom" onClose={props.onClose} isOpen={props.isOpen}>
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
            <Stack {...getRootProps()}>
              <VStack alignItems="left">
                {props.options.map((item) => {
                  return (
                    <CustomRadio
                      key={item.name}
                      name={item.name}
                      label={item.name}
                      amount={item.amount}
                      {...getRadioProps({ value: item.value as string })}
                    />
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

function CustomRadio(props: any) {
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(props);

  return (
    <Box {...htmlProps} as="label" {...getLabelProps()} cursor="pointer">
      <input {...getInputProps()} hidden />
      <Box {...getCheckboxProps()}>
        <Flex flexDir="row" alignItems="center">
          <Stack flexGrow="1" width="40%">
            <Text fontSize="sm" fontFamily="poppins" color="charcoalGrey">
              {props.label}
            </Text>
            <Text fontSize="xs" color="gray.800">
              {props.amount}
            </Text>
          </Stack>
          <Divider />
          {state.isChecked ? <CheckCircleIcon color="main.500" /> : <Box />}
        </Flex>
      </Box>
    </Box>
  );
}
