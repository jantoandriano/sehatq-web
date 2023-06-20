import React, { forwardRef } from "react";
import {
  Button,
  ButtonProps,
  ChevronDownIcon,
  VisuallyHiddenInput,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useFormControl,
  Text,
  Flex,
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

type InstallmentDropdownDesktopProps = {
  options: Option[];
  selectedOption?: Option;
  placeholder?: string;
  onChange: (newOption: string) => void;
  isError?: boolean;
  inputProps?: ButtonProps;
};

export const InstallmentDropdownDesktop = forwardRef(
  function InstallmentDropdownDesktop(props: InstallmentDropdownDesktopProps) {
    const input = useFormControl<HTMLInputElement>({});

    return (
      <>
        <VisuallyHiddenInput
          {...input}
          readOnly
          {...(props.selectedOption
            ? {
                value: props.selectedOption.id,
              }
            : null)}
        />
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            colorScheme="whiteAlpha"
            borderRadius="base"
            height="40px"
            width="max-content"
            fontWeight="normal"
            fontSize="md"
            borderColor={props.isError ? "red.500" : "veryLightPink"}
            color={!props.selectedOption ? "veryLightPink" : "charcoalGrey"}
            textAlign="left"
            background="white"
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
          </MenuButton>
          <MenuList zIndex="popover">
            {props.options.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
                _hover={{
                  background: "white",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  props.onChange(String(option.id));
                }}
              >
                <Flex flexDir="column">
                  {option.unit !== "full" ? (
                    <Text fontWeight="semiBold">
                      {option.period} {option.unit}
                    </Text>
                  ) : (
                    <Text fontWeight="semiBold">Bayar penuh</Text>
                  )}

                  {option.unit !== "full" ? (
                    <Text fontSize="xs" color="brownGrey.500">
                      {generatePriceDisplay(option.amount)}/{option.unit}
                    </Text>
                  ) : (
                    <Text fontSize="xs" color="brownGrey.500">
                      {generatePriceDisplay(option.amount)}
                    </Text>
                  )}
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </>
    );
  }
);
