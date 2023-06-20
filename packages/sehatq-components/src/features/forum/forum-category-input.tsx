import React, { useState } from "react";
import {
  ForumCategoryInputDesktop,
  ForumCategoryInputDesktopSkeleton,
} from "./forum-category-input-desktop";
import {
  ForumCategoryInputMobile,
  ForumCategoryInputMobileSkeleton,
} from "./forum-category-input-mobile";
import {
  ForumCategoryInputCache,
  useGetForumCategoryInput,
} from "./forum-category-input-queries";

export type ForumCategoryInputProps = {
  isMobile?: boolean;
  onChange: (selected: { value: number; name: string }) => void;
  isFullWidth?: boolean;
  isRequired?: boolean;
  selectedValue?: number;
  placeholder?: string;
  maxHeightOptions?: string;
};

export function selectCategories(cache: ForumCategoryInputCache) {
  return cache.data;
}

export function ForumCategoryInput(props: ForumCategoryInputProps) {
  const { isMobile, isFullWidth, isRequired, maxHeightOptions } = props;
  const [isShowOptions, setShowOptions] = useState(false);

  const { data: options = [], isLoading } = useGetForumCategoryInput({
    select: selectCategories,
  });

  function onCloseOptions() {
    setShowOptions(!isShowOptions);
  }

  if (isLoading) {
    return <ForumCategoryInputSkeleton {...props} />;
  }

  const otherProps = {
    options,
    selectedValue: props.selectedValue,
    selectedName:
      options.find((f) => f.value == props.selectedValue)?.name ?? undefined,
    placeholder: props.placeholder ?? "Silahkan pilih kategori",
    onChange: props.onChange,
    isFullWidth,
    isRequired,
    maxHeightOptions,
  };

  if (isMobile) {
    const mobileProps = {
      ...otherProps,
      onCloseOptions,
      isShowOptions,
    };
    return <ForumCategoryInputMobile {...mobileProps} />;
  }

  return <ForumCategoryInputDesktop {...otherProps} />;
}

export type ForumCategoryInputSkeletonProps = {
  isMobile?: boolean;
  isFullWidth?: boolean;
};
export function ForumCategoryInputSkeleton(
  props: ForumCategoryInputSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <ForumCategoryInputMobileSkeleton />;
  }

  return <ForumCategoryInputDesktopSkeleton />;
}
