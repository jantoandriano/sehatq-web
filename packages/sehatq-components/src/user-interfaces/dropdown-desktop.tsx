import React from "react";
import { Button, ButtonProps } from "./button";
import { ChevronDownIcon } from "./icons";
import { Menu, MenuButton, MenuItem, MenuList } from "./menu";
import { VisuallyHiddenInput } from "./visually-hidden-input";
import { useFormControl } from "./hooks";

type Option = { value: string; label: string };

export type DropdownDesktopProps = {
  options: Option[];
  selectedOption?: Option;
  onChange: (newOption: Option) => void;
  isError?: boolean;
  placeholder?: string;
  inputProps?: ButtonProps;
};

export function DropdownDesktop(props: DropdownDesktopProps) {
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
        </MenuButton>
        <MenuList zIndex="popover">
          {props.options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              _hover={{
                background: "veryLightPink",
              }}
              onClick={(e) => {
                e.preventDefault();
                props.onChange(option);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
