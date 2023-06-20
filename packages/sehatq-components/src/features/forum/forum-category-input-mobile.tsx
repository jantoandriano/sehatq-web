import React from "react";
import {
  Box,
  Button,
  ChevronDownIcon,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Skeleton,
  VStack,
} from "../../user-interfaces";

export type ForumCategoryInputMobileProps = {
  options: {
    value: number;
    name: string;
  }[];
  placeholder: string;
  onChange?: (selected: { value: number; name: string }) => void;
  selectedValue?: number;
  selectedName?: string;
  isFullWidth?: boolean;
  isRequired?: boolean;
  onCloseOptions: () => void;
  isShowOptions: boolean;
};

export function ForumCategoryInputMobile(props: ForumCategoryInputMobileProps) {
  return (
    <>
      <Button
        variant="outline"
        colorScheme="whiteAlpha"
        color={props.selectedName ? "charcoalGrey" : "veryLightPink"}
        border="0.5px solid"
        borderRadius="base"
        borderColor={
          props.isRequired && !props.selectedValue ? "red.500" : "veryLightPink"
        }
        width={props.isFullWidth ? "full" : "max-content"}
        height="32px"
        _focus={{
          borderColor: "main.500",
        }}
        rightIcon={
          <ChevronDownIcon
            color={
              props.isRequired && !props.selectedValue
                ? "red.500"
                : "veryLightPink"
            }
          />
        }
        fontWeight="normal"
        fontFamily="openSans"
        fontSize="sm"
        p={3}
        onClick={props.onCloseOptions}
        justifyContent="space-between"
      >
        {props.selectedName ?? props.placeholder}
      </Button>
      <Drawer
        placement="bottom"
        onClose={props.onCloseOptions}
        isOpen={props.isShowOptions}
      >
        <DrawerOverlay zIndex="modal" />
        <DrawerContent zIndex="popover" borderTopRadius="lg">
          <DrawerHeader
            pb={2}
            pt={3}
            fontSize="lg"
            fontFamily="poppins"
            fontWeight="semibold"
            color="charcoalGrey"
            borderBottom="0.5px solid"
            borderBottomColor="veryLightPink"
          >
            Kategori
          </DrawerHeader>
          <DrawerBody px={6} pt={4} pb={10}>
            <VStack
              width="full"
              align="flex-start"
              divider={
                <Divider border="0.5px solid" borderColor="veryLightPink" />
              }
            >
              {props.options.map((option) => (
                <Box
                  width="full"
                  cursor="pointer"
                  fontSize="sm"
                  color={
                    props.selectedValue == option.value
                      ? "main.500"
                      : "charcoalGrey"
                  }
                  key={option.value}
                  onClick={() => {
                    if (props.onChange) {
                      props.onChange(option);
                      props.onCloseOptions();
                    }
                  }}
                >
                  {option.name}
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function ForumCategoryInputMobileSkeleton(props: {
  isFullWidth?: boolean;
}) {
  return (
    <Skeleton
      width={props.isFullWidth ? "full" : "199px"}
      height="32px"
      borderRadius="base"
    />
  );
}
