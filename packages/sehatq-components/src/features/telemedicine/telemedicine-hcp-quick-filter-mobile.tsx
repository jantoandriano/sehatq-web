import { URLS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";

import { Box, Link } from "../../user-interfaces";
import { getQuickFilterKey } from "./telemedicine-hcp-filter-helpers";

export type TelemedicineHCPQuickFilterMobileProps = {
  filterOptions: { id: string; name: string; param: string }[];
  filterActive: string[];
  navigateName?: keyof typeof URLS;
};

export function TelemedicineHCPQuickFilterMobile(
  props: TelemedicineHCPQuickFilterMobileProps
) {
  const { filterOptions, filterActive } = props;
  const { Navigate } = useNavigation();

  return (
    <>
      {filterOptions.map((options) => (
        <Box key={options.id} p={2} minW="fit-content">
          <Navigate
            name={props.navigateName ?? "TELEMED_HCPS"}
            query={(oldQuery) => {
              const key = getQuickFilterKey(options.param);
              const newQuery = {
                ...oldQuery,
                [key]: key == "slugs" ? [options.id] : options.id,
                page: "1",
              };

              if (filterActive.includes(options.id)) {
                delete newQuery?.[key];
              }

              return newQuery;
            }}
            options={{ shallow: true, scroll: true }}
          >
            <Link
              variant="chip"
              colorScheme="paleBlue"
              size="sm"
              height="26px"
              minW="fit-content"
              background={
                filterActive.includes(options.id) ? "white" : undefined
              }
              isActive={filterActive.includes(options.id)}
            >
              {options.name}
            </Link>
          </Navigate>
        </Box>
      ))}
    </>
  );
}
