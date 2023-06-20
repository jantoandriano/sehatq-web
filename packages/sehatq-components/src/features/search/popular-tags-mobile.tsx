import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Wrap,
  Text,
  Link,
  HStack,
  IconButton,
  PopularFiturIcon,
} from "../../user-interfaces";
import { PopularTagsCache } from "./popular-tags-queries";

export type PopularTagsMobileProps = {
  popularTags: PopularTagsCache;
};
export function PopularTagsMobile(props: PopularTagsMobileProps) {
  const { popularTags = [] } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      {popularTags.length ? (
        <>
          <HStack spacing={1.5} align="center">
            <IconButton
              aria-label="time icon"
              variant="fit"
              colorScheme="sea"
              icon={<PopularFiturIcon w={6} h={6} color="sea.500" />}
            />
            <Text fontFamily="poppins" fontWeight="semibold" fontSize="sm">
              Pencarian Terpopuler
            </Text>
          </HStack>
          <Wrap mt="2.5" ml={7} spacing="2.5">
            {popularTags.map((popularTag) => {
              return (
                <Navigate
                  key={popularTag.name}
                  name="SEARCH"
                  query={{ q: popularTag.name }}
                >
                  <Link
                    colorScheme="main"
                    variant="outline"
                    fontSize="xs"
                    width="fit-content"
                    size="sm"
                    textTransform="capitalize"
                  >
                    {popularTag.name}
                  </Link>
                </Navigate>
              );
            })}
          </Wrap>
        </>
      ) : null}
    </>
  );
}
