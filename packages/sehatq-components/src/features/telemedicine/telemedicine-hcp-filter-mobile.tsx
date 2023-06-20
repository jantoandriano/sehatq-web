import React from "react";
import { useNavigation } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import {
  Button,
  VStack,
  HStack,
  Flex,
  Text,
  Link,
  ArrowBackIcon,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  IconButton,
  ForumCategoryIcon,
} from "../../user-interfaces";
import { FilterListView } from "../general";
import {
  generateFilters,
  FilterKeys,
  generateDoctorsQueryParams,
} from "./telemedicine-hcp-filter-helpers";

export type TelemedicineHCPFilterMobileProps = {
  filters: ReturnType<typeof generateFilters>;
  tempSelectedFilters: Record<string, number | string | string[]> | undefined;
  onSelectFilter: (filterKey: FilterKeys, filterValue: string) => void;
  showFilter: boolean;
  onClickFilterIcon: () => void;
  filterCount: number;
  navigateName?: keyof typeof URLS;
  resetQuery?: Record<string, string>;
};

export function TelemedicineHCPFilterMobile(
  props: TelemedicineHCPFilterMobileProps
) {
  const {
    filters,
    tempSelectedFilters,
    onSelectFilter,
    showFilter,
    onClickFilterIcon,
    filterCount,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      <Button
        background="white"
        border="solid 0.5px"
        borderColor="veryLightPink"
        borderRadius="2xl"
        width="76px"
        height="26px"
        variant="fit"
        cursor="pointer"
        onClick={onClickFilterIcon}
        leftIcon={
          filterCount ? (
            <Text
              borderRadius="full"
              background="indicator.red"
              boxSize="16px"
              fontSize="xxs"
              textAlign="center"
              align="center"
              color="white"
            >
              {filterCount}
            </Text>
          ) : (
            <ForumCategoryIcon />
          )
        }
        color="charcoalGrey"
        fontSize="xs"
        fontWeight="semibold"
      >
        Filter
      </Button>
      <Modal size="full" isOpen={showFilter} onClose={onClickFilterIcon}>
        <ModalOverlay />
        <ModalContent borderRadius="none">
          <Flex
            padding={2}
            align="center"
            justify="space-between"
            width="full"
            height="56px"
          >
            <HStack>
              <IconButton
                variant="fit"
                aria-label="back"
                onClick={onClickFilterIcon}
                icon={
                  <ArrowBackIcon width="28px" height="28px" color="sea.500" />
                }
              />
              <Text fontWeight="semibold" fontFamily="poppins">
                Filter
              </Text>
            </HStack>
            <Navigate
              name={props.navigateName ?? "TELEMED_HCPS"}
              options={{ shallow: true }}
              query={props.resetQuery}
            >
              <Link
                variant="fit"
                color="charcoalGrey"
                fontSize="xs"
                onClick={onClickFilterIcon}
              >
                Reset
              </Link>
            </Navigate>
          </Flex>
          <ModalBody paddingX={4} paddingTop={0}>
            <VStack
              divider={
                <Divider borderColor="veryLightPink" border="solid 0.5px" />
              }
            >
              {filters.map((filter) => (
                <FilterListView
                  key={filter.filterKey}
                  filterKey={filter.filterKey}
                  filterName={filter.filterName}
                  isMobile={true}
                  options={filter.options}
                  selectedName={filter.selectedName}
                  selectedValue={filter.selectedValue}
                  showSearch={filter.showSearch}
                  onSelectedValueChange={(newValue) =>
                    onSelectFilter(filter.filterKey, newValue)
                  }
                  isLoading={filter.isLoading}
                />
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter paddingX={4}>
            <Navigate
              name={props.navigateName ?? "TELEMED_HCPS"}
              query={(oldQuery) => ({
                ...oldQuery,
                ...generateDoctorsQueryParams({
                  ...filters.reduce((prevSelectedFilter, filter) => {
                    if (tempSelectedFilters?.[filter.filterKey]) {
                      return {
                        ...prevSelectedFilter,
                        [filter.filterKey]:
                          tempSelectedFilters[filter.filterKey],
                      };
                    }
                    return prevSelectedFilter;
                  }, {}),
                  page: "1",
                }),
              })}
              options={{ shallow: true, scroll: true }}
            >
              <Link
                onClick={onClickFilterIcon}
                variant="solid"
                colorScheme="main"
                width="100%"
              >
                Terapkan
              </Link>
            </Navigate>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
