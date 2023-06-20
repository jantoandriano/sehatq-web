import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface TagGPTProviderProps {
  tagSlug: string;
  children: ReactElement;
  isMobile?: boolean;
}

export function TagGPTProvider(props: TagGPTProviderProps) {
  const { tagSlug, children, isMobile = false } = props;
  function generateAds(): AdItem[] {
    const suffix = tagSlug ? `_${toPascalCase(tagSlug)}` : "";
    if (isMobile) {
      const unitPath = `${GPT_NETWORK_ID}/SehatQ_Mobile/Tag${suffix}`;
      return [
        {
          unitPath,
          divId: "div-gpt-ad-megabillboard",
          size: [320, 480],
          targets: [["pos", "Megabillboard"]],
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
          size: [320, 50],
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
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Tag${suffix}`;
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
