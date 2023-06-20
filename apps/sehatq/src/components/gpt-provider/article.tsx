import React, { ReactElement } from "react";
import { useGetArticle, ArticleCache, AdItem } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface ArticleGPTProviderProps {
  articleSlug: string;
  children: ReactElement;
  hasInterstetial: boolean;
  isMobile?: boolean;
}

function selectCategorySlug(cache: ArticleCache) {
  return cache.data.category.slug;
}

function selectArticleTags(cache: ArticleCache) {
  return cache.data.tags.map((tag) => tag.name);
}

export function ArticleGPTProvider(props: ArticleGPTProviderProps) {
  const { articleSlug, children, hasInterstetial, isMobile = false } = props;
  const { data: slug, isSuccess } = useGetArticle(
    { articleSlug },
    { select: selectCategorySlug }
  );
  const { data: tags } = useGetArticle(
    { articleSlug },
    { select: selectArticleTags }
  );
  function generateAds(): AdItem[] {
    const suffix = slug ? `_${toPascalCase(slug)}` : "";
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/Article${suffix}`;
      return [
        {
          unitPath,
          divId: `gpt-ad-leaderboard`,
          size: [
            [320, 100],
            [320, 50],
          ],
          targets: [
            ["pos", "Leaderboard"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: `gpt-ad-bot-leaderboard`,
          size: [
            [320, 100],
            [320, 50],
          ],
          targets: [
            ["pos", "Bot_Leaderboard"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: `gpt-ad-mr1`,
          size: [300, 250],
          targets: [
            ["pos", "MR1"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: `gpt-ad-mr2`,
          size: [300, 250],
          targets: [
            ["pos", "MR2"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: `gpt-ad-flyingcarpet`,
          size: [300, 600],
          targets: [["pos", "Parallax"]],
        },
        {
          unitPath,
          divId: `gpt-ad-sticky`,
          size: [320, 50],
          targets: [
            ["pos", "Sticky"],
            ["page", "article"],
          ],
        },
        ...(hasInterstetial
          ? [
              {
                unitPath,
                outOfPageId: "INTERSTITIAL" as const,
              },
            ]
          : []),
      ];
    }
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Article${suffix}`;
    return [
      {
        unitPath,
        divId: `gpt-ad-leaderboard`,
        size: [728, 90],
        targets: [
          ["pos", "Leaderboard"],
          ["page", "article"],
        ],
      },
      {
        unitPath,
        divId: `gpt-ad-middleleaderboard`,
        size: [728, 90],
        targets: [
          ["pos", "Middle_Leaderboard"],
          ["page", "article"],
        ],
      },
      {
        unitPath,
        divId: `gpt-ad-mr1`,
        size: [300, 600],
        targets: [
          ["pos", "MR1"],
          ["page", "article"],
        ],
      },
      ...(hasInterstetial
        ? [
            {
              unitPath,
              outOfPageId: "INTERSTITIAL" as const,
            },
          ]
        : []),
    ];
  }
  return (
    <SehatQGPTProvider
      ads={slug ? generateAds() : []}
      globalTargets={tags ? [["topic", tags]] : undefined}
      enabled={isSuccess}
    >
      {children}
    </SehatQGPTProvider>
  );
}
