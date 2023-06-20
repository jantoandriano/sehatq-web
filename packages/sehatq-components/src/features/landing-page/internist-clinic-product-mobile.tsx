import React from "react";

import { useAssets, NavigationValue } from "@sehatq/utils";
import { Box, useImage, Text } from "../../user-interfaces";
import { ClinicProduct } from "./clinic-product";

type InternistClinicProductMobileProps = {
  title: string;
  sortBy: string;
  categorySlug: string;
  productsNavigation: NavigationValue;
};

function renderTextTitle() {
  return (
    <Box position="relative" fontFamily="poppins">
      <Text lineHeight={7} fontWeight="bold" color="#36454" fontSize="16px">
        Beli Obat Kini Lebih Mudah Cuma
      </Text>
      <Box
        mt={4}
        h={5}
        w={20}
        fontWeight="semibold"
        fontSize="xs"
        bgColor="main.500"
        borderRadius="md"
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

export function InternistClinicProductMobile(
  props: InternistClinicProductMobileProps
) {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_BANNER_PRODUCT_INTERNIST_MOBILE"]);

  return (
    <Box position="relative">
      <Box position="relative" mb={5} mx={2}>
        <Image
          priority
          src={ASSETS.ILLUSTRATION_BANNER_PRODUCT_INTERNIST_MOBILE}
          alt="Beli obat kini lebih mudah cuma di rumah"
          height={276}
          width={672}
          layout="responsive"
        />
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          top={0}
          left={8}
          w={48}
          bottom={0}
          zIndex={1}
        >
          {renderTextTitle()}
        </Box>
      </Box>
      <ClinicProduct isMobile {...props} />
    </Box>
  );
}
