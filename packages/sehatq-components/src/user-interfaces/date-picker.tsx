import React, { useState } from "react";
import { DayPickerSingleProps } from "react-day-picker";
import { ButtonProps } from "./button";
import { useDisclosure } from "./hooks";
import { DatePickerDesktop } from "./date-picker-desktop";
import { DatePickerMobile } from "./date-picker-mobile";

export type DatePickerProps = {
  isMobile?: boolean;
  value?: Date;
  onChange: (value: Date) => void;
  isError?: boolean;
  pickerProps?: Partial<DayPickerSingleProps>;
} & (
  | { variant: "button" }
  | {
      variant: "input";
      placeholder?: string;
      textFormat?: string;
      inputProps?: ButtonProps;
    }
);
export function DatePicker(props: DatePickerProps) {
  const { isMobile, onChange, value, ...otherProps } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [month, onMonthChange] = useState(value ?? new Date());
  const [prevValue, setPrevValue] = useState(value);

  if (
    value &&
    (value?.getFullYear() !== prevValue?.getFullYear() ||
      value?.getMonth() !== prevValue?.getMonth())
  ) {
    setPrevValue(value);
    onMonthChange(value);
  }

  const newProps = {
    ...otherProps,
    value,
    isOpen,
    onOpen,
    onClose,
    month,
    onMonthChange,
    onChange: (value: Date) => {
      onClose();
      onChange(value);
    },
  };

  if (isMobile) {
    return <DatePickerMobile {...newProps} />;
  }
  return <DatePickerDesktop {...newProps} />;
}
