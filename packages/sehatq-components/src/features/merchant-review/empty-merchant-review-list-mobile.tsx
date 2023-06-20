import React from "react";
import { useAssets } from "@sehatq/utils";
import { Image, Text, Flex } from "../../user-interfaces";

export function EmptyMerchantReviewListMobile() {
  const ASSETS = useAssets(["MERCHANT_REVIEW_EMPTY"]);
  return (
    <Flex align="center" flexDirection="column" mt={4}>
      <Image
        src={ASSETS.MERCHANT_REVIEW_EMPTY}
        alt={ASSETS.MERCHANT_REVIEW_EMPTY}
        width="64%"
        height="262px"
      />
      <Text fontWeight="semibold" fontSize="lg" color="sea.900" mb={2} mt={5}>
        Bantu Penjual dengan Ulasanmu
      </Text>
      <Text
        color="sea.900"
        fontSize="md"
        width="290px"
        lineHeight="1.43"
        textAlign="center"
      >
        Beli produknya dan kasih ulasan untuk penjual ini, yuk
      </Text>
    </Flex>
  );
}
