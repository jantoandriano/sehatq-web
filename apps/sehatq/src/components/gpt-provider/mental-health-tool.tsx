import React, { ReactElement } from "react";
import { AdItem } from "@sehatq/components";
import { SehatQGPTProvider } from "./gpt-provider";
import { GPT_NETWORK_ID } from "./gpt-constants";

interface MentalHealthToolGPTProviderProps {
  children: ReactElement;
  isMobile?: boolean;
}

export function MentalHealthToolGPTProvider(
  props: MentalHealthToolGPTProviderProps
) {
  const { children } = props;
  function generateAds(): AdItem[] {
    const unitPath = `${GPT_NETWORK_ID}/SehatQ_Desktop/Teskesehatan_mental`;
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
