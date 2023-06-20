import React from "react";
import { useNavigation } from "@sehatq/utils";
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
  MenuDivider,
} from "../../user-interfaces";
import { FilterOptionsSort } from "./forums-models";

export type ForumsSorterDesktopProps = {
  selectedValue: string;
  options: FilterOptionsSort[];
  selectedName: string;
};

type SorterItemsProps = {
  sorterItems: { value: string; name: string }[];
  selectedValue: string;
};

function SorterItem(props: SorterItemsProps) {
  const { sorterItems, selectedValue } = props;
  const { navigate } = useNavigation();
  return (
    <>
      {sorterItems.map((sorter, key) => (
        <Box key={sorter.value}>
          <MenuItem
            color={selectedValue == sorter.value ? "sea.500" : "charcoalGrey"}
            key={sorter.value}
            fontSize="sm"
            minH="48px"
            {...(selectedValue == sorter.value && {
              fontWeight: "semibold",
            })}
            onClick={() => {
              navigate(
                "FORUM",
                (oldQuery) => ({
                  ...oldQuery,
                  sort: sorter.value,
                  page: "1",
                }),
                { shallow: true, scroll: true }
              );
            }}
          >
            {sorter.name}
          </MenuItem>
          {key < sorterItems.length - 1 && (
            <MenuDivider
              borderColor="veryLightPink"
              border="solid 0.5px"
              my={0}
              mx={3}
            />
          )}
        </Box>
      ))}
    </>
  );
}
export function ForumsSorterDesktop(props: ForumsSorterDesktopProps) {
  const { selectedValue, options, selectedName } = props;
  return (
    <Box
      fontFamily="openSans"
      fontSize="sm"
      fontWeight="semibold"
      position="relative"
    >
      Urutkan{" "}
      <Menu>
        <MenuButton
          as={Button}
          variant="outline"
          colorScheme="brownGrey"
          color="charcoalGrey"
          borderColor="brownGrey.500"
          width="228px"
          height="40px"
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
        <MenuList zIndex="popover" height="auto" overflow="auto" p={0}>
          <SorterItem
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

export function ForumsSorterDesktopSkeleton() {
  return (
    <Flex align="center" flexDirection="row" justify="flex-start">
      <Skeleton width={70} height={5} />
      <Skeleton marginLeft={3} width={270} height={10} borderRadius="md" />
    </Flex>
  );
}
