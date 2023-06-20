import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  telemedLandingHCPSKeys,
  getTelemedLandingHCPS,
  getTelemedLandingHCFS,
  telemedLandingHCFSKeys,
  regularTelemedBannerKeys,
  getRegularTelemedVoucher,
  telemedicineSpecialityKeys,
  getTelemedicineSpecialities,
} from "@sehatq/components";

export type TelemedLandingParams = {
  cookie: string | undefined;
};

export async function getTelemedicineLandingProps(
  arg: { isMobile: boolean } & TelemedLandingParams
) {
  const { isMobile, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();
  let error = null;

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        telemedicineSpecialityKeys.list({
          page: "1",
          perPage: "100",
          hospitalId: "",
        }),
        async () =>
          await getTelemedicineSpecialities({
            fetch,
            query: { page: "1", perPage: "100", hospitalId: "" },
          })
      ),
      queryClient.prefetchQuery(
        telemedLandingHCPSKeys.lists(),
        async () =>
          await getTelemedLandingHCPS({
            fetch,
          })
      ),
      queryClient.prefetchQuery(
        telemedLandingHCFSKeys.lists(),
        async () =>
          await getTelemedLandingHCFS({
            fetch,
          })
      ),
      queryClient.prefetchQuery(
        regularTelemedBannerKeys.vouchers(),
        async () =>
          await getRegularTelemedVoucher({
            fetch,
          })
      ),
    ]);
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
