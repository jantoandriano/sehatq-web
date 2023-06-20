import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../../user-interfaces";
import {
  RelatedHealthCareFacilityHCPSearch,
  RelatedHealthCareFacilityHCPSearchProps,
  RelatedHealthCareFacilityHCPSearchSkeleton,
} from "./related-health-care-facility-hcp-search";
import {
  RelatedHealthCareFacilityServiceSearch,
  RelatedHealthCareFacilityServiceSearchProps,
  RelatedHealthCareFacilityServiceSearchSkeleton,
} from "./related-health-care-facility-service-search";

export type RelatedHealthCareFacilitySearchGeneralProps =
  RelatedHealthCareFacilityHCPSearchProps &
    RelatedHealthCareFacilityServiceSearchProps;

export type RelatedHealthCareFacilitySearchDesktopProps =
  RelatedHealthCareFacilitySearchGeneralProps;

const tabStyle = {
  fontSize: "xs",
  color: "brownGrey.500",
  padding: "11px",
  _selected: {
    color: "sea.500",
    borderBottomColor: "main.500",
    fontWeight: "semibold",
    fontSize: "xs",
  },
};

export function RelatedHealthCareFacilitySearchDesktop(
  props: RelatedHealthCareFacilitySearchDesktopProps
) {
  return (
    <Tabs
      isFitted
      borderColor="veryLightPink"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      width="full"
    >
      <TabList borderBottom="1px solid">
        {props.specialities.length > 0 ? <Tab {...tabStyle}>Dokter</Tab> : null}
        {props.services.length > 0 ? (
          <Tab {...tabStyle}>Layanan Pemeriksaan</Tab>
        ) : null}
      </TabList>
      <TabPanels>
        <TabPanel>
          <RelatedHealthCareFacilityHCPSearch {...props} />
        </TabPanel>
        <TabPanel>
          <RelatedHealthCareFacilityServiceSearch {...props} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export function RelatedHealthCareFacilitySearchDesktopSkeleton() {
  return (
    <Tabs
      isFitted
      borderColor="veryLightPink"
      background="white"
      borderRadius="xl"
      boxShadow="base"
    >
      <TabList borderBottom="1px solid">
        <Tab {...tabStyle}>Dokter</Tab>
        <Tab {...tabStyle}>Layanan Pemeriksaan</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RelatedHealthCareFacilityHCPSearchSkeleton />
        </TabPanel>
        <TabPanel>
          <RelatedHealthCareFacilityServiceSearchSkeleton />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
