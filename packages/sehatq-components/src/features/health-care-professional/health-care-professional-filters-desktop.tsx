import { Query } from "@sehatq/types";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Divider,
  HStack,
  VStack,
  Text,
  Link,
  Skeleton,
} from "../../user-interfaces";
import { FilterListView } from "../general";
import { generateFilters } from "./health-care-professional-filters-helpers";

export type HealthCareProfessionalFiltersDesktopProps = {
  filters: ReturnType<typeof generateFilters>;
  generateQuery?: (queries: Record<string, string | string[]>) => Query;
};

export function HealthCareProfessionalFiltersDesktop(
  props: HealthCareProfessionalFiltersDesktopProps
) {
  const { filters, generateQuery } = props;
  const { Navigate } = useNavigation();
  return (
    <VStack
      justify="space-between"
      divider={<Divider borderColor="veryLightPink" border="solid 0.5px" />}
      borderRadius="xl"
      background="white"
      py={3}
      px={5}
      shadow="base"
    >
      <HStack justify="space-between" width="full">
        <Text
          fontSize="sm"
          color="#36454f"
          fontWeight="semibold"
          fontFamily="openSans"
        >
          Filter
        </Text>
        <Navigate name="HEALTH_CARE_PROFESIONAL" options={{ shallow: true }}>
          <Link variant="fit" color="charcoalGrey" fontSize="xs">
            Reset
          </Link>
        </Navigate>
      </HStack>
      {filters.map((filter) => (
        <Box key={filter.filterKey} width="full">
          <FilterListView
            filterKey={filter.filterKey}
            filterName={filter.filterName}
            isMobile={false}
            options={filter.options}
            selectedName={filter.selectedName}
            selectedValue={filter.selectedValue}
            showSearch={filter.showSearch}
            navigateName="HEALTH_CARE_PROFESIONAL"
            isResetQuery={filter.isResetQuery}
            defaultCollaps={true}
            generateQuery={generateQuery}
            isLoading={filter.isLoading}
          />
        </Box>
      ))}
    </VStack>
  );
}

export function HealthCareProfessionalFiltersDesktopSkeleton() {
  return (
    <VStack
      justify="space-between"
      divider={<Divider borderColor="veryLightPink" border="solid 0.5px" />}
      borderRadius="xl"
      background="white"
      py={3}
      px={5}
    >
      <HStack justify="space-between" width="full">
        <Skeleton width={50} height={5} />
        <Skeleton width={50} height={5} />
      </HStack>
      <HStack justify="space-between" width="full">
        <Skeleton width={100} height={5} />
        <Skeleton width={90} height={5} />
      </HStack>
      <HStack justify="space-between" width="full">
        <Skeleton width={100} height={5} />
        <Skeleton width={90} height={5} />
      </HStack>
      <HStack justify="space-between" width="full">
        <Skeleton width={100} height={5} />
        <Skeleton width={90} height={5} />
      </HStack>
      <HStack justify="space-between" width="full">
        <Skeleton width={100} height={5} />
        <Skeleton width={90} height={5} />
      </HStack>
    </VStack>
  );
}
