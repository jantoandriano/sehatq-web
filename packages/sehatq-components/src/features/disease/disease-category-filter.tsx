import React from "react";
import { useDisclosure } from "../../user-interfaces";
import { DiseaseCategoryFilterDesktop } from "./disease-category-filter-desktop";
import { DiseaseCategoryFilterMobile } from "./disease-category-filter-mobile";

import { useGetDiseaseCategories } from "./disease-category-filter-queries";

export type DiseaseCategoryFilterProps = {
  isMobile: boolean;
  currentCategorySlug: string;
};

export function DiseaseCategoryFilter(props: DiseaseCategoryFilterProps) {
  const { isMobile, currentCategorySlug } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: categoryList } = useGetDiseaseCategories({ slug: "" });

  const newProps = {
    isOpen,
    onClose,
    onOpen,
    currentCategorySlug: currentCategorySlug ?? "",
    categoryList: categoryList?.data ?? [],
    filters: {
      selectedValue: currentCategorySlug,
      options: categoryList?.data ?? [],
      isLoading: false,
    },
  };

  if (isMobile) {
    return <DiseaseCategoryFilterMobile {...newProps} />;
  }
  return <DiseaseCategoryFilterDesktop {...newProps} />;
}
