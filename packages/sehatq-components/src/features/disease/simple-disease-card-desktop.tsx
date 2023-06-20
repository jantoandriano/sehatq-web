import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import {
  Box,
  Skeleton,
  useImage,
  LinkBox,
  LinkOverlay,
} from "../../user-interfaces";

export type SimpleDiseaseCardDesktopProps = {
  slug: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
};

export function SimpleDiseaseCardDesktop(props: SimpleDiseaseCardDesktopProps) {
  const { slug, name, imageUrl, imageAlt } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);

  return (
    <LinkBox
      color="charcoalGrey"
      display="flex"
      _hover={{ border: "none" }}
      flexDirection="column"
    >
      <Image
        priority
        src={imageUrl || ASSETS.NO_IMAGE}
        alt={imageAlt}
        layout="responsive"
        width={130}
        height={130}
        wrapperProps={{
          overflow: "hidden",
          borderRadius: "xl",
          mb: "10px",
        }}
      />
      <Navigate
        name="DISEASE"
        query={{
          slugs: slug,
        }}
      >
        <LinkOverlay
          fontSize="18px"
          fontFamily="poppins"
          fontWeight="semibold"
          lineHeight="1.33"
          w="full"
        >
          {name}
        </LinkOverlay>
      </Navigate>
    </LinkBox>
  );
}

export function DiseaseBannerSkeletonDesktop() {
  return (
    <Box>
      <Skeleton width="full" height="174px" borderRadius="xl" mb={3} />
      <Skeleton width="full" height="20px" />
    </Box>
  );
}
