import React from "react";
import {
  Button,
  ForumCategoryIcon,
  Skeleton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
} from "../../user-interfaces";
import { ForumFilterListView } from "../general";
import { generateFilters } from "./forums-filter-helpers";

export type ForumsCategoryFilterMobileProps = {
  filters: ReturnType<typeof generateFilters>;
  isShowFilter: boolean;
  onClickFilterIcon: () => void;
};

export function ForumsCategoryFilterMobile(
  props: ForumsCategoryFilterMobileProps
) {
  const { filters, isShowFilter, onClickFilterIcon } = props;
  return (
    <>
      <Button
        variant="fit"
        cursor="pointer"
        onClick={onClickFilterIcon}
        leftIcon={<ForumCategoryIcon boxSize={6} />}
        color="charcoalGrey"
        fontFamily="poppins"
        fontSize="xs"
      >
        Kategori
      </Button>
      <Drawer
        placement="bottom"
        onClose={onClickFilterIcon}
        isOpen={isShowFilter}
        trapFocus={false}
      >
        <DrawerOverlay zIndex="modal" />
        <DrawerContent zIndex="popover" borderTopRadius="xl">
          <DrawerCloseButton />
          <DrawerHeader
            pb={2}
            pt={3}
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
            color="charcoalGrey"
            borderBottom="0.5px solid"
            borderBottomColor="veryLightPink"
          >
            Kategori
          </DrawerHeader>
          <DrawerBody p={4}>
            <ForumFilterListView
              isMobile
              options={filters.options}
              selectedValue={filters.selectedValue}
              isLoading={filters.isLoading}
              onClose={onClickFilterIcon}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function ForumsCategoryFilterMobileSkeleton() {
  return <Skeleton width={90} height={5} />;
}
