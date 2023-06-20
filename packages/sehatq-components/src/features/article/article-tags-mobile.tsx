import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Box, Link, Skeleton, Flex } from "../../user-interfaces";
import { ArticleTag } from "./article-model";
export type ArticleTagsMobileProps = {
  tags: ArticleTag[];
};

export function ArticleTagsMobile(props: ArticleTagsMobileProps) {
  const { tags } = props;
  const { Navigate } = useNavigation();
  return (
    <Box>
      {tags.length > 0 &&
        tags.map((tag: ArticleTag) => (
          <Navigate
            key={tag.id}
            name="TAG"
            query={{
              slug: tag.slug,
            }}
          >
            <Link
              size="xs"
              colorScheme="main"
              variant="outline"
              marginBottom={1.5}
              marginRight={1.5}
              _hover={{
                backgroundColor: "main.500",
                color: "white",
              }}
            >
              {tag.name}
            </Link>
          </Navigate>
        ))}
    </Box>
  );
}

export function ArticleTagsMobileSkeleton() {
  return (
    <Flex align="start" justify="flex-start">
      <Skeleton width={100} marginRight={1.5} height={6} />
      <Skeleton width={100} height={6} />
    </Flex>
  );
}
