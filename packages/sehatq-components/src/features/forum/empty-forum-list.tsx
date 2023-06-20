import React from "react";
import { EmptyForumListDesktop } from "./empty-forum-list-desktop";
import { EmptyForumListMobile } from "./empty-forum-list-mobile";

export type EmptyForumListProps = {
  isMobile?: boolean;
  searchQuery?: string;
};

export function EmptyForumList(props: EmptyForumListProps) {
  const { isMobile, ...otherProps } = props;
  if (isMobile) {
    return <EmptyForumListMobile {...otherProps} />;
  }
  return <EmptyForumListDesktop {...otherProps} />;
}
