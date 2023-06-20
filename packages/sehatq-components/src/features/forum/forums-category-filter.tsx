import React, { useState } from "react";
import {
  ForumsCategoryFilterDesktop,
  ForumsCategoryFilterDesktopSkeleton,
} from "./forums-category-filter-desktop";
import {
  ForumsCategoryFilterMobile,
  ForumsCategoryFilterMobileSkeleton,
} from "./forums-category-filter-mobile";
import { useGetForumCategoryFilters, ForumsCache } from "./forum-queries";

export type ForumsCategoryFilterProps = {
  isMobile: boolean;
  categorySlug?: string;
};

function selectData(cache: ForumsCache) {
  const { categories } = cache.meta;
  return [
    {
      id: 0,
      slug: "all",
      name: "Semua",
      imageUrl: [
        "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/disease_group_icon_7.png?v=3",
        "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/disease_group_icon_7_active.png?v=3",
      ],
    },
    ...categories.filter((category) => category.slug !== "semua-penyakit"),
  ];
}

export function ForumsCategoryFilter(props: ForumsCategoryFilterProps) {
  const { isMobile, categorySlug } = props;
  const [isShowFilter, setIsShowFilter] = useState(!isMobile);

  const query = {
    page: "1",
    perPage: "1",
    categorySlug: "",
    categoryId: "",
    sortBy: "",
    query: "",
    answered: "",
  };

  const { data: categories, isLoading } = useGetForumCategoryFilters(query, {
    select: selectData,
  });

  const onClickFilterIcon = () => {
    setIsShowFilter(!isShowFilter);
  };

  if (isLoading) {
    return <ForumsCategoryFilterSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    const propsMobile = {
      filters: {
        selectedValue: categorySlug || "all",
        options: categories,
        isLoading,
      },
      isShowFilter,
      onClickFilterIcon,
    };
    return <ForumsCategoryFilterMobile {...propsMobile} />;
  }

  const otherProps = {
    selectedValue: categorySlug || "all",
    options: categories,
    isShowFilter,
    onClickFilterIcon,
  };

  return <ForumsCategoryFilterDesktop {...otherProps} />;
}

export type ForumsCategoryFilterSkeletonProps = { isMobile: boolean };

export function ForumsCategoryFilterSkeleton(
  props: ForumsCategoryFilterSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <ForumsCategoryFilterMobileSkeleton />;
  }

  return <ForumsCategoryFilterDesktopSkeleton />;
}
