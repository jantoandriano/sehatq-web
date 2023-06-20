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

export type ArticleBannerMobileProps = {
  id: number;
  slug: string;
  category: ArticleCategory;
  title: string;
  imageUrl: string;
  imageAlt: string;
  author: ArticleAuthor;
  date: string;
};

export function ArticleBannerMobile(props: ArticleBannerMobileProps) {
  const { slug, category, title, imageUrl, imageAlt, author, date } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);

  return (
    <LinkBox position="relative" h="210px">
      <Box>
        <Image
          priority
          src={imageUrl || ASSETS.NO_IMAGE}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "absolute",
          }}
        />
        <Box
          backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)"
          position="absolute"
          w="100%"
          h="100%"
          top={0}
          opacity="2"
          cursor="pointer"
        />
      </Box>
      <Box px={4} pb={3} position="absolute" bottom={1} cursor="default">
        <Navigate
          name="ARTICLE"
          query={{
            slugs: [category.slug],
          }}
        >
          <Link
            fontSize="xxs"
            fontWeight="semibold"
            color="main.500"
            variant="unstyled"
            height="15px"
            justifyContent="flex-start"
          >
            {category.name}
          </Link>
        </Navigate>
        <VStack spacing={1} align="flex-start" cursor="default">
          <Navigate
            name="ARTICLE"
            query={{
              slugs: [slug],
            }}
          >
            <LinkOverlay
              fontSize="lg"
              lineHeight="7"
              color="white"
              fontFamily="poppins"
              fontWeight="semibold"
              width="100%"
            >
              {title}
            </LinkOverlay>
          </Navigate>
          <HStack cursor="default" h="14px">
            <Text fontSize="xxs" color="brownGrey.500">
              {date}
            </Text>
            <Divider
              borderColor="brownGrey.500"
              border="solid 0.5px"
              orientation="vertical"
              height="10px"
            />
            <Navigate
              name="AUTHOR"
              query={{
                slug: author.slug,
              }}
            >
              <Link
                fontSize="xxs"
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

export function ArticleBannerSkeletonMobile() {
  return (
    <Box position="relative" h="210px">
      <Box backgroundColor="gray.500" height="100%" />
      <Box px={4} pb={3} position="absolute" bottom={1} cursor="default">
        <Skeleton width="48px" height="12px" mb={2} />
        <VStack spacing={4} align="flex-start">
          <VStack align="flex-start" spacing={1.5}>
            <Skeleton width="290px" height="16px" />
            <Skeleton width="250px" height="16px" />
          </VStack>
          <HStack>
            <Skeleton width="100px" height="12px" />
            <Divider
              borderColor="brownGrey.500"
              border="solid 0.5px"
              orientation="vertical"
              height="12px"
            />
            <Skeleton width="104px" height="12px" />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
