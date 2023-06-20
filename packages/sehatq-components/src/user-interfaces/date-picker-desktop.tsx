import React from "react";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";
import { formatDate } from "@sehatq/utils";
import id from "date-fns/locale/id";
import "react-day-picker/dist/style.css";
import { VisuallyHiddenInput } from "./visually-hidden-input";
import { DateIcon } from "./icons";
import { useFormControl } from "./hooks";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button, ButtonProps } from "./button";
import { IconButton } from "./icon-button";

export type DatePickerDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isError?: boolean;
  value?: Date;
  month?: Date;
  onMonthChange: (value: Date) => void;
  onChange: (value: Date) => void;
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

export function DatePickerDesktop(props: DatePickerDesktopProps) {
  const {
    value,
    isError,
    onChange,
    onOpen,
    onClose,
    isOpen,
    month,
    onMonthChange,
    pickerProps,
  } = props;
  const input = useFormControl<HTMLInputElement>({});
  const currentYear = new Date().getFullYear();
  let buttonElement = null;
  let inputElement = null;

  if (props.variant === "button") {
    buttonElement = (
      <IconButton
        variant="fit"
        aria-label="date picker"
        onClick={onOpen}
        icon={<DateIcon w="10" h="10" />}
      />
    );
  } else {
    const { placeholder, textFormat = "dd MMM yyyy", inputProps } = props;
    buttonElement = (
      <Button
        onClick={onOpen}
        variant="outline"
        colorScheme="whiteAlpha"
        borderRadius="base"
        height="40px"
        width="full"
        fontWeight="normal"
        rightIcon={<DateIcon w="5" h="5" />}
        fontSize="md"
        borderColor={isError ? "red.500" : "veryLightPink"}
        color={!value ? "veryLightPink" : "charcoalGrey"}
        justifyContent="space-between"
        background="white"
        boxShadow="lg"
        _hover={{
          borderColor: "main.500",
        }}
        {...(value
          ? {
              value: value.toISOString(),
            }
          : null)}
        {...inputProps}
      >
        {value ? formatDate(value, textFormat) : placeholder}
      </Button>
    );
    inputElement = (
      <VisuallyHiddenInput
        {...input}
        readOnly
        {...(value
          ? {
              value: value.toISOString(),
            }
          : null)}
      />
    );
  }

  return (
    <>
      {inputElement}
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>{buttonElement}</PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <DayPicker
              mode="single"
              fromYear={currentYear - 80}
              toYear={currentYear + 1}
              captionLayout="dropdown"
              weekStartsOn={1}
              defaultMonth={value}
              selected={value}
              onSelect={(selectedDate) =>
                selectedDate ? onChange(selectedDate) : null
              }
              locale={id}
              month={month}
              onMonthChange={onMonthChange}
              {...pickerProps}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
