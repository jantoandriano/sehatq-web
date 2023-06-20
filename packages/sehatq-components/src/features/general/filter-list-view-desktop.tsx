import React from "react";
import { Virtuoso } from "react-virtuoso";
import { useNavigation } from "@sehatq/utils";
import { Query } from "@sehatq/types";
import { URLS } from "@sehatq/constants";
import {
  Text,
  VStack,
  Divider,
  ChevronUpIcon,
  ChevronDownIcon,
  Button,
  Box,
  TickIcon,
  InputGroup,
  InputLeftElement,
  SearchIcon,
  Input,
  InputRightElement,
  CloseIcon,
  Link,
  IconButton,
  Skeleton,
  useImage,
  HStack,
  Checkbox,
  Flex,
} from "../../user-interfaces";

type OptionFilterDesktop = {
  value: string;
  name: string;
  iconUrl?: string;
};

type GeneralProps = {
  filterKey: string;
  filterName: string;
  selectedName: string;
  description?: string;
  selectedValue: string;
  showOptions: boolean;
  onShowOptions: () => void;
  options: OptionFilterDesktop[];
  navigateName: keyof typeof URLS;
  isResetQuery?: boolean;
  generateQuery?: (queries: Record<string, string | string[]>) => Query;
  isLoading?: boolean;
  isMultiple?: boolean;
};

export type FilterListViewDesktopProps =
  | (GeneralProps & { showSearch?: false })
  | (GeneralProps & { showSearch: true } & GenerateSearchFilterProps);

export type GenerateSearchFilterProps = {
  filterName: string;
  searchValue: string;
  clearInputSearch: () => void;
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
};

export function GenerateSearchFilter(props: GenerateSearchFilterProps) {
  const { searchValue, filterName, onChangeSearchValue, clearInputSearch } =
    props;

  return (
    <InputGroup background="white" borderRadius="xl" boxShadow="lg">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="sea.500" />
      </InputLeftElement>
      <Input
        px={10}
        value={searchValue}
        placeholder={`Cari ${filterName}`}
        fontSize="xs"
        autoComplete="off"
        focusBorderColor="sea.500"
        borderColor="gray.500"
        onChange={onChangeSearchValue}
        _placeholder={{ color: "brownGrey.500", fontSize: "xs" }}
      />
      {searchValue ? (
        <InputRightElement pointerEvents="stroke">
          <IconButton
            variant="fit"
            aria-label="clear"
            onClick={clearInputSearch}
            icon={<CloseIcon w="3" h="3" color="gray" />}
          />
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
}

export function generateMultipleValues(
  selectedValues: string[],
  value: string,
  isSelected: boolean
) {
  if (isSelected) {
    return selectedValues.filter((f) => f !== value && f != "").join(",");
  } else {
    return [...selectedValues, value].filter((f) => f != "").join(",");
  }
}

export function FilterListViewDesktop(props: FilterListViewDesktopProps) {
  const {
    filterKey,
    filterName,
    selectedValue,
    selectedName,
    showSearch,
    showOptions,
    onShowOptions,
    isResetQuery,
    options,
    navigateName,
    generateQuery,
    isLoading,
    isMultiple,
  } = props;

  const { Navigate } = useNavigation();
  const Image = useImage();

  function renderOption(option: OptionFilterDesktop) {
    const selectedValues = isMultiple
      ? selectedValue.split(",")
      : [selectedValue];
    const selected = selectedValues.findIndex((f) => f == option.value) >= 0;

    return (
      <Navigate
        key={option.value}
        name={navigateName}
        options={{ shallow: true, scroll: true }}
        query={(oldQuery) => {
          const currentQuery = isResetQuery ? undefined : oldQuery;
          let value = selected ? "" : `${option.value}`;
          if (isMultiple) {
            value = generateMultipleValues(
              selectedValues,
              option.value,
              selected
            );
          }
          const newValues = {
            ...(currentQuery as Record<string, string | string[]>),
            [filterKey]: value,
          };
          return {
            ...(generateQuery ? generateQuery(newValues) : newValues),
          };
        }}
      >
        <Link
          width="full"
          variant="fit"
          fontSize="xs"
          justifyContent="space-between"
          color={selected ? "sea.500" : "charcoalGrey"}
          fontWeight={selected ? "semibold" : "normal"}
          _focus={{ border: "none", color: "sea.500" }}
        >
          <Flex direction="row">
            {isMultiple ? (
              <Checkbox
                mr={3}
                border="0.5px solid"
                borderColor="brownGrey.500"
                borderRadius="base"
                isChecked={selected}
                colorScheme="main"
              />
            ) : null}
            {option.iconUrl ? (
              <HStack spacing={2}>
                <Image
                  layout="fixed"
                  width={16}
                  height={16}
                  src={option.iconUrl}
                  alt={option.name}
                />
                <Text as="span">{option.name}</Text>
              </HStack>
            ) : (
              option.name
            )}
          </Flex>
          {selected && !isMultiple && <TickIcon boxSize="16px" />}
        </Link>
      </Navigate>
    );
  }
  return (
    <VStack
      justify="space-between"
      divider={<Divider borderColor="veryLightPink" border="solid 0.5px" />}
      borderRadius="xl"
    >
      <Flex direction="column" width="full">
        <Button
          key={filterKey}
          isFullWidth
          variant="fit"
          fontSize="xs"
          onClick={onShowOptions}
          justifyContent="space-between"
          color="charcoalGrey"
          fontWeight="semibold"
          rightIcon={
            showOptions ? (
              <ChevronUpIcon color="charcoalGrey" boxSize="12px" />
            ) : (
              <ChevronDownIcon color="charcoalGrey" boxSize="12px" />
            )
          }
        >
          {filterName}
          {selectedName ? (
            <Text
              flex="1"
              as="span"
              color="sea.500"
              marginLeft={2}
              textAlign="right"
              isTruncated
            >
              {selectedName}
            </Text>
          ) : null}
        </Button>
        {props.description ? (
          <Text noOfLines={1} ml={1} color="brownGrey.500" fontSize="xxs">
            {props.description}
          </Text>
        ) : null}
      </Flex>
      {showOptions && !isLoading ? (
        <VStack width="full">
          {showSearch && (
            <GenerateSearchFilter
              filterName={filterName}
              searchValue={props.searchValue}
              clearInputSearch={props.clearInputSearch}
              onChangeSearchValue={props.onChangeSearchValue}
            />
          )}
          <>
            {options.length > 8 ? (
              <Virtuoso
                style={{ height: "200px", width: "100%" }}
                data={options}
                itemContent={(index, data) => renderOption(data)}
              />
            ) : options.length > 0 ? (
              <Box maxH="200px" width="100%">
                {options.map(renderOption)}
              </Box>
            ) : (
              <Text
                textAlign="center"
                fontSize="xs"
                fontWeight="semibold"
                fontStyle="italic"
                m={2}
              >
                Hasil pencarian tidak ditemukan
              </Text>
            )}
          </>
        </VStack>
      ) : null}
      {isLoading ? <Skeleton width="full" height={4} /> : null}
    </VStack>
  );
}
