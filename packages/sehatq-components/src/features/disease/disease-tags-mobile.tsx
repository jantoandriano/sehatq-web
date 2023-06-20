import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Box, Flex, Link, Skeleton } from "../../user-interfaces";

export interface DiseaseTag {
  id: number;
  name: string;
  slug: string;
}

export type DiseaseTagsMobileProps = {
  tags: DiseaseTag[];
};

export function DiseaseTagsMobile(props: DiseaseTagsMobileProps) {
  const { tags } = props;
  const { Navigate } = useNavigation();
  return (
    <Box>
      {tags.length > 0 &&
        tags.map((tag: DiseaseTag) => (
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

export function DiseaseTagsSkeletonMobile() {
  return (
    <Flex align="start" justify="flex-start">
      <Skeleton width={100} marginRight={1.5} height={6} />
      <Skeleton width={100} height={6} />
    </Flex>
  );
}
