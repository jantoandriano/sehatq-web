import React from "react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "../../user-interfaces";
import { RelatedHealthCareFacilitySearchGeneralProps } from "./related-health-care-facility-search-desktop";
import { RelatedHealthCareFacilityHCPSearch } from "./related-health-care-facility-hcp-search";
import { RelatedHealthCareFacilityServiceSearch } from "./related-health-care-facility-service-search";

export type RelatedHealthCareFacilitySearchMobileProps =
  RelatedHealthCareFacilitySearchGeneralProps & {
    showModal: boolean;
    onShowHideModal: () => void;
  };

const tabStyle = {
  fontSize: "sm",
  color: "brownGrey.500",
  _selected: {
    color: "sea.500",
    borderBottomColor: "main.500",
    fontWeight: "semibold",
    fontSize: "sm",
  },
};

export function RelatedHealthCareFacilitySearchMobile(
  props: RelatedHealthCareFacilitySearchMobileProps
) {
  return (
    <>
      <Button
        width="full"
        variant="solid"
        colorScheme="main"
        fontSize="md"
        fontWeight="semibold"
        borderRadius="base"
        onClick={props.onShowHideModal}
      >
        Cari Dokter / Layanan Pemeriksaan
      </Button>

      <Drawer
        placement="bottom"
        onClose={props.onShowHideModal}
        isOpen={props.showModal}
      >
        <DrawerOverlay zIndex="modal" />
        <DrawerContent zIndex="popover" borderTopRadius="lg">
          <DrawerBody px={0}>
            <Tabs isFitted borderColor="veryLightPink">
              <TabList borderBottom="1px solid">
                <Tab {...tabStyle}>Dokter</Tab>
                <Tab {...tabStyle}>Layanan Pemeriksaan</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RelatedHealthCareFacilityHCPSearch {...props} isMobile />
                </TabPanel>
                <TabPanel>
                  <RelatedHealthCareFacilityServiceSearch {...props} isMobile />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function RelatedHealthCareFacilitySearchMobileSkeleton() {
  return <Skeleton width="full" height="46px" borderRadius="base" />;
}
