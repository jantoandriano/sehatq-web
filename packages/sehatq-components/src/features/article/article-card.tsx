import React from "react";
import {
  ArticleCardDesktop,
  ArticleCardDesktopProps,
  ArticleCardDesktopSkeleton,
} from "./article-card-desktop";
import {
  ArticleCardMobile,
  ArticleCardMobileProps,
  ArticleCardMobileSkeleton,
} from "./article-card-mobile";

export type ArticleCardProps =
  | ({
      isMobile: true;
    } & ArticleCardMobileProps)
  | ({ isMobile: false } & ArticleCardDesktopProps);

export type ArticleCardSkeletonProps = {
  isMobile?: boolean;
};

export function ArticleCard(props: ArticleCardProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ArticleCardMobile {...props} />;
  }

  return <ArticleCardDesktop {...props} />;
}

export function ArticleCardSkeleton(props: ArticleCardSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <ArticleCardMobileSkeleton />;

  return <ArticleCardDesktopSkeleton />;
}
