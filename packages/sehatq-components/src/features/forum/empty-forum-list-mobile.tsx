import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, Flex, Text, Image } from "../../user-interfaces";
import { NewArticles } from "../article";
import { PopularTags } from "../search";
import { PopularForums } from "./popular-forums";

export type EmptyForumListMobileProps = {
  searchQuery?: string;
};

export function EmptyForumListMobile(props: EmptyForumListMobileProps) {
  const { searchQuery } = props;
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  return (
    <Box background="white" width="full" p={4}>
      <Flex align="center" flexDirection="column">
        <Image
          src={ASSETS.EMPTY_HCP_LIST}
          alt="Empty Forum List"
          width="64%"
          height="227px"
        />
        <Text lineHeight="4" mb={4} mt={5} fontSize="sm">
          Pencarian{" "}
          {searchQuery && (
            <Text as="span" fontWeight="semibold" lineHeight="4" fontSize="sm">
              “{searchQuery}”{" "}
            </Text>
          )}
          tidak ditemukan
        </Text>
        <Text
          py={3}
          px={4}
          lineHeight="6"
          fontSize="xs"
          borderRadius="xl"
          background="iceBlue.500"
          width="282px"
        >
          Coba ulangi pencarian dengan kata kunci lain atau pilih pencarian
          terpopuler
        </Text>
      </Flex>
      <Box width="100%" mt={9}>
        <PopularTags isMobile />
      </Box>
      <Box width="100%" mt={8}>
        <PopularForums isMobile />
      </Box>
      <Box width="100%" mt={8}>
        <NewArticles isMobile />
      </Box>
    </Box>
  );
}
