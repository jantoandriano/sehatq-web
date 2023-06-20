import React from "react";
import {
  Box,
  Flex,
  Link,
  Skeleton,
  SkeletonText,
  Text,
  Wrap,
  WrapItem,
} from "../../user-interfaces";
import { PopularArticlesData } from "./articles-model";

type PopularArticlesDesktopProps = {
  data: PopularArticlesData[];
};

export function PopularArticlesDesktop({ data }: PopularArticlesDesktopProps) {
  return (
    <Box border="1px solid #DADADA" borderRadius="xl" padding={6}>
      <Text
        fontSize="xl"
        color="charcoalGrey"
        fontWeight="semibold"
        fontFamily="Poppins"
      >
        Artikel Terpopuler
      </Text>
      <Wrap>
        {data.map((article: PopularArticlesData, i: number) => (
          <WrapItem key={article.id}>
            <Flex
              pt={2}
              {...(i === data.length - 1
                ? {}
                : {
                    borderBottom: "0.5px solid #DADADA",
                    pb: 6,
                  })}
            >
              <Text
                color="main.200"
                fontSize="9xl"
                fontWeight="bold"
                fontFamily="Poppins"
                pr={3}
                lineHeight={18}
              >
                {`0${i + 1}`}
              </Text>
              <Box>
                <Link
                  href={`/artikel/${article.category.slug}`}
                  color="sea.500"
                  fontSize="xs"
                  pb={1.5}
                >
                  {article.category.name}
                </Link>
                <Link
                  href={`/artikel/${article.slug}`}
                  fontWeight="semibold"
                  fontFamily="Poppins"
                  fontSize="sm"
                  color="charcoalGrey"
                >
                  {article.title}
                </Link>
              </Box>
            </Flex>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

export function PopularArticlesDesktopSkeleton() {
  return (
    <Box border="1px solid #DADADA" borderRadius="xl" padding={6}>
      <Skeleton h={8} width={40} mb={6} />
      <Box mb={6}>
        <Skeleton h={4} width={20} mb={1.5} />
        <SkeletonText noOfLines={3} gap={2} />
      </Box>
      <Box mb={6}>
        <Skeleton h={4} width={20} mb={1.5} />
        <SkeletonText noOfLines={3} gap={2} />
      </Box>
      <Box mb={6}>
        <Skeleton h={4} width={20} mb={1.5} />
        <SkeletonText noOfLines={3} gap={2} />
      </Box>
      <Box mb={6}>
        <Skeleton h={4} width={20} mb={1.5} />
        <SkeletonText noOfLines={3} gap={2} />
      </Box>
      <Box>
        <Skeleton h={4} width={20} mb={1.5} />
        <SkeletonText noOfLines={3} gap={2} />
      </Box>
    </Box>
  );
}
