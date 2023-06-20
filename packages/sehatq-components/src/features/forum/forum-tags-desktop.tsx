import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Flex, Skeleton, Link } from "../../user-interfaces";
import { ForumTag } from "./forum-models";

export type ForumTagsDesktopProps = {
  tags: ForumTag[];
};

export function ForumTagsDesktop(props: ForumTagsDesktopProps) {
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
                size="sm"
                colorScheme="main"
                variant="outline"
                borderRadius="md"
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

export function ForumTagsDesktopSkeleton() {
  return (
    <Flex wrap="wrap">
      {Array.from(Array(4).keys()).map((index) => {
        return (
          <Skeleton
            key={index}
            width={100}
            marginBottom={3}
            marginRight={3}
            height={8}
          />
        );
      })}
    </Flex>
  );
}
