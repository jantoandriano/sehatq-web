import React from "react";
import {
  AdSlot,
  ArticleCategoryNavbar,
  InfographicList,
  ArticleList,
  Box,
  GridBlock,
  GridBlockItem,
  SehatQFooter,
  SimpleBlock,
  VStack,
  FloatingTelemedicineBanner,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { ArticlesHead } from "@components/head";
import { ArticlesGPTProvider } from "@components/gpt-provider/articles";

export type ArticleListDesktopProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
  categorySlug?: string;
};

export function ArticleListDesktop(props: ArticleListDesktopProps) {
  const { categorySlug } = props;
  return (
    <>
      <ArticlesHead />
      <ArticlesGPTProvider {...props}>
        <>
          <SehatqNavbar withCompanyPartner />
          <SimpleBlock marginBottom="35px" marginTop="14px">
            <ArticleCategoryNavbar
              {...props}
              currentCategorySlug={categorySlug}
            />
          </SimpleBlock>
          <GridBlock my={6} isReverse>
            <GridBlockItem>
              {categorySlug === "infografik" ? (
                <InfographicList {...props} />
              ) : (
                <ArticleList
                  {...props}
                  adsMiddle={<AdSlot divId="div-gpt-ad-leaderboard" />}
                />
              )}
            </GridBlockItem>
            <GridBlockItem>
              <Box position="sticky" top="144px">
                <VStack spacing={4}>
                  <AdSlot divId="div-gpt-ad-mr2" />
                  <AdSlot divId="div-gpt-ad-mr1" />
                </VStack>
              </Box>
            </GridBlockItem>
          </GridBlock>
          <Box marginBottom={10} marginTop={32}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </ArticlesGPTProvider>
      <FloatingTelemedicineBanner right="30px" bottom="30px" />
    </>
  );
}
