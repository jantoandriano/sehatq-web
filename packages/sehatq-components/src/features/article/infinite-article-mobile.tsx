import React from "react";
import { InView } from "react-intersection-observer";
import { VStack, Box } from "../../user-interfaces";
import { ArticleDetail } from "./article-detail";

type InfiniteArticleMobileProps = {
  articleSlugs: string[];
  onBottom: () => void;
  top?: React.ReactElement;
  divider?: React.ReactElement;
  onView?: (articleSlug: string) => void;
  itemContainer?: (props: {
    index: number;
    articleSlug: string;
    children: React.ReactElement;
  }) => React.ReactElement;
};

export function InfiniteArticleMobile(props: InfiniteArticleMobileProps) {
  const {
    articleSlugs,
    onBottom,
    itemContainer: ItemContainer,
    onView,
    top = null,
    divider,
  } = props;
  function renderArticleDetail(articleSlug: string) {
    return (
      <>
        {onView ? (
          <InView onChange={(inView) => (inView ? onView(articleSlug) : null)}>
            {({ ref }) => <div ref={ref} />}
          </InView>
        ) : null}
        <ArticleDetail isMobile articleSlug={articleSlug} />
        {onView ? (
          <InView onChange={(inView) => (inView ? onView(articleSlug) : null)}>
            {({ ref }) => <div ref={ref} />}
          </InView>
        ) : null}
      </>
    );
  }
  return (
    <>
      {top}
      <VStack
        spacing={10}
        divider={
          divider ? (
            <Box className="chakra-stack__divider" width="100%" border="none">
              {divider}
            </Box>
          ) : undefined
        }
      >
        {articleSlugs.map((articleSlug, index) =>
          ItemContainer ? (
            <ItemContainer
              key={articleSlug}
              index={index}
              articleSlug={articleSlug}
            >
              {renderArticleDetail(articleSlug)}
            </ItemContainer>
          ) : (
            <Box>{renderArticleDetail(articleSlug)}</Box>
          )
        )}
      </VStack>
      <InView
        onChange={(inView) => (inView ? onBottom() : null)}
        rootMargin="1000px 0px"
      >
        {({ ref }) => <div ref={ref} />}
      </InView>
    </>
  );
}
