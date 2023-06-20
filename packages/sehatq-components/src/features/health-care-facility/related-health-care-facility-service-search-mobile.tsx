import React from "react";

import { useNavigation } from "@sehatq/utils";
import { Virtuoso } from "react-virtuoso";
import {
  Box,
  Button,
  ChevronDownIcon,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Text,
  VStack,
  TickIcon,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  Skeleton,
} from "../../user-interfaces";
import { GenerateSearchFilter } from "../general/filter-list-view-desktop";
import { RelatedHealthCareFacilityServiceSearchGeneralProps } from "./related-health-care-facility-service-search-desktop";

export type RelatedHealthCareFacilityServiceSearchMobileProps =
  RelatedHealthCareFacilityServiceSearchGeneralProps;

function GenerateOptions(props: {
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
  clearInputSearch: () => void;
  filterName: string;
  options: { value: string; label: string; desc?: string }[];
  selectedValue: string;
  searchValue: string;
  onSelectOptions: (
    selectedValue: { value: string; label: string } | undefined
  ) => void;
}) {
  const options = props.searchValue
    ? props.options.filter((option) =>
        option.label.toLowerCase().includes(props.searchValue.toLowerCase())
      )
    : props.options;

  function renderOption(
    index: number,
    data: { value: string; label: string; desc?: string }
  ) {
    return (
      <Flex px={3} direction="column" _hover={{ background: "veryLightPink" }}>
        <Button
          py={3}
          key={data.value}
          isFullWidth
          whiteSpace="normal"
          wordWrap="break-word"
          textAlign="left"
          justifyContent="space-between"
          variant="link"
          _hover={{ border: "none" }}
          onClick={() =>
            props.onSelectOptions(
              props.selectedValue == data.value ? undefined : data
            )
          }
          color={props.selectedValue == data.value ? "sea.500" : "#4d555b"}
          fontWeight="semibold"
          fontSize="xs"
          rightIcon={
            props.selectedValue == data.value ? (
              <TickIcon boxSize="16px" />
            ) : undefined
          }
        >
          <Flex direction="column">
            <Text color="charcoalGrey" fontWeight="semibold" fontSize="xs">
              {data.label}
            </Text>
            {data.desc ? (
              <Text fontSize="sm" fontWeight="semibold" color="sea.500">
                {data.desc}
              </Text>
            ) : null}
          </Flex>
        </Button>
        {index < options.length - 1 && <Divider borderColor="veryLightPink" />}
      </Flex>
    );
  }
  return (
    <VStack width="full">
      <Box px={3} width="full">
        <GenerateSearchFilter
          clearInputSearch={props.clearInputSearch}
          filterName={props.filterName}
          onChangeSearchValue={props.onChangeSearchValue}
          searchValue={props.searchValue}
        />
      </Box>

      {options.length > 8 ? (
        <Virtuoso
          style={{ height: "200px", width: "100%" }}
          data={options}
          itemContent={(index, data) => renderOption(index, data)}
        />
      ) : options.length > 0 ? (
        <Box maxH="200px" width="100%">
          {options.map((data, index) => renderOption(index, data))}
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
    </VStack>
  );
}

function ServicesDropdown(props: {
  selectedOption: { value: string; label: string } | undefined;
  showOptions: boolean;
  onShowHideOptions: () => void;
  inputName: string;
  options: { value: string; label: string; desc?: string }[];
  onSelectOptions: (
    selectedValue: { value: string; label: string } | undefined
  ) => void;
  disabled?: boolean;
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
  clearInputSearch: () => void;
  searchValue: string;
}) {
  return (
    <>
      <FormControl variant="floating">
        <Button
          disabled={props.disabled}
          variant="outline"
          colorScheme="whiteAlpha"
          borderRadius="base"
          height="40px"
          width="full"
          borderColor="veryLightPink"
          textAlign="left"
          background="white"
          _hover={{
            borderColor: "main.500",
          }}
          rightIcon={<ChevronDownIcon color="brownGrey.500" />}
          {...(props.selectedOption
            ? {
                value: props.selectedOption.value,
              }
            : null)}
          justifyContent="space-between"
          onClick={props.onShowHideOptions}
        >
          <Text
            fontWeight="normal"
            fontSize="sm"
            color={!props.selectedOption ? "veryLightPink" : "charcoalGrey"}
            noOfLines={1}
          >
            {props.selectedOption?.label ?? props.inputName}
          </Text>
        </Button>

        <FormLabel>
          {props.selectedOption ? props.inputName : `Pilih ${props.inputName}`}
        </FormLabel>
      </FormControl>
      <Drawer
        placement="bottom"
        onClose={props.onShowHideOptions}
        isOpen={props.showOptions}
      >
        <DrawerOverlay zIndex="modal" />
        <DrawerContent zIndex="popover" borderTopRadius="lg">
          <DrawerHeader px={3} pb={1}>
            <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
              {props.inputName}
            </Text>
          </DrawerHeader>
          <DrawerBody px={0}>
            <GenerateOptions
              onSelectOptions={props.onSelectOptions}
              clearInputSearch={props.clearInputSearch}
              onChangeSearchValue={props.onChangeSearchValue}
              filterName={props.inputName}
              options={props.options}
              searchValue={props.searchValue}
              selectedValue={props.selectedOption?.value ?? ""}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export function RelatedHealthCareFacilityServiceSearchMobile(
  props: RelatedHealthCareFacilityServiceSearchMobileProps
) {
  const { Navigate } = useNavigation();
  const { values, onChangeInput } = props;
  return (
    <VStack spacing={4} align="start">
      <Text
        fontSize="sm"
        color="charcoalGrey"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Cari Layanan Pemeriksaan
      </Text>
      <ServicesDropdown
        inputName="Layanan Pemeriksaan"
        onShowHideOptions={props.onShowHideServices}
        options={props.services}
        selectedOption={values?.service}
        showOptions={props.showServices}
        onSelectOptions={(value) => onChangeInput("service", value)}
        searchValue={props.searchValue}
        clearInputSearch={props.clearInputSearch}
        onChangeSearchValue={props.onChangeSearchValue}
      />
      {!props.showServices && (
        <ServicesDropdown
          disabled={!values?.service}
          inputName="Paket Pemeriksaan"
          onShowHideOptions={props.onShowHidePackages}
          options={props.packages}
          selectedOption={values?.package}
          showOptions={props.showPackages}
          onSelectOptions={(value) => onChangeInput("package", value)}
          searchValue={props.searchValue}
          clearInputSearch={props.clearInputSearch}
          onChangeSearchValue={props.onChangeSearchValue}
        />
      )}
      {!props.showServices && !props.showPackages ? (
        <>
          <Navigate
            name="HEALTH_SERVICE"
            query={{
              hcfSlug: props.hcfSlug,
              ...(values?.service
                ? { procedure: values?.service.value }
                : null),
              ...(values?.package ? { paket: values?.package.value } : null),
            }}
          >
            <Link
              variant="solid"
              background="main.500"
              fontSize="sm"
              fontWeight="semibold"
              width="full"
              borderRadius="base"
            >
              Cari Layanan
            </Link>
          </Navigate>
          <Navigate name="HEALTH_SERVICE" query={{ hcfSlug: props.hcfSlug }}>
            <Link
              color="sea.500"
              fontSize="sm"
              fontWeight="semibold"
              width="full"
              borderRadius="base"
            >
              Cari Semua Layanan Pemeriksaan
            </Link>
          </Navigate>
        </>
      ) : null}
    </VStack>
  );
}

export function RelatedHealthCareFacilityServiceSearchMobileSkeleton() {
  return (
    <VStack spacing={4} align="start">
      <Text
        fontSize="sm"
        color="charcoalGrey"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Cari Layanan Pemeriksaan
      </Text>
      <Skeleton width="full" borderRadius="base" height="40px" />
      <Skeleton width="full" borderRadius="base" height="40px" />
      <Skeleton width="full" borderRadius="base" height="40px" />
      <Skeleton width="full" borderRadius="base" height="40px" />
    </VStack>
  );
}
