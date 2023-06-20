import React from "react";
import {
  Button,
  ChevronDownIcon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "../../user-interfaces";

export type ForumCategoryInputDesktopProps = {
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
  maxHeightOptions?: string;
};

export function ForumCategoryInputDesktop(
  props: ForumCategoryInputDesktopProps
) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        colorScheme="unstyle"
        color={props.selectedName ? "charcoalGrey" : "veryLightPink"}
        border="0.5px solid"
        borderRadius="base"
        borderColor={
          props.isRequired && !props.selectedValue ? "red.500" : "veryLightPink"
        }
        width={props.isFullWidth ? "full" : "max-content"}
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
        textAlign="justify"
        fontWeight="normal"
        fontFamily="openSans"
        fontSize="md"
      >
        {props.selectedName ?? props.placeholder}
      </MenuButton>
      <MenuList
        height="auto"
        overflow="auto"
        maxHeight={props.maxHeightOptions}
      >
        {props.options.map((option) => (
          <MenuItem
            color={
              props.selectedValue == option.value ? "sea.500" : "charcoalGrey"
            }
            key={option.value}
            fontSize="md"
            onClick={() => {
              if (props.onChange) {
                props.onChange(option);
              }
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export function ForumCategoryInputDesktopSkeleton(props: {
  isFullWidth?: boolean;
}) {
  return (
    <Skeleton
      width={props.isFullWidth ? "full" : "221px"}
      height="40px"
      borderRadius="base"
    />
  );
}
