import React from "react";
import {
  AdSlot,
  ArticleCategoryNavbar,
  InfographicList,
  ArticleList,
  Box,
  SehatQFooter,
  FloatingTelemedicineBanner,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { ArticlesHead } from "@components/head";
import { ArticlesGPTProvider } from "@components/gpt-provider/articles";

export type ArticleListMobileProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
  categorySlug?: string;
};

export function ArticleListMobile(props: ArticleListMobileProps) {
  const { categorySlug } = props;
  return (
    <>
      <ArticlesHead />
      <ArticlesGPTProvider {...props}>
        <>
          <SehatQHeader variant="search" />
          <Box background="white" pt={2}>
            {categorySlug === "infografik" ? (
              <Box px={3}>
                <InfographicList {...props} />
              </Box>
            ) : (
              <>
                <ArticleCategoryNavbar
                  {...props}
                  currentCategorySlug={categorySlug}
                />
                <ArticleList
                  {...props}
                  adsTop={<AdSlot divId="div-gpt-ad-mr2" />}
                  adsMiddle={<AdSlot divId="div-gpt-ad-mr1" />}
                  adsBottom={<AdSlot divId="div-gpt-ad-leaderboard" />}
                />
              </>
            )}
          </Box>
          <Box background="white" p={3} pt={7} align="normal">
            <SehatQFooter {...props} />
          </Box>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" />
        </>
      </ArticlesGPTProvider>
      <FloatingTelemedicineBanner right="12px" bottom="62px" />
    </>
  );
}
