import React, { ReactElement } from "react";
import { AdItem, ForumCache, useGetForum } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface ForumGPTProviderProps {
  forumSlug: string;
  children: ReactElement;
  isMobile?: boolean;
}

function selectForumCategory(cache: ForumCache) {
  return cache.data.category.name;
}

export function ForumGPTProvider(props: ForumGPTProviderProps) {
  const { forumSlug, children, isMobile = false } = props;

  const { data: categoryName, isSuccess } = useGetForum(
    { forumSlug },
    { select: selectForumCategory }
  );

  function generateAds(): AdItem[] {
    const suffix = categoryName ? `_${toPascalCase(categoryName)}` : "";
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
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-bot-leaderboard",
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
          divId: "div-gpt-ad-mr1",
          size: [[300, 250]],
          targets: [
            ["pos", "MR1"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-sticky",
          size: [[320, 50]],
          targets: [
            ["pos", "Sticky"],
            ["page", "article"],
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
          ["page", "article"],
        ],
      },
      {
        unitPath,
        divId: "div-gpt-ad-mr1",
        size: [[300, 600]],
        targets: [
          ["pos", "MR1"],
          ["page", "article"],
        ],
      },
      {
        unitPath,
        outOfPageId: "INTERSTITIAL",
      },
    ];
  }
  return (
    <SehatQGPTProvider ads={generateAds()} enabled={isSuccess}>
      {children}
    </SehatQGPTProvider>
  );
}
