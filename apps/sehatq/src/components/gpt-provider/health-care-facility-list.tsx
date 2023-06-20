import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface HCFGPTProviderProps {
  hcfTypeSlug?: string;
  children: ReactElement;
  isMobile?: boolean;
}

export function HCFsGPTProvider(props: HCFGPTProviderProps) {
  const { hcfTypeSlug, children, isMobile = false } = props;

  function generateAds(): AdItem[] {
    const suffix = hcfTypeSlug ? `_${toPascalCase(hcfTypeSlug)}` : "";
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/HCF${suffix}`;
      return [
        {
          unitPath,
          divId: "div-gpt-ad-leaderboard",
          size: [320, 50],
          targets: [["pos", "Leaderboard"]],
        },
        {
          unitPath,
          divId: "div-gpt-ad-middleleaderboard",
          size: [300, 50],
          targets: [["pos", "Middle Leaderboard"]],
        },
        {
          unitPath,
          divId: "div-gpt-ad-sticky",
          size: [320, 50],
          targets: [["pos", "Sticky"]],
        },
      ];
    }
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/HCF${suffix}`;
    return [
      {
        unitPath,
        divId: "div-gpt-ad-leaderboard",
        size: [
          [728, 90],
          [728, 250],
        ],
        targets: [["pos", "Leaderboard"]],
      },
      {
        unitPath,
        divId: "div-gpt-ad-mr2",
        size: [300, 250],
        targets: [["pos", "MR2"]],
      },
    ];
  }

  return (
    <SehatQGPTProvider ads={generateAds()} enabled>
      {children}
    </SehatQGPTProvider>
  );
}
