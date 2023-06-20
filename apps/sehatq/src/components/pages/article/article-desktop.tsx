import React from "react";
import Script from "next/script";
import {
  Box,
  SehatQFooter,
  FloatingTelemedicineBanner,
  InsiderObjectPage,
  InsiderObjectProductArticle,
  ArticleDetail,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { ArticleGPTProvider } from "@components/gpt-provider/article";
import { ArticleHead } from "@components/head";

type ArticleDesktopProps = {
  slug: string;
};

export function ArticleDesktop(props: ArticleDesktopProps) {
  const { slug } = props;
  return (
    <>
      <Script
        id="oop"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `oopIframe=document.createElement('iframe');oopIframe.src='/article-desktop-oop.html';oopIframe.style='display:none;';document.body.appendChild(oopIframe);`,
        }}
      />
      <SehatqNavbar withCompanyPartner />
      <InsiderObjectPage type="ARTICLE" />
      <ArticleHead articleSlug={slug} />
      <InsiderObjectProductArticle articleSlug={slug} />
      <ArticleGPTProvider hasInterstetial articleSlug={slug}>
        <Box marginY={6}>
          <ArticleDetail articleSlug={slug} />
        </Box>
      </ArticleGPTProvider>
      <Box marginTop={32}>
        <SehatQFooter />
      </Box>
      <FloatingTelemedicineBanner right="30px" bottom="30px" />
    </>
  );
}
