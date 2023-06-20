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
  generateDoctorsQueryParams,
  generateFilters,
} from "./telemedicine-hcp-filter-helpers";

export type TelemedicineHCPFilterDesktopProps = {
  filters: ReturnType<typeof generateFilters>;
  navigateName?: keyof typeof URLS;
  resetQuery?: Record<string, string>;
};

export function TelemedicineHCPFilterDesktop(
  props: TelemedicineHCPFilterDesktopProps
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
          name={props.navigateName ?? "TELEMED_HCPS"}
          options={{ shallow: true }}
          query={props.resetQuery}
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
            navigateName={props.navigateName ?? "TELEMED_HCPS"}
            defaultCollaps={true}
            generateQuery={generateDoctorsQueryParams}
            isLoading={filter.isLoading}
          />
        </Box>
      ))}
    </VStack>
  );
}
