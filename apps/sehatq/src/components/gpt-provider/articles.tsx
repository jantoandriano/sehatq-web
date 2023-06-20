import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface ArticleGPTProviderProps {
  categorySlug?: string;
  children: ReactElement;
  isMobile?: boolean;
}

export function ArticlesGPTProvider(props: ArticleGPTProviderProps) {
  const { categorySlug, children, isMobile = false } = props;

  function generateAds(): AdItem[] {
    const suffix = categorySlug ? `_${toPascalCase(categorySlug)}` : "";
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/Article${suffix}`;
      return [
        {
          unitPath,
          divId: "div-gpt-ad-leaderboard",
          size: [320, 50],
          targets: [
            ["pos", "Leaderboard"],
            ["page", "category"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-mr1",
          size: [300, 250],
          targets: [
            ["pos", "MR1"],
            ["page", "category"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-mr2",
          size: [300, 250],
          targets: [
            ["pos", "MR2"],
            ["page", "category"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-sticky",
          size: [320, 50],
          targets: [
            ["pos", "Sticky"],
            ["page", "category"],
          ],
        },
        {
          unitPath,
          outOfPageId: "INTERSTITIAL",
        },
      ];
    }
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Article${suffix}`;
    return [
      {
        unitPath,
        divId: "div-gpt-ad-leaderboard",
        size: [728, 90],
        targets: [
          ["pos", "Leaderboard"],
          ["page", "category"],
        ],
      },
      {
        unitPath,
        divId: "div-gpt-ad-mr1",
        size: [300, 600],
        targets: [
          ["pos", "MR1"],
          ["page", "category"],
        ],
      },
      {
        unitPath,
        divId: "div-gpt-ad-mr2",
        size: [300, 250],
        targets: [
          ["pos", "MR2"],
          ["page", "category"],
        ],
      },
      {
        unitPath,
        outOfPageId: "INTERSTITIAL",
      },
    ];
  }

  return (
    <SehatQGPTProvider ads={generateAds()} enabled>
      {children}
    </SehatQGPTProvider>
  );
}
