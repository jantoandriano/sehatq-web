import React from "react";
import {
  Center,
  PaginationLink,
  Text,
  Grid,
  GridItem,
  Skeleton,
} from "../../user-interfaces";
import {
  InfographicCard,
  InfographicCardProps,
  InfographicCardSkeleton,
} from "./infographic-card";

export type InfographicListDesktopProps = {
  articles: Array<Omit<InfographicCardProps, "isMobile">>;
  page: string;
  maxPage: string;
};

export function InfographicListDesktop(props: InfographicListDesktopProps) {
  const { articles, page, maxPage } = props;
  return (
    <>
      <Text
        as="h1"
        marginTop={5}
        marginBottom={4}
        fontSize="3xl"
        fontFamily="poppins"
        fontWeight="semibold"
        color="charcoalGrey"
      >
        Infografis Terbaru
      </Text>
      {articles.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
          {articles.map(
            (
              article: Omit<InfographicCardProps, "isMobile">,
              index: number
            ) => (
              <GridItem key={article.id} pb={4}>
                <InfographicCard
                  isMobile={false}
                  {...article}
                  {...{ imagePriority: index < 6 }}
                />
              </GridItem>
            )
          )}
        </Grid>
      ) : null}
      <Center mt={19}>
        <PaginationLink
          page={Number(page)}
          maxPage={Number(maxPage)}
          navigateName="ARTICLE"
          navigateOptions={{ shallow: true, scroll: true }}
        />
      </Center>
    </>
  );
}

export function InfographicListSkeletonDesktop() {
  return (
    <>
      <Skeleton h="42px" w="260px" marginTop={5} marginBottom={4} />
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        {Array.from(Array(6).keys()).map((id) => (
          <GridItem key={id} pb={9}>
            <InfographicCardSkeleton isMobile={false} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
