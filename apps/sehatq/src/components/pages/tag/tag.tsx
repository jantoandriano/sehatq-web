import React from "react";
import { useRouter } from "next/router";

import { TagMobile } from "./tag-mobile";
import { TagDesktop } from "./tag-desktop";

export type TagPageProps = {
  isMobile: boolean;
};

export function TagPage(props: TagPageProps) {
  const router = useRouter();
  const { isMobile } = props;
  const { tagSlug } = router.query;

  const newProps = {
    isMobile,
    tagSlug: `${tagSlug}`,
  };

  if (isMobile) {
    return <TagMobile {...newProps} />;
  }
  return <TagDesktop {...newProps} />;
}
