import React from "react";
import {
  Center,
  Grid,
  GridItem,
  PaginationLink,
  Text,
  Skeleton,
} from "../../user-interfaces";
import {
  InfographicCard,
  InfographicCardProps,
  InfographicCardSkeleton,
} from "./infographic-card";

export type InfographicListMobileProps = {
  articles: Array<Omit<InfographicCardProps, "isMobile">>;
  page: string;
  maxPage: string;
};

export function InfographicListMobile(props: InfographicListMobileProps) {
  const { articles, page, maxPage } = props;
  return (
    <>
      <Text
        as="h1"
        marginTop={5}
        marginBottom={4}
        fontSize="sm"
        fontFamily="poppins"
        fontWeight="semibold"
        color="charcoalGrey"
      >
        Infografis Terbaru
      </Text>
      {articles.length > 0 ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {articles.map(
            (
              article: Omit<InfographicCardProps, "isMobile">,
              index: number
            ) => (
              <GridItem key={article.id}>
                <InfographicCard
                  isMobile={true}
                  {...article}
                  {...{ imagePriority: index < 6 }}
                />
              </GridItem>
            )
          )}
        </Grid>
      ) : null}
      <Center mt={7}>
        <PaginationLink
          size="small"
          page={Number(page)}
          maxPage={Number(maxPage)}
          navigateName="ARTICLE"
          navigateOptions={{ shallow: true, scroll: true }}
        />
      </Center>
    </>
  );
}

export function InfographicListSkeletonMobile() {
  return (
    <>
      <Skeleton h={6} w="150px" marginTop={5} marginBottom={3} />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {Array.from(Array(6).keys()).map((id) => (
          <GridItem key={id}>
            <InfographicCardSkeleton isMobile={true} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
