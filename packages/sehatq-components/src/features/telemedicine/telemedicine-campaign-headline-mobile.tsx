import React from "react";
import { Skeleton, useImage } from "../../user-interfaces";

export type TelemedicineCampaignHeadlineMobileProps = {
  imageUrl: string;
  slug: string;
};

export function TelemedicineCampaignHeadlineMobile(
  props: TelemedicineCampaignHeadlineMobileProps
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
        paddingBottom: "39.65%",
        overflow: "hidden",
        borderRadius: "xl",
      }}
    />
  );
}

export function TelemedicineCampaignHeadlineMobileSkeleton() {
  return <Skeleton borderRadius="xl" width="full" height="130px" />;
}
