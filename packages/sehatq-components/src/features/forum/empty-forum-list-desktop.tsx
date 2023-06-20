import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, HStack, Text, Image } from "../../user-interfaces";
import { NewArticles } from "../article";
import { PopularTags } from "../search";
import { PopularForums } from "./popular-forums";

export type EmptyForumListDesktopProps = {
  searchQuery?: string;
};

export function EmptyForumListDesktop(props: EmptyForumListDesktopProps) {
  const { searchQuery } = props;
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  return (
    <>
      <HStack spacing={7}>
        <Image src={ASSETS.EMPTY_HCP_LIST} alt="Empty Forum List" width="43%" />
        <Box>
          <Text lineHeight="4" mb={4}>
            Pencarian{" "}
            {searchQuery && (
              <Text as="span" fontWeight="semibold" lineHeight="4">
                “{searchQuery}”{" "}
              </Text>
            )}
            tidak ditemukan
          </Text>
          <Text
            py={3.5}
            px={5}
            lineHeight="10"
            fontSize="sm"
            borderRadius="xl"
            background="iceBlue.500"
          >
            Coba ulangi pencarian dengan kata kunci lain atau pilih pencarian
            terpopuler
          </Text>
          <Box width="full" mt={5}>
            <PopularTags />
          </Box>
        </Box>
      </HStack>
      <Box width="100%" mt="45px">
        <PopularForums isMobile={false} />
      </Box>
      <Box width="100%" mt="40px">
        <NewArticles isMobile={false} />
      </Box>
    </>
  );
}
