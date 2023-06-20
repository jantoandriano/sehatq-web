import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import {
  Box,
  Skeleton,
  VStack,
  useImage,
  Link,
  LinkBox,
  Text,
  LinkOverlay,
} from "../../user-interfaces";

export interface DiseaseReviewer {
  name: string;
  slug: string;
}

export type DiseaseBannerMobileProps = {
  slug: string;
  title: string;
  reviewer: DiseaseReviewer;
  imageUrl: string;
  imageAlt: string;
};

export function DiseaseBannerMobile(props: DiseaseBannerMobileProps) {
  const { slug, title, imageUrl, imageAlt, reviewer } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);

  return (
    <LinkBox position="relative" h="210px" paddingBottom="59.45%">
      <Image
        priority
        src={imageUrl || ASSETS.NO_IMAGE}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          width: "100%",
          paddingBottom: "59.45%",
          overflow: "hidden",
          position: "absolute",
        }}
      />
      <Box
        backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)"
        position="absolute"
        w="100%"
        paddingBottom="59.45%"
        top={0}
        opacity="2"
      />
      <Box px={4} pb={2} position="absolute" bottom={1} cursor="default">
        <VStack spacing={0} align="flex-start" cursor="default">
          <Navigate
            name="DISEASE"
            query={{
              slugs: slug,
            }}
          >
            <LinkOverlay
              fontSize="22px"
              lineHeight="14"
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
                fontSize="xxs"
                color="brownGrey.500"
                fontWeight="normal"
                lineHeight="3"
                _hover={{
                  color: "sea.500",
                }}
              >
                Ditinjau oleh {reviewer.name}
              </Link>
            </Navigate>
          ) : (
            <Text fontSize="xxs" color="brownGrey.500" variant="unstyled">
              Ditinjau oleh {reviewer.name}
            </Text>
          )}
        </VStack>
      </Box>
    </LinkBox>
  );
}

export function DiseaseBannerSkeletonMobile() {
  return (
    <Box position="relative" h="210px">
      <Skeleton backgroundColor="gray.500" paddingBottom="59.45%" />
      <Box px={4} pb={3} position="absolute" bottom={1} cursor="default">
        <VStack spacing={4} align="flex-start">
          <VStack align="flex-start" spacing={1.5}>
            <Skeleton width="290px" height="16px" />
            <Skeleton width="250px" height="16px" />
          </VStack>
          <Skeleton width="100px" height="12px" />
        </VStack>
      </Box>
    </Box>
  );
}
