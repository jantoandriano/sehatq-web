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
  FilterIcon,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  IconButton,
} from "../../user-interfaces";
import { FilterListView } from "../general";
import {
  generateFilters,
  generateHCPQueryParams,
  FilterKeys,
} from "./health-care-professional-filters-helpers";

export type HealthCareProfessionalFiltersMobileProps = {
  filters: ReturnType<typeof generateFilters>;
  tempSelectedFilters: Record<string, number | string | string[]> | undefined;
  onSelectFilter: (filterKey: FilterKeys, filterValue: string) => void;
  showFilter: boolean;
  onClickFilterIcon: () => void;
  hcpSlugs: {
    specialitySlug: string;
    citySlug: string;
    procedureId: string;
  };
};

export function HealthCareProfessionalFiltersMobile(
  props: HealthCareProfessionalFiltersMobileProps
) {
  const {
    filters,
    tempSelectedFilters,
    onSelectFilter,
    showFilter,
    onClickFilterIcon,
    hcpSlugs,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      <Button
        variant="fit"
        cursor="pointer"
        onClick={onClickFilterIcon}
        leftIcon={<FilterIcon />}
        color="charcoalGrey"
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
              name="HEALTH_CARE_PROFESIONAL"
              options={{ shallow: true }}
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
              name="HEALTH_CARE_PROFESIONAL"
              query={(oldQuery) => ({
                ...oldQuery,
                ...generateHCPQueryParams(
                  {
                    ...filters.reduce((prevSelectedFilter, filter) => {
                      return {
                        ...prevSelectedFilter,
                        [filter.filterKey]:
                          tempSelectedFilters?.[filter.filterKey],
                      };
                    }, {}),
                  },
                  hcpSlugs
                ),
                page: "1",
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

export function HealthCareProfessionalFiltersMobileSkeleton() {
  return <Skeleton width={90} height={5} />;
}
