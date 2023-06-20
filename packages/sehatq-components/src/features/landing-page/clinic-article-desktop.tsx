import React, { ReactElement } from "react";

import {
  useNavigation,
  formatDate,
  convertDateToEnglish,
  NavigationValue,
} from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
  SimpleGrid,
  Link,
  Icon,
  ArrowForwardIcon,
  LinkOverlay,
  LinkBox,
} from "../../user-interfaces";
import { ClinicCarousel } from "./clinic-carousel";

type Article = {
  id: number;
  imageUrl: string;
  imageAlt: string;
  title: string;
  slug: string;
  date: string;
};

type ClinicArticleDesktopProps = {
  title: ReactElement;
  articlesNavigation?: NavigationValue;
  articles: Article[];
};

function ArticleItem({ article }: { article: Article }) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <LinkBox
      key={article.id}
      display="flex"
      w="345px"
      h="331px"
      boxShadow="base"
      borderRadius="2xl"
      flexDirection="column"
      justifyContent="space-between"
      bgColor="white"
      pb={5}
      mt={1}
      mb={3}
    >
      <Box>
        <Image
          priority
          src={article.imageUrl}
          alt={article.imageAlt}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            w: "345px",
            h: "180px",
            borderTopRadius: "xl",
            overflow: "hidden",
            mb: 3.5,
          }}
        />
        <Text fontSize="xs" color="#94A4B0" mb={1.5} mx={4}>
          {article.date
            ? formatDate(convertDateToEnglish(article.date), "dd MMMM yyyy")
            : ""}
        </Text>
        <Text fontWeight="semibold" fontFamily="poppins" mx={4} noOfLines={2}>
          {article.title}
        </Text>
      </Box>
      <Navigate name="ARTICLE" query={{ slugs: [article.slug] }}>
        <LinkOverlay fontSize="sm" color="#269090" fontWeight="semibold" mx={4}>
          Baca Selengkapnya
        </LinkOverlay>
      </Navigate>
    </LinkBox>
  );
}

export function ClinicArticleDesktop(props: ClinicArticleDesktopProps) {
  const { title, articlesNavigation, articles } = props;
  const { Navigate } = useNavigation();

  return (
    <Box w="full">
      <Flex justifyContent="space-between" alignItems="flex-end" mb={7}>
        {title}
        {articlesNavigation && (
          <Navigate {...articlesNavigation}>
            <Link
              fontSize="sm"
              fontFamily="poppins"
              color="#279091"
              fontWeight="semibold"
            >
              Lihat Semua Artikel{" "}
              <Icon as={ArrowForwardIcon} h={3} w={3} ml={3.5} />
            </Link>
          </Navigate>
        )}
      </Flex>
      {articles.length <= 3 ? (
        <SimpleGrid columns={3} spacing={5}>
          {articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </SimpleGrid>
      ) : (
        <ClinicCarousel
          slides={articles}
          slideGap={5}
          renderSlide={({ slide }) => <ArticleItem article={slide} />}
        />
      )}
    </Box>
  );
}

export function ClinicArticleSkeletonDesktop() {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="flex-end" mb={7}>
        <SkeletonText w="570px" />
        <Skeleton w="150px" h={5} />
      </Flex>
      <HStack>
        {Array.from(Array(3).keys()).map((id) => (
          <Box key={id} h="331px">
            <Skeleton w="373px" h="180px" borderRadius="2xl" mb={3.5} />
            <SkeletonText />
          </Box>
        ))}
      </HStack>
    </>
  );
}
