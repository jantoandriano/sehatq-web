import React from "react";
import { ButtonProps, useDisclosure } from "@sehatq/components";
import { InstallmentDropdownDesktop } from "./installment-dropdown-desktop";
import { InstallmentDropdownMobile } from "./installment-dropdown-mobile";

type InstallmentDropdownOptions = {
  adminFee: number;
  id: number;
  name: string;
  period: number;
  unit: string;
  amount: number;
};

export type InstallmentDropdownProps<
  Options extends InstallmentDropdownOptions[] = InstallmentDropdownOptions[]
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

export function InstallmentDropdown<
  Options extends InstallmentDropdownOptions[]
>(props: InstallmentDropdownProps<Options>) {
  const { options, value, onChange, isError, placeholder, inputProps } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultProps = {
    options,
    selectedOption: options.find((option) => String(option.id) === value),
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
