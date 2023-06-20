import React from "react";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";
import { formatDate } from "@sehatq/utils";
import "react-day-picker/dist/style.css";
import id from "date-fns/locale/id";
import { useFormControl } from "./hooks";
import { DateIcon } from "./icons";
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "./drawer";
import { VisuallyHiddenInput } from "./visually-hidden-input";
import { Button, ButtonProps } from "./button";
import { IconButton } from "./icon-button";

export type DatePickerMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isError?: boolean;
  value?: Date;
  onChange: (value: Date) => void;
  month?: Date;
  onMonthChange: (value: Date) => void;
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

export function DatePickerMobile(props: DatePickerMobileProps) {
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
        icon={<DateIcon w="7" h="7" />}
      />
    );
  } else {
    const { placeholder, textFormat = "dd MMM yyyy", inputProps } = props;
    buttonElement = (
      <Button
        variant="outline"
        onClick={onOpen}
        height="40px"
        width="full"
        fontWeight="normal"
        fontSize={!value ? "xs" : "sm"}
        color={!value ? "veryLightPink" : "charcoalGrey"}
        colorScheme="whiteAlpha"
        borderRadius="base"
        borderColor={isError ? "red.500" : "veryLightPink"}
        justifyContent="space-between"
        background="white"
        boxShadow="lg"
        rightIcon={<DateIcon w="5" h="5" />}
        _hover={{
          borderColor: "main.500",
        }}
        {...inputProps}
        {...(value
          ? {
              value: value.toISOString(),
            }
          : null)}
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
      {buttonElement}
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent px="5" py="6">
          <DrawerBody alignSelf="center" px="0" pt="2.5" as="form">
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
