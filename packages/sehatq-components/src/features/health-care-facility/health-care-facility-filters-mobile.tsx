import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Button,
  VStack,
  HStack,
  Flex,
  Text,
  Link,
  ArrowBackIcon,
  Divider,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  IconButton,
  FilterIcon2,
} from "../../user-interfaces";
import { FilterListView } from "../general";
import {
  generateFilters,
  generateHCFQueryParams,
  FilterKeys,
} from "./health-care-facility-filters-helpers";

export type HealthCareFacilityFiltersMobileProps = {
  filters: ReturnType<typeof generateFilters>;
  tempSelectedFilters: Record<string, number | string | string[]> | undefined;
  onSelectFilter: (filterKey: FilterKeys, filterValue: string) => void;
  showFilter: boolean;
  onClickFilterIcon: () => void;
  hcfSlugs: Record<string, string>;
};

export function HealthCareFacilityFiltersMobile(
  props: HealthCareFacilityFiltersMobileProps
) {
  const {
    filters,
    tempSelectedFilters,
    onSelectFilter,
    showFilter,
    onClickFilterIcon,
    hcfSlugs,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      <Button
        variant="fit"
        cursor="pointer"
        onClick={onClickFilterIcon}
        leftIcon={<FilterIcon2 />}
        color="charcoalGrey"
        fontSize="xs"
        fontFamily="poppins"
        fontWeight="medium"
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
            <Navigate name="HEALTH_CARE_FACILITIES" options={{ shallow: true }}>
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
                  isMultiple={filter.isMultiple}
                />
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter paddingX={4}>
            <Navigate
              name="HEALTH_CARE_FACILITIES"
              query={(oldQuery) => ({
                ...generateHCFQueryParams(
                  {
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
                    sort: oldQuery ? (oldQuery.sort as string) : "",
                  },
                  hcfSlugs
                ),
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

export function HealthCareFacilityFiltersMobileSkeleton() {
  return <Skeleton width={90} height={5} />;
}
