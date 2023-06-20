import React from "react";
import { Virtuoso } from "react-virtuoso";
import {
  Box,
  HStack,
  Text,
  ArrowBackIcon,
  Button,
  ChevronRightIcon,
  TickIcon,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  CloseIcon,
  SearchIcon,
  Modal,
  ModalContent,
  ModalBody,
  IconButton,
  Skeleton,
  useImage,
  Checkbox,
  Flex,
} from "../../user-interfaces";
import { generateMultipleValues } from "./filter-list-view-desktop";

type OptionFilterMobile = {
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
  options: OptionFilterMobile[];
  onSelectValue: (value: string) => void;
  isLoading?: boolean;
  isMultiple?: boolean;
};

export type FilterListViewMobileProps =
  | (GeneralProps & { showSearch?: false })
  | (GeneralProps & { showSearch: true } & GenerateSearchFilterProps);

type GenerateSearchFilterProps = {
  filterName: string;
  searchValue: string;
  clearInputSearch: () => void;
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
};

function GenerateSearchFilter(props: GenerateSearchFilterProps) {
  const { searchValue, onChangeSearchValue, clearInputSearch, filterName } =
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

export function FilterListViewMobile(props: FilterListViewMobileProps) {
  const {
    filterName,
    filterKey,
    showSearch,
    showOptions,
    onShowOptions,
    onSelectValue,
    selectedValue,
    options,
    selectedName,
    isLoading,
    isMultiple,
  } = props;
  const Image = useImage();
  function renderOption(option: OptionFilterMobile) {
    const selectedValues = isMultiple
      ? selectedValue.split(",")
      : [selectedValue];
    const selected = selectedValues.findIndex((f) => f == option.value) >= 0;
    let value = option.value;
    if (isMultiple) {
      value = generateMultipleValues(selectedValues, option.value, selected);
    }
    return (
      <Button
        key={option.value}
        isFullWidth
        whiteSpace="normal"
        wordWrap="break-word"
        textAlign="left"
        justifyContent="space-between"
        variant="fit"
        onClick={() => onSelectValue(value)}
        color={selected ? "sea.500" : "#4d555b"}
        fontWeight={selected ? "semibold" : "normal"}
        fontSize="xs"
        rightIcon={
          selected && !isMultiple ? <TickIcon boxSize="16px" /> : undefined
        }
        mb={1}
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
      </Button>
    );
  }
  return (
    <>
      <Button
        key={filterKey}
        isFullWidth
        variant="fit"
        fontSize="xs"
        onClick={onShowOptions}
        justifyContent="space-between"
        color="charcoalGrey"
        fontWeight="semibold"
        rightIcon={<ChevronRightIcon color="charcoalGrey" boxSize="16px" />}
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
      <Text
        width="full"
        noOfLines={1}
        ml={1}
        color="brownGrey.500"
        fontSize="xxs"
      >
        {props.description}
      </Text>
      <Modal isOpen={showOptions} onClose={onShowOptions} size="full">
        <ModalContent borderRadius="none">
          <HStack padding={2} align="center" width="full" height="56px">
            <IconButton
              variant="fit"
              aria-label="back"
              onClick={onShowOptions}
              icon={
                <ArrowBackIcon width="28px" height="28px" color="sea.500" />
              }
            />
            <Text fontWeight="semibold" fontFamily="poppins">
              {filterName}
            </Text>
          </HStack>
          <ModalBody paddingX={4} paddingTop={0}>
            {showSearch ? (
              <GenerateSearchFilter
                filterName={filterName}
                searchValue={props.searchValue}
                clearInputSearch={props.clearInputSearch}
                onChangeSearchValue={props.onChangeSearchValue}
              />
            ) : null}
            {isLoading ? (
              <Skeleton width="95%" height={4} m={2} />
            ) : options.length > 20 ? (
              <Virtuoso
                style={{
                  height: "calc(100vh - 116px)",
                  width: "100%",
                  marginTop: showSearch ? "8px" : 0,
                }}
                data={options}
                itemContent={(index, data) => renderOption(data)}
              />
            ) : options.length > 0 ? (
              <Box maxH="calc(100vh - 116px)" marginTop={showSearch ? 2 : 0}>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
