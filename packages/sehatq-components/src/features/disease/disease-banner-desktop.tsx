import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import {
  Box,
  Skeleton,
  VStack,
  useImage,
  Link,
  LinkOverlay,
  LinkBox,
  Text,
} from "../../user-interfaces";

export interface DiseaseReviewer {
  name: string;
  slug: string;
}

export type DiseaseBannerDesktopProps = {
  slug: string;
  title: string;
  reviewer: DiseaseReviewer;
  imageUrl: string;
  imageAlt: string;
};

export function DiseaseBannerDesktop(props: DiseaseBannerDesktopProps) {
  const { slug, title, reviewer, imageUrl, imageAlt } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);

  return (
    <LinkBox position="relative" h="384px">
      <Image
        priority
        src={imageUrl || ASSETS.NO_IMAGE}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          width: "100%",
          paddingBottom: "49.1%",
          overflow: "hidden",
          borderRadius: "xl",
          position: "absolute",
        }}
      />
      <Box
        backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)"
        position="absolute"
        w="100%"
        paddingBottom="49.1%"
        top={0}
        borderRadius="xl"
        opacity="2"
      />

      <Box px={6} pb={1} position="absolute" bottom={2} cursor="default">
        <VStack spacing={3} align="flex-start" cursor="default">
          <Navigate
            name="DISEASE"
            query={{
              slugs: slug,
            }}
          >
            <LinkOverlay
              fontSize="38px"
              lineHeight="16"
              color="white"
              fontFamily="poppins"
              fontWeight="semibold"
              width="100%"
              zIndex={2}
            >
              {title}
            </LinkOverlay>
          </Navigate>
          {reviewer.slug ? (
            <Navigate
              name="REVIEWER"
              query={{
                slug: reviewer.slug,
              }}
            >
              <Link
                fontSize="14px"
                color="brownGrey.500"
                variant="unstyled"
                fontWeight="normal"
                _hover={{
                  color: "sea.500",
                }}
                margin="0px"
              >
                Ditinjau oleh {reviewer.name}
              </Link>
            </Navigate>
          ) : (
            <Text fontSize="14px" color="brownGrey.500" variant="unstyled">
              Ditinjau oleh {reviewer.name}
            </Text>
          )}
        </VStack>
      </Box>
    </LinkBox>
  );
}

export function DiseaseBannerSkeletonDesktop() {
  return (
    <Box position="relative" h="410px">
      <Skeleton
        backgroundColor="gray.500"
        paddingBottom="49.1%"
        borderRadius="xl"
      />
      <Box px={6} pb={4} position="absolute" bottom={9}>
        <VStack spacing={6} align="flex-start">
          <VStack align="flex-start" spacing={1.5}>
            <Skeleton width="710px" height="26px" />
            <Skeleton width="350px" height="26px" />
          </VStack>
          <Skeleton width="100px" height="19px" />
        </VStack>
      </Box>
    </Box>
  );
}
