import React from "react";
import { useRadio, useRadioGroup, UseRadioProps } from "@chakra-ui/react";
import { Box } from "./box";
import { RadioFillIcon, Icon } from "./icons";
import { Stack, StackProps } from "./stack";

export type IconPosition = "left" | "right";
export type RadioProps = {
  children: React.ReactNode;
  iconPosition?: IconPosition;
  containerProps?: StackProps;
  CustomRadioFillIcon?: React.FunctionComponent;
} & UseRadioProps;

export function Radio(props: RadioProps) {
  const {
    children,
    CustomRadioFillIcon = RadioFillIcon,
    iconPosition = "left",
    containerProps,
  } = props;
  const {
    state: { isChecked },
    getRootProps,
    getInputProps,
    getCheckboxProps,
  } = useRadio(props);

  const root = getRootProps();
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Stack
      as="label"
      w="100%"
      direction={iconPosition === "left" ? "row" : "row-reverse"}
      align="center"
      cursor="pointer"
      {...containerProps}
      {...(root as any)}
    >
      <input {...input} />
      {!isChecked ? (
        <Box borderRadius="50%" border="1px solid" boxSize="16px" />
      ) : (
        <Icon as={CustomRadioFillIcon} boxSize="16px" />
      )}
      <Box flex="1" {...(checkbox as any)}>
        {children}
      </Box>
    </Stack>
  );
}

export type RadioGroupProps = {
  options: {
    element: React.ReactNode;
    isDisabled?: boolean;
    value: string;
  }[];
  name: string;
  onChange: (nextValue: string) => void;
  defaultValue?: string;
  isRadioInline?: boolean;
  iconPosition?: IconPosition;
  IconFill?: React.FunctionComponent;
  spacing?: StackProps["spacing"];
  direction?: StackProps["direction"];
  divider?: React.ReactElement;
};

export function RadioGroup(props: RadioGroupProps) {
  const {
    options,
    defaultValue,
    name,
    onChange,
    IconFill,
    iconPosition,
    spacing = 0,
    direction = "row",
    divider,
    isRadioInline = false,
  } = props;

  const { getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  return (
    <Stack direction={direction} divider={divider} spacing={spacing}>
      {options.map((option) => {
        const radio = getRadioProps({ value: option.value });
        return (
          <Radio
            key={option.value}
            isDisabled={option.isDisabled}
            CustomRadioFillIcon={IconFill}
            {...radio}
            iconPosition={iconPosition}
            containerProps={{
              width: isRadioInline ? "max-content" : "width",
            }}
          >
            {option.element}
          </Radio>
        );
      })}
    </Stack>
  );
}
