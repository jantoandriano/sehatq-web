import React, { ReactElement } from "react";

import { useNavigation, formatDate, convertDateToEnglish } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  LinkOverlay,
  LinkBox,
  HStack,
} from "../../user-interfaces";

type ClinicArticleMobileProps = {
  title: ReactElement;
  articles: {
    id: number;
    imageUrl: string;
    imageAlt: string;
    title: string;
    slug: string;
    date: string;
  }[];
};

export function ClinicArticleMobile(props: ClinicArticleMobileProps) {
  const { articles, title } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box w="full">
      <Box px={4}>{title}</Box>
      <HStack spacing={3} overflowX="auto" py={3} px={4}>
        {articles.map((article) => (
          <LinkBox
            key={article.id}
            display="flex"
            minW="320px"
            h="350px"
            boxShadow="base"
            borderRadius="2xl"
            flexDirection="column"
            justifyContent="space-between"
            pb={5}
            bgColor="white"
          >
            <Box>
              <Image
                priority
                src={article.imageUrl}
                alt={article.imageAlt}
                layout="fill"
                objectFit="cover"
                wrapperProps={{
                  w: "320px",
                  h: "180px",
                  borderTopRadius: "xl",
                  overflow: "hidden",
                  mb: 3.5,
                }}
              />
              <Text fontSize="xxs" color="#94A4B0" mb={1} mx={4}>
                {article.date
                  ? formatDate(
                      convertDateToEnglish(article.date),
                      "dd MMMM yyyy"
                    )
                  : ""}
              </Text>
              <Text
                fontWeight="semibold"
                fontFamily="poppins"
                mx={4}
                fontSize="xl"
                noOfLines={3}
              >
                {article.title}
              </Text>
            </Box>
            <Navigate name="ARTICLE" query={{ slugs: [article.slug] }}>
              <LinkOverlay
                fontSize="sm"
                color="#269090"
                fontWeight="semibold"
                mx={4}
              >
                Baca Selengkapnya
              </LinkOverlay>
            </Navigate>
          </LinkBox>
        ))}
      </HStack>
    </Box>
  );
}

export function ClinicArticleSkeletonMobile() {
  return (
    <>
      <SkeletonText mb={8} />
      <Box h="331px">
        <Skeleton h="180px" borderRadius="2xl" mb={3.5} />
        <SkeletonText />
      </Box>
    </>
  );
}
