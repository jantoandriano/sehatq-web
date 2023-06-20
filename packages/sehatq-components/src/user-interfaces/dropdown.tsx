import React from "react";
import { DropdownDesktop } from "./dropdown-desktop";
import { DropdownMobile } from "./dropdown-mobile";
import { ButtonProps } from "./button";
import { useDisclosure } from "./hooks";

type DefaultDropdownOption = { value: string; label: string };

type DropdownValue<Option> = Option extends DefaultDropdownOption
  ? Option["value"]
  : never;

export type DropdownProps<
  Options extends DefaultDropdownOption[] = DefaultDropdownOption[]
> = {
  options: Options;
  onChange: (newOption: DropdownValue<Options[number]>) => void;
  value?: DropdownValue<Options[number]> | "" | null;
  isMobile?: boolean;
  isError?: boolean;
  placeholder?: string;
  inputProps?: ButtonProps;
} & (
  | { isMobile?: false }
  | { isMobile: true; title?: string; subTitle?: string }
);

export function Dropdown<Options extends DefaultDropdownOption[]>(
  props: DropdownProps<Options>
) {
  const { options, value, onChange, isError, placeholder, inputProps } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultProps = {
    options,
    selectedOption: options.find((option) => option.value == value),
    onChange: (newValue: Options[number]) => {
      onChange(newValue.value as DropdownValue<Options[number]>);
    },
    placeholder,
    inputProps,
    isError,
  };

  if (props.isMobile) {
    const mobileProps = {
      ...defaultProps,
      title: props.title,
      subTitle: props.subTitle,
      onClose,
      onOpen,
      isOpen,
    };
    return <DropdownMobile {...mobileProps} />;
  }
  return <DropdownDesktop {...defaultProps} />;
}
