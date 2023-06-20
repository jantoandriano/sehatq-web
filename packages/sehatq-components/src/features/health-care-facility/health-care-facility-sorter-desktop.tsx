import { URLS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Button,
  ChevronDownIcon,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "../../user-interfaces";

export type HealthCareFacilitySorterDesktopProps = {
  selectedValue: string;
  options: {
    id: string;
    name: string;
  }[];
  selectedName: string;
  navigateName?: keyof typeof URLS;
};

type SorterItemsProps = {
  sorterItems: { value: string; name: string }[];
  selectedValue: string;
  navigateName?: keyof typeof URLS;
};

function SorterItem(props: SorterItemsProps) {
  const { sorterItems, selectedValue } = props;
  const { navigate } = useNavigation();
  return (
    <>
      {sorterItems.map((sorter) => (
        <MenuItem
          color={selectedValue == sorter.value ? "sea.500" : "charcoalGrey"}
          key={sorter.value}
          fontSize="sm"
          minH="48px"
          onClick={() => {
            navigate(
              props.navigateName ?? "HEALTH_CARE_FACILITIES",
              (oldQuery) => ({
                ...oldQuery,
                sort: sorter.value,
                page: "1",
              })
              // { shallow: true, scroll: true }
            );
          }}
        >
          {sorter.name}
        </MenuItem>
      ))}
    </>
  );
}
export function HealthCareFacilitySorterDesktop(
  props: HealthCareFacilitySorterDesktopProps
) {
  const { selectedValue, options, selectedName } = props;
  return (
    <Box fontFamily="openSans" fontSize="sm" fontWeight="semibold">
      Urutkan{" "}
      <Menu>
        <MenuButton
          as={Button}
          variant="outline"
          colorScheme="brownGrey"
          color="charcoalGrey"
          borderColor="brownGrey.500"
          width="270px"
          height="36px"
          _hover={{
            background: "none",
          }}
          _active={{
            background: "none",
          }}
          rightIcon={<ChevronDownIcon color="charcoalGrey" />}
          textAlign="justify"
          fontWeight="normal"
          marginLeft={3}
          fontFamily="openSans"
          fontSize="sm"
        >
          {selectedName}
        </MenuButton>
        <MenuList height="auto" overflow="auto" zIndex="popover">
          <SorterItem
            navigateName={props.navigateName}
            selectedValue={selectedValue}
            sorterItems={options.map((sorter) => {
              return {
                value: sorter.id,
                name: sorter.name,
              };
            })}
          />
        </MenuList>
      </Menu>
    </Box>
  );
}

export function HealthCareFacilitySorterDesktopSkeleton() {
  return (
    <Flex align="center" flexDirection="row" justify="flex-start">
      <Skeleton width={70} height={5} />
      <Skeleton marginLeft={3} width={270} height={10} borderRadius="md" />
    </Flex>
  );
}
