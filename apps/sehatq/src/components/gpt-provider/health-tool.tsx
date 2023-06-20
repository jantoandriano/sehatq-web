import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { toPascalCase } from "@sehatq/utils";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface MentalHealthToolGPTProviderProps {
  children: ReactElement;
  slug: string;
  isMobile?: boolean;
}

export function HealthToolGPTProvider(props: MentalHealthToolGPTProviderProps) {
  const { children, slug } = props;
  function generateAds(): AdItem[] {
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Teskesehatan_${toPascalCase(
      slug
    )}`;
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
    ];
  }
  return (
    <SehatQGPTProvider ads={generateAds()} enabled>
      {children}
    </SehatQGPTProvider>
  );
}
