import React from "react";
import { useAssets } from "@sehatq/utils";
import { Image, Text, Flex } from "../../user-interfaces";

export function EmptyMerchantReviewListDesktop() {
  const ASSETS = useAssets(["MERCHANT_REVIEW_EMPTY"]);
  return (
    <Flex align="center" flexDirection="column">
      <Image
        src={ASSETS.MERCHANT_REVIEW_EMPTY}
        alt={ASSETS.MERCHANT_REVIEW_EMPTY}
        width="43%"
      />
      <Text
        fontWeight="semibold"
        fontSize="2xl"
        color="sea.900"
        mb={2}
        mt={5}
        fontFamily="poppins"
      >
        Bantu Penjual dengan Ulasanmu
      </Text>
      <Text
        color="sea.900"
        fontSize="lg"
        width="290px"
        lineHeight="1.43"
        textAlign="center"
      >
        Beli produknya dan kasih ulasan untuk penjual ini, yuk
      </Text>
    </Flex>
  );
}
