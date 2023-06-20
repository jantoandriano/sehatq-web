import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import {
  Box,
  Skeleton,
  useImage,
  LinkBox,
  LinkOverlay,
} from "../../user-interfaces";

export type SimpleDiseaseCardMobileProps = {
  slug: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
};

export function SimpleDiseaseCardMobile(props: SimpleDiseaseCardMobileProps) {
  const { slug, name, imageUrl, imageAlt } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);

  return (
    <LinkBox color="charcoalGrey" _hover={{ border: "none" }}>
      <Image
        priority
        src={imageUrl || ASSETS.NO_IMAGE}
        alt={imageAlt}
        layout="responsive"
        width={130}
        height={130}
        wrapperProps={{
          borderRadius: "xl",
          overflow: "hidden",
          mb: "5px",
        }}
      />
      <Navigate
        name="DISEASE"
        query={{
          slugs: slug,
        }}
      >
        <LinkOverlay
          fontSize="14px"
          fontFamily="poppins"
          fontWeight="semibold"
          lineHeight="normal"
          w="full"
        >
          {name}
        </LinkOverlay>
      </Navigate>
    </LinkBox>
  );
}

export function DiseaseBannerSkeletonMobile() {
  return (
    <Box>
      <Skeleton width="full" height="130px" borderRadius="xl" mb={2} />
      <Skeleton width="full" height="15px" />
    </Box>
  );
}
