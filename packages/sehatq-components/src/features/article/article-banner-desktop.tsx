import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import {
  Box,
  Skeleton,
  HStack,
  VStack,
  useImage,
  Link,
  LinkOverlay,
  Text,
  Divider,
  LinkBox,
} from "../../user-interfaces";

export interface ArticleCategory {
  name: string;
  slug: string;
}
export interface ArticleAuthor {
  name: string;
  slug: string;
}

export type ArticleBannerDesktopProps = {
  id: number;
  slug: string;
  category: ArticleCategory;
  title: string;
  imageUrl: string;
  imageAlt: string;
  author: ArticleAuthor;
  date: string;
};

export function ArticleBannerDesktop(props: ArticleBannerDesktopProps) {
  const { slug, category, title, imageUrl, imageAlt, author, date } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);

  return (
    <LinkBox position="relative" h="410px">
      <Box>
        <Image
          priority
          src={imageUrl || ASSETS.NO_IMAGE}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "xl",
            position: "absolute",
          }}
        />
        <Box
          backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)"
          position="absolute"
          w="100%"
          h="100%"
          top={0}
          borderRadius="xl"
          opacity="2"
        />
      </Box>
      <Box px={6} pb={4} position="absolute" bottom={2} cursor="default">
        <Navigate
          name="ARTICLE"
          query={{
            slugs: [category.slug],
          }}
        >
          <Link
            fontSize="sm"
            lineHeight="5"
            fontWeight="semibold"
            color="main.500"
            variant="unstyled"
            height="30px"
            justifyContent="flex-start"
          >
            {category.name}
          </Link>
        </Navigate>
        <VStack spacing={3} align="flex-start" cursor="default">
          <Navigate
            name="ARTICLE"
            query={{
              slugs: [slug],
            }}
          >
            <LinkOverlay
              fontSize="7xl"
              lineHeight="16"
              color="white"
              fontFamily="poppins"
              fontWeight="semibold"
              width="100%"
            >
              {title}
            </LinkOverlay>
          </Navigate>
          <HStack cursor="default">
            <Text fontSize="sm" color="brownGrey.500">
              {date}
            </Text>
            <Divider
              borderColor="brownGrey.500"
              border="solid 0.5px"
              orientation="vertical"
              height="12px"
            />
            <Navigate
              name="AUTHOR"
              query={{
                slug: author.slug,
              }}
            >
              <Link
                fontSize="sm"
                color="brownGrey.500"
                variant="unstyled"
                fontWeight="normal"
                _hover={{
                  color: "sea.500",
                }}
              >
                {author.name}
              </Link>
            </Navigate>
          </HStack>
        </VStack>
      </Box>
    </LinkBox>
  );
}

export function ArticleBannerSkeletonDesktop() {
  return (
    <Box position="relative" h="410px">
      <Box backgroundColor="gray.500" height="100%" borderRadius="xl" />
      <Box px={6} pb={4} position="absolute" bottom={2}>
        <Skeleton width="83px" height="18px" mb={3} />
        <VStack spacing={6} align="flex-start">
          <VStack align="flex-start" spacing={1.5}>
            <Skeleton width="710px" height="26px" />
            <Skeleton width="350px" height="26px" />
          </VStack>
          <HStack>
            <Skeleton width="100px" height="19px" />
            <Divider
              borderColor="brownGrey.500"
              border="solid 0.5px"
              orientation="vertical"
              height="12px"
            />
            <Skeleton width="104px" height="19px" />
            <Divider
              borderColor="brownGrey.500"
              border="solid 0.5px"
              orientation="vertical"
              height="12px"
            />
            <Skeleton width="45px" height="19px" />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
