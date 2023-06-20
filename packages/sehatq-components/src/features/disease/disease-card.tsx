import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  LinkBox,
  LinkOverlay,
  VStack,
  Text,
  Skeleton,
  SkeletonText,
  useImage,
} from "../../user-interfaces";

export type DiseaseCardProps = {
  slug: string;
  title: string;
  introduction: string;
  imageUrl: string;
  imageAlt: string;
};

export function DiseaseCard(props: DiseaseCardProps) {
  const { slug, title, introduction, imageUrl, imageAlt } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox boxShadow="md" borderRadius="xl" overflow="hidden" height="100%">
      <Image
        alt={imageAlt}
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          width: "100%",
          paddingBottom: "42.4%",
        }}
      />
      <VStack padding={5} alignItems="flex-start" width="full" height="100%">
        <Navigate name="DISEASE" query={{ slugs: [slug] }}>
          <LinkOverlay fontFamily="poppins" fontWeight="semibold" fontSize="sm">
            {title}
          </LinkOverlay>
        </Navigate>
        <Text fontSize="xs" noOfLines={3}>
          {introduction}
        </Text>
      </VStack>
    </LinkBox>
  );
}

export function DiseaseCardSkeleton() {
  return (
    <Box boxShadow="md" borderRadius="xl" overflow="hidden">
      <Skeleton width="100%" paddingBottom="42.4%" />
      <VStack padding={5} alignItems="flex-start" width="full" spacing={3}>
        <Skeleton width="40%" height="16px" />
        <SkeletonText
          width="100%"
          skeletonHeight={3}
          spacing={1}
          noOfLines={2}
        />
      </VStack>
    </Box>
  );
}
