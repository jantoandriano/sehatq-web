import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Skeleton,
  useImage,
  LinkBox,
  LinkOverlay,
  Text,
} from "../../user-interfaces";

export type InfographicCardMobileProps = {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  date: string;
  imagePriority?: boolean;
};

export function InfographicCardMobile(props: InfographicCardMobileProps) {
  const { slug, title, imageUrl, imageAlt, date, imagePriority } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox>
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
          marginBottom: 2,
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
          mb={1}
          fontSize="sm"
          lineHeight="5"
          fontWeight="semibold"
          fontFamily="poppins"
          color="charcoalGrey"
          noOfLines={3}
        >
          {title}
        </LinkOverlay>
      </Navigate>
      <Text fontSize="xxs" color="brownGrey.500">
        {date}
      </Text>
    </LinkBox>
  );
}

export function InfographicCardMobileSkeleton() {
  const Image = useImage();
  return (
    <>
      <Box mb={2}>
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
      </Box>
      <Box>
        <Skeleton width="100%" height={4} mb={1} />
        <Skeleton width="100%" height={4} mb={1} />
        <Skeleton width="60%" height={4} />
      </Box>
      <Skeleton width="40%" height={3} mt={2} />
    </>
  );
}
