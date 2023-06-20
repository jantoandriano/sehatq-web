import React from "react";
import { useAssets } from "@sehatq/utils";
import { Image, Text, Flex } from "../../user-interfaces";

export function EmptyFilterListViewMobile() {
  const ASSETS = useAssets(["EMPTY_FILTERS"]);
  return (
    <Flex align="center" flexDirection="column" mt={4}>
      <Image
        src={ASSETS.EMPTY_FILTERS}
        alt={ASSETS.EMPTY_FILTERS}
        width="64%"
        height="262px"
      />
      <Text
        fontWeight="semibold"
        fontFamily="poppins"
        fontSize="md"
        color="charcoalGrey"
        mb={2}
        mt={5}
      >
        Hasil Pencarian Tidak Ditemukan
      </Text>
    </Flex>
  );
}
