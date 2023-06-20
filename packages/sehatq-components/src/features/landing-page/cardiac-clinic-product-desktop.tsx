import React from "react";

import { useAssets, NavigationValue } from "@sehatq/utils";
import { Box, useImage, Text } from "../../user-interfaces";
import { ClinicProduct } from "./clinic-product";

type CardiacClinicProductDesktopProps = {
  title: string;
  sortBy: string;
  categorySlug: string;
  productsNavigation: NavigationValue;
};

function renderTextTitle() {
  return (
    <Box fontFamily="poppins">
      <Text
        fontWeight="extrabold"
        lineHeight={7}
        color="#36454"
        fontSize="32px"
      >
        Beli Obat Kini Lebih Mudah
      </Text>
      <Box
        mt={9}
        h={9}
        w={40}
        fontWeight="semibold"
        fontSize="3xl"
        bgColor="main.500"
        borderRadius="2xl"
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        dari Rumah
      </Box>
    </Box>
  );
}

export function CardiacClinicProductDesktop(
  props: CardiacClinicProductDesktopProps
) {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_BANNER_PRODUCT_INTERNIST"]);

  return (
    <Box position="relative">
      <Box position="relative" mb={5} mr={4}>
        <Image
          priority
          src={ASSETS.ILLUSTRATION_BANNER_PRODUCT_INTERNIST}
          alt="Beli obat kini lebih mudah cuma di rumah"
          height={742}
          width={2320}
          layout="responsive"
        />
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bottom={8}
          top={20}
          left={10}
          zIndex={1}
        >
          {renderTextTitle()}
        </Box>
      </Box>
      <ClinicProduct isMobile={false} {...props} />
    </Box>
  );
}
