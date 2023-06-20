import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Skeleton,
  VStack,
  useImage,
  LinkOverlay,
  LinkBox,
  Text,
} from "../../user-interfaces";

export type InfographicCardDesktopProps = {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  date: string;
  imagePriority?: boolean;
};

export function InfographicCardDesktop(props: InfographicCardDesktopProps) {
  const { slug, title, imageUrl, imageAlt, date, imagePriority } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox>
      <VStack spacing={2.5} align="flex-start">
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            width: "100%",
            paddingBottom: "100%",
            cursor: "pointer",
            position: "relative",
            borderRadius: "md",
            overflow: "hidden",
          }}
          priority={imagePriority}
        />
        <Navigate
          name="ARTICLE"
          query={{
            slugs: [slug],
          }}
        >
          <LinkOverlay
            fontSize="lg"
            lineHeight="short"
            fontWeight="semibold"
            fontFamily="poppins"
            color="charcoalGrey"
            noOfLines={3}
          >
            {title}
          </LinkOverlay>
        </Navigate>
        <Text fontSize="sm" color="brownGrey.500">
          {date}
        </Text>
      </VStack>
    </LinkBox>
  );
}

export function InfographicCardDesktopSkeleton() {
  const Image = useImage();
  return (
    <VStack spacing={2.5} align="flex-start">
      <Image
        src="https://www.sehatq.com/public/assets/img/no-image.jpg"
        alt="no image"
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          width: "100%",
          paddingBottom: "100%",
          cursor: "pointer",
          position: "relative",
          borderRadius: "md",
          overflow: "hidden",
        }}
      />
      <Box width="100%">
        <Skeleton width="100%" height={4} mb={2} />
        <Skeleton width="100%" height={4} mb={2} />
        <Skeleton width="60%" height={4} mb={1} />
      </Box>
      <Skeleton width="35%" height={3} />
    </VStack>
  );
}
