import React from "react";
import Script from "next/script";
import {
  Box,
  SehatQFooter,
  InsiderObjectPage,
  InsiderObjectProductArticle,
  FloatingTelemedicineBanner,
  ArticleDetail,
} from "@sehatq/components";
import { ArticleGPTProvider } from "@components/gpt-provider/article";
import { ArticleHead } from "@components/head";
import { SehatQHeader } from "@components/ui/sehatq-header";

type ArticleMobileProps = {
  slug: string;
};

export function ArticleMobile(props: ArticleMobileProps) {
  const { slug } = props;
  return (
    <>
      <Script
        id="oop"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `oopIframe=document.createElement('iframe');oopIframe.src='/article-mobile-oop.html';oopIframe.style='display:none;';document.body.appendChild(oopIframe);`,
        }}
      />
      <InsiderObjectPage type="ARTICLE" />
      <SehatQHeader variant="search" />
      <ArticleHead articleSlug={slug} />
      <InsiderObjectProductArticle articleSlug={slug} />
      <ArticleGPTProvider hasInterstetial articleSlug={slug} isMobile>
        <ArticleDetail isMobile articleSlug={slug} />
      </ArticleGPTProvider>
      <Box background="white" p={3} pt={7} align="normal">
        <SehatQFooter isMobile />
      </Box>
      <FloatingTelemedicineBanner right="12px" bottom="62px" />
    </>
  );
}
