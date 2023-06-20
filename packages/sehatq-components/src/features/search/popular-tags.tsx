import React from "react";
import { useGetPopularTags } from "./popular-tags-queries";
import { PopularTagsDesktop } from "./popular-tags-desktops";
import { PopularTagsMobile } from "./popular-tags-mobile";

export type PopularTagsProps = {
  isMobile?: boolean;
};

export function PopularTags(props: PopularTagsProps) {
  const { data: popularTags = [] } = useGetPopularTags();

  const otherProps = {
    popularTags,
  };

  if (props.isMobile) {
    return <PopularTagsMobile {...otherProps} />;
  }

  return <PopularTagsDesktop {...otherProps} />;
}
