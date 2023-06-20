import React, { ReactElement } from "react";
import { AdItem, HCPDetailCache, useGetHCPDetail } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface HCPGPTProviderProps {
  hcpSlug: string;
  children: ReactElement;
  isMobile?: boolean;
}

function selectHCPDetail(hcpDetail: HCPDetailCache) {
  return hcpDetail.data;
}

export function HCPGPTProvider(props: HCPGPTProviderProps) {
  const { hcpSlug, children, isMobile = false } = props;

  const { data: hcp } = useGetHCPDetail(
    { hcpSlug, userLat: "", userLong: "" },
    { select: selectHCPDetail }
  );
  const specialitySlug = hcp?.specialitySlug;

  function generateAds(): AdItem[] {
    const suffix = specialitySlug ? `_${toPascalCase(specialitySlug)}` : "";
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/Doctor${suffix}`;
      return [
        {
          unitPath,
          divId: "div-gpt-ad-leaderboard",
          size: [
            [320, 100],
            [320, 50],
          ],
          targets: [["pos", "Leaderboard"]],
        },
        {
          unitPath,
          divId: "div-gpt-ad-middleleaderboard",
          size: [
            [320, 100],
            [320, 50],
          ],
          targets: [["pos", "Middle_Leaderboard"]],
        },
        {
          unitPath,
          divId: "div-gpt-ad-sticky",
          size: [[320, 50]],
          targets: [["pos", "Sticky"]],
        },
        {
          unitPath,
          divId: "div-gpt-ad-flyingcarpet",
          size: [[300, 600]],
          targets: [["pos", "Parallax"]],
        },
        {
          unitPath,
          outOfPageId: "INTERSTITIAL",
        },
      ];
    }
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Doctor${suffix}`;
    return [
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
