import React from "react";
import { GPTProvider, GPTProviderProps } from "@sehatq/components";

type SehatQGPTProviderProps = Pick<
  GPTProviderProps,
  "ads" | "enabled" | "children" | "globalTargets"
>;

export function SehatQGPTProvider(props: SehatQGPTProviderProps) {
  const { ads, children, enabled, globalTargets } = props;
  return (
    <GPTProvider
      ads={ads}
      enabled={enabled}
      enableLazyLoad
      globalTargets={globalTargets}
    >
      {children}
    </GPTProvider>
  );
}
