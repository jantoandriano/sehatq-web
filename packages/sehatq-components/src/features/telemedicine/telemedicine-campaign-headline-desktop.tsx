import React from "react";
import { Skeleton, useImage } from "../../user-interfaces";

export type TelemedicineCampaignHeadlineDesktopProps = {
  imageUrl: string;
  slug: string;
};

export function TelemedicineCampaignHeadlineDesktop(
  props: TelemedicineCampaignHeadlineDesktopProps
) {
  const Image = useImage();
  return (
    <Image
      priority
      src={props.imageUrl}
      alt={props.slug}
      layout="fill"
      objectFit="cover"
      wrapperProps={{
        width: "100%",
        paddingBottom: "25%",
        overflow: "hidden",
        borderRadius: "xl",
      }}
    />
  );
}

export function TelemedicineCampaignHeadlineDesktopSkeleton() {
  return <Skeleton borderRadius="xl" width="full" height="190px" />;
}
