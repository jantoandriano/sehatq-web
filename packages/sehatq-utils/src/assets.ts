import React from "react";
import { ASSETS } from "@sehatq/constants";

type BaseUrl = string;

const AssetsContext = React.createContext<BaseUrl>("");

export const AssetsProvider = AssetsContext.Provider;

export function useAssets<
  AssestKey extends keyof typeof ASSETS = keyof typeof ASSETS
>(assetKeys: AssestKey[]) {
  const baseUrl = React.useContext(AssetsContext);
  return assetKeys.reduce(
    (oldAssests, assetKey) => ({
      ...oldAssests,
      [assetKey]: `${baseUrl}${ASSETS[assetKey]}`,
    }),
    {} as Pick<typeof ASSETS, AssestKey>
  );
}
