import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Flex, Skeleton, Link } from "../../user-interfaces";
import { ForumTag } from "./forum-models";

export type ForumTagsMobileProps = {
  tags: ForumTag[];
};

export function ForumTagsMobile(props: ForumTagsMobileProps) {
  const { tags } = props;
  const { Navigate } = useNavigation();
  return (
    <Flex wrap="wrap">
      {tags.length > 0
        ? tags.map((tag: ForumTag) => (
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
                borderRadius="base"
                marginBottom={3}
                marginRight={3}
                _hover={{
                  backgroundColor: "main.500",
                  color: "white",
                }}
              >
                {tag.name}
              </Link>
            </Navigate>
          ))
        : null}
    </Flex>
  );
}

export function ForumTagsMobileSkeleton() {
  return (
    <Flex wrap="wrap">
      {Array.from(Array(2).keys()).map((index) => {
        return (
          <Skeleton
            key={index}
            width="80px"
            marginBottom={3}
            marginRight={3}
            height="30px"
          />
        );
      })}
    </Flex>
  );
}
