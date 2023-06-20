import { dehydrate, QueryClient } from "react-query";
import { nullify } from "@sehatq/utils";
import { createNodeFetch } from "@utils";
import {
  waitingPaymentKeys,
  getWaitingPaymentStatus,
} from "@components/features/waiting-payment/waiting-payment-queries";

export type WaitingPaymentQuery = {
  coNumber: string;
};

export async function getWaitingPaymentProps(arg: {
  isMobile: boolean;
  token: string;
  coNumber: string;
}) {
  const { coNumber, isMobile } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  const waitingPaymentQuery = {
    coNumber,
  };

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        waitingPaymentKeys.getStatus(waitingPaymentQuery),
        async () =>
          await getWaitingPaymentStatus({
            fetch,
            query: { coNumber },
          })
      ),
    ]);
  } catch (err) {
    error = err;
  }

  return {
    error,
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
  };
}
