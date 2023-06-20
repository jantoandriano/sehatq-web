import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface DiseaseGPTProviderProps {
  children: ReactElement;
  isMobile?: boolean;
}

export function DiseaseGPTProvider(props: DiseaseGPTProviderProps) {
  const { children, isMobile = false } = props;

  function generateAds(): AdItem[] {
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/Disease`;
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
          size: [300, 250],
          targets: [
            ["pos", "MR1"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-mr2",
          size: [300, 250],
          targets: [
            ["pos", "MR2"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: "div-gpt-ad-sticky",
          size: [320, 50],
          targets: [
            ["pos", "Sticky"],
            ["page", "article"],
          ],
        },
        {
          unitPath,
          divId: `div-gpt-ad-flyingcarpet`,
          size: [300, 600],
          targets: [["pos", "Parallax"]],
        },
        {
          unitPath,
          outOfPageId: "INTERSTITIAL",
        },
      ];
    }
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Disease`;
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
        divId: "div-gpt-ad-middleleaderboard",
        size: [
          [728, 90],
          [728, 250],
        ],
        targets: [
          ["pos", "Middle Leaderboard"],
          ["page", "article"],
        ],
      },
      {
        unitPath,
        divId: "div-gpt-ad-mr1",
        size: [300, 600],
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
    <SehatQGPTProvider ads={generateAds()} enabled>
      {children}
    </SehatQGPTProvider>
  );
}
