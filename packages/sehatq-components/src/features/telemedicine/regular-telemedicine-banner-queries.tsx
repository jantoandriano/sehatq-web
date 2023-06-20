import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import {
  modelRegularTelemedicineBanner,
  modelRegularTelemedicineVoucher,
  RegularTelemedicineBannerResponse,
  RegularTelemedicineVoucherResponse,
} from "./regular-telemedicine-banner-model";

export const regularTelemedBannerKeys = {
  all: ["REGULAR_TELEMED_BANNER"],
  details: () => [...regularTelemedBannerKeys.all, "DETAILS"],
  detail: () => [...regularTelemedBannerKeys.details()],
  vouchers: () => [...regularTelemedBannerKeys.all, "VOUCHERS"],
  voucher: () => [...regularTelemedBannerKeys.vouchers()],
};

export async function getRegularTelemedBanner({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<RegularTelemedicineBannerResponse>(
    `${ENV.API}/telemed-service/init`
  );

  return {
    data: modelRegularTelemedicineBanner(result.data),
  };
}

export type RegularTelemedicineBannerCache = AwaitedReturn<
  typeof getRegularTelemedBanner
>;

export function useGetRegularTelemedBanner<
  TData = RegularTelemedicineBannerCache
>(
  options?: UseQueryOptions<RegularTelemedicineBannerCache, FetchError, TData>
) {
  return useQuery<RegularTelemedicineBannerCache, FetchError, TData>(
    regularTelemedBannerKeys.detail(),
    async () => {
      const fetch = createBrowserFetch();
      return getRegularTelemedBanner({ fetch });
    },
    options
  );
}

export async function getRegularTelemedVoucher({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<RegularTelemedicineVoucherResponse>(
    `${ENV.API}/tcore/vouchers?flag=telemed:landing-page`
  );

  return {
    data: modelRegularTelemedicineVoucher(result.data),
  };
}

export type RegularTelemedicineVoucherCache = AwaitedReturn<
  typeof getRegularTelemedVoucher
>;

export function useGetRegularTelemedVoucher<
  TData = RegularTelemedicineVoucherCache
>(
  options?: UseQueryOptions<RegularTelemedicineVoucherCache, FetchError, TData>
) {
  return useQuery<RegularTelemedicineVoucherCache, FetchError, TData>(
    regularTelemedBannerKeys.voucher(),
    async () => {
      const fetch = createBrowserFetch();
      return getRegularTelemedVoucher({ fetch });
    },
    options
  );
}
