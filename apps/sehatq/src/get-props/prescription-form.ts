import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  consultationProductsInfoKeys,
  getConsultationProductsInfo,
} from "@sehatq/components";
export type PrescriptionFormQuery = {
  consultationId: string;
};
export type PrescriptionFormParams = {
  cookie: string | undefined;
};

export async function getPrescriptionFormProps(
  arg: { isMobile: boolean } & PrescriptionFormQuery & PrescriptionFormParams
) {
  const { isMobile, consultationId, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  let error = null;
  try {
    if (consultationId) {
      const consultationProductsInfoQuery = {
        consultationId,
      };

      await queryClient.prefetchQuery(
        consultationProductsInfoKeys.list(consultationProductsInfoQuery),
        async () =>
          await getConsultationProductsInfo({
            fetch,
            query: consultationProductsInfoQuery,
          })
      );
    }
  } catch (err) {
    error = err;
  }
  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
