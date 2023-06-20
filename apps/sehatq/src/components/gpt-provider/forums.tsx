import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface ForumsProviderProps {
  categorySlug?: string;
  children: ReactElement;
  isMobile?: boolean;
}

export function ForumsGPTProvider(props: ForumsProviderProps) {
  const { categorySlug, children, isMobile = false } = props;

  function generateAds(): AdItem[] {
    const suffix = categorySlug ? `_${toPascalCase(categorySlug)}` : "";
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/Forum${suffix}`;
      return [
        {
          unitPath,
          divId: "div-gpt-ad-leaderboard",
          size: [
            [320, 100],
            [320, 50],
          ],
          targets: [
            ["pos", "Leaderboard"],
            ["page", "category"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-mr1",
          size: [[300, 250]],
          targets: [
            ["pos", "MR1"],
            ["page", "category"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-sticky",
          size: [[320, 50]],
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
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Forum${suffix}`;
    return [
      {
        unitPath,
        divId: "div-gpt-ad-leaderboard",
        size: [
          [728, 250],
          [728, 90],
        ],
        targets: [
          ["pos", "Leaderboard"],
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
        divId: "div-gpt-ad-middleleaderboard",
        size: [
          [728, 250],
          [728, 90],
        ],
        targets: [
          ["pos", "Middle Leaderboard"],
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
