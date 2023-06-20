import React from "react";
import { Radio } from "./radio";
import { Button, ButtonProps } from "./button";
import { Divider } from "./divider";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "./drawer";
import { ChevronDownIcon } from "./icons";
import { VisuallyHiddenInput } from "./visually-hidden-input";
import { useFormControl } from "./hooks";
import { VStack } from "./v-stack";
import { Text } from "./text";

type Option = { value: string; label: string };

export type DropdownMobileProps = {
  title?: string;
  options: Option[];
  selectedOption?: Option;
  onChange: (newOption: Option) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isError?: boolean;
  placeholder?: string;
  inputProps?: ButtonProps;
  subTitle?: string;
};

export function DropdownMobile(props: DropdownMobileProps) {
  const input = useFormControl<HTMLInputElement>({});
  return (
    <>
      <VisuallyHiddenInput
        {...input}
        readOnly
        {...(props.selectedOption
          ? {
              value: props.selectedOption.value,
            }
          : null)}
      />
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
        {props.selectedOption?.label ?? props.placeholder}
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
              >{`Pilih ${props.title}`}</Text>

              <Text fontSize="xs" color="veryLightPink">
                {props.subTitle}
              </Text>
            </DrawerHeader>
          ) : null}

          <DrawerBody px={6} pt={4} pb={10}>
            <VStack
              width="full"
              spacing={2}
              divider={
                <Divider borderColor="veryLightPink" border="solid 0.5px" />
              }
              align="flex-start"
            >
              {props.options.map((option) => (
                <Radio
                  key={option.value}
                  onChange={() => {
                    props.onChange(option);
                    props.onClose();
                  }}
                  value={option.value}
                  isChecked={option.value == props.selectedOption?.value}
                >
                  {option.label}
                </Radio>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
