import { URLS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Divider,
  HStack,
  VStack,
  Text,
  Link,
} from "../../user-interfaces";
import { FilterListView } from "../general";
import {
  generateTelemedicineFilterQueryParams,
  generateFilters,
} from "./telemedicine-filter-helpers";

export type TelemedicineFilterDesktopProps = {
  filters: ReturnType<typeof generateFilters>;
  resetQuery?: Record<string, string>;
  navigateName: keyof typeof URLS;
};

export function TelemedicineFilterDesktop(
  props: TelemedicineFilterDesktopProps
) {
  const { filters } = props;
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
        <Navigate
          name={props.navigateName}
          query={props.resetQuery}
          options={{ shallow: true }}
        >
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
            navigateName={props.navigateName}
            defaultCollaps={true}
            generateQuery={generateTelemedicineFilterQueryParams}
            isLoading={filter.isLoading}
          />
        </Box>
      ))}
    </VStack>
  );
}
