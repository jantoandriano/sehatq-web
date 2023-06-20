import {
  getPrescription,
  prescriptionKeys,
  getPrescriptionHistory,
  prescriptionHistoryKeys,
  getPrescriptionProducts,
  prescriptionProductsKeys,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";
import { dehydrate, QueryClient } from "react-query";

export type MyPrescriptionParams = {
  prescriptionNo: string;
  cookie: string;
};

export async function getMyPrescriptionProps(
  arg: MyPrescriptionParams & { isMobile: boolean }
) {
  const { isMobile, prescriptionNo, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  let error = null;

  try {
    const myPrescriptionQuery = {
      prescriptionNo,
    };

    if (myPrescriptionQuery.prescriptionNo) {
      await Promise.all([
        queryClient.prefetchQuery(
          prescriptionKeys.detail(myPrescriptionQuery),
          async () =>
            await getPrescription({
              fetch,
              query: myPrescriptionQuery,
            })
        ),
        queryClient.prefetchQuery(
          prescriptionHistoryKeys.detail(myPrescriptionQuery),
          async () =>
            await getPrescriptionHistory({
              fetch,
              query: myPrescriptionQuery,
            })
        ),
        queryClient.prefetchQuery(
          prescriptionProductsKeys.list(myPrescriptionQuery),
          async () =>
            await getPrescriptionProducts({
              fetch,
              query: myPrescriptionQuery,
            })
        ),
      ]);
    }
  } catch (err) {
    error = err;
  }

  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile, error };
}
