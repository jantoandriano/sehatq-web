import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface HCPGPTProviderProps {
  specialitySlug?: string;
  children: ReactElement;
  isMobile?: boolean;
}

export function HCPsGPTProvider(props: HCPGPTProviderProps) {
  const { specialitySlug, children, isMobile = false } = props;

  function generateAds(): AdItem[] {
    const suffix = specialitySlug ? `_${toPascalCase(specialitySlug)}` : "";
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/Doctor${suffix}`;
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
          targets: [["pos", "Middle_Leaderboard"]],
        },
        {
          unitPath,
          divId: "div-gpt-ad-sticky",
          size: [320, 50],
          targets: [["pos", "Sticky"]],
        },
      ];
    }
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Doctor${suffix}`;
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
