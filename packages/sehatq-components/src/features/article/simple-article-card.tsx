import React from "react";
import {
  SimpleArticleCardDesktop,
  SimpleArticleCardDesktopProps,
  SimpleArticleCardDesktopSkeleton,
} from "./simple-article-card-desktop";
import {
  SimpleArticleCardMobile,
  SimpleArticleCardMobileProps,
  SimpleArticleCardMobileSkeleton,
} from "./simple-article-card-mobile";

export type SimpleArticleCardProps =
  | ({
      isMobile: true;
    } & SimpleArticleCardMobileProps)
  | ({ isMobile: false } & SimpleArticleCardDesktopProps);

export type SimpleArticleCardSkeletonProps = {
  isMobile?: boolean;
};

export function SimpleArticleCard(props: SimpleArticleCardProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <SimpleArticleCardMobile {...props} />;
  }

  return <SimpleArticleCardDesktop {...props} />;
}

export function SimpleArticleCardSkeleton(
  props: SimpleArticleCardSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <SimpleArticleCardMobileSkeleton />;

  return <SimpleArticleCardDesktopSkeleton />;
}
