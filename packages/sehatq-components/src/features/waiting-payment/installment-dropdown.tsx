import React from "react";
import { ButtonProps } from "../../user-interfaces/button";
import { useDisclosure } from "../../user-interfaces/hooks";
import { InstallmentDropdownDesktop } from "./installment-dropdown-desktop";
import { InstallmentDropdownMobile } from "./installment-dropdown-mobile";

type DefaultDropdownOption = { name: string; amount: string; value: string };

export type DropdownProps<
  Options extends DefaultDropdownOption[] = DefaultDropdownOption[]
> = {
  options: Options;
  onChange: (newOption: string) => void;
  value?: string | "" | null;
  isMobile?: boolean;
  isError?: boolean;
  placeholder?: string;
  inputProps?: ButtonProps;
} & (
  | { isMobile?: false }
  | { isMobile: true; title?: string; subTitle?: string }
);

export function InstallmentDropdown<Options extends DefaultDropdownOption[]>(
  props: DropdownProps<Options>
) {
  const { options, value, onChange, isError, placeholder, inputProps } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultProps = {
    options,
    selectedOption: options.find((option) => option.value == value),
    onChange: (newValue: string) => {
      onChange(newValue);
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
    return <InstallmentDropdownMobile {...mobileProps} />;
  }
  return <InstallmentDropdownDesktop {...defaultProps} />;
}
