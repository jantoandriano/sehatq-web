import React from "react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  ForumCategoryIcon,
} from "../../user-interfaces";
import { DiseaseFilterListView } from "./disease-filter-list-view";

export interface CategoryList {
  id: number;
  slug: string;
  name: string;
  imageUrl: string[];
}

export type ForumsCategoryFilterMobileProps = {
  currentCategorySlug: string;
  categoryList: CategoryList[];
  filters: {
    selectedValue: string;
    options: CategoryList[];
    isLoading: boolean;
  };
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function DiseaseCategoryFilterMobile(
  props: ForumsCategoryFilterMobileProps
) {
  const { filters, isOpen, onOpen, onClose } = props;
  return (
    <>
      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
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
            <DiseaseFilterListView
              isMobile
              options={filters.options}
              selectedValue={filters.selectedValue}
              isLoading={filters.isLoading}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button
        variant="fit"
        cursor="pointer"
        onClick={onOpen}
        leftIcon={<ForumCategoryIcon boxSize={6} />}
        color="charcoalGrey"
        fontFamily="poppins"
        fontSize="xs"
      >
        Kategori
      </Button>
    </>
  );
}
