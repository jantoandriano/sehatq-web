import React, { ReactElement, useCallback } from "react";
import {
  useToast as useChakraToast,
  Flex,
  Text,
  CloseButton,
  RenderProps,
  Box,
  ToastPositionWithLogical,
  FlexProps,
} from "@chakra-ui/react";
import { isMobileDevice } from "@sehatq/utils";
import { StripChakraProps } from "./utils";

export interface ToastArgs {
  id?: string;
  title?: string;
  message: string | ReactElement;
  status: "success" | "error" | "netral";
  position?: ToastPositionWithLogical;
  isCenterText?: boolean;
  wrapperProps?: StripChakraProps<FlexProps> | undefined;
  containerStyle?: React.CSSProperties | undefined;
  isHideCloseButton?: boolean;
}

export interface ToastProps extends ToastArgs {
  onClose: () => void;
}

const Toast = ({
  onClose,
  title,
  message,
  status,
  isCenterText,
  wrapperProps,
  isHideCloseButton,
}: ToastProps) => (
  <Flex
    padding="2"
    paddingLeft="3"
    borderRadius="xl"
    border="1px solid"
    borderColor={
      status === "success"
        ? "main.500"
        : status === "netral"
        ? "charcoalGrey"
        : "cherry.500"
    }
    bgColor={
      status === "success"
        ? "paleBlue.500"
        : status === "netral"
        ? "charcoalGrey"
        : "cherry.50"
    }
    align="center"
    justify="space-between"
    boxShadow="base"
    {...wrapperProps}
  >
    <Box
      marginRight={1}
      width="full"
      textAlign={isCenterText ? "center" : undefined}
    >
      {title && (
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={status === "netral" ? "white" : undefined}
        >
          {title}
        </Text>
      )}
      {typeof message == "string" ? (
        <Text fontSize="sm" color={status === "netral" ? "white" : undefined}>
          {message}
        </Text>
      ) : (
        message
      )}
    </Box>
    {isHideCloseButton ? null : (
      <CloseButton
        onClick={onClose}
        size="sm"
        color={status === "netral" ? "white" : "brownGrey.500"}
        border="none"
      />
    )}
  </Flex>
);

export const useToast = () => {
  const toast = useChakraToast();

  return useCallback(
    ({
      id = "toast",
      title,
      message,
      status,
      position,
      isCenterText,
      wrapperProps,
      containerStyle,
      isHideCloseButton,
    }: ToastArgs) => {
      if (!toast.isActive(id)) {
        toast({
          id,
          containerStyle: containerStyle,
          duration: 3000,
          position: position
            ? position
            : isMobileDevice(window?.navigator?.userAgent)
            ? "bottom"
            : status === "netral"
            ? "top"
            : "top-right",
          render: ({ id, onClose }: RenderProps) => (
            <Toast
              key={id}
              status={status}
              onClose={onClose}
              title={title}
              message={message}
              isCenterText={isCenterText}
              wrapperProps={wrapperProps}
              isHideCloseButton={isHideCloseButton}
            />
          ),
        });
      }
    },
    [toast]
  );
};
