import { dehydrate, QueryClient } from "react-query";
import { nullify } from "@sehatq/utils";
import { createNodeFetch } from "@utils";
import { getPaymentCheckoutVerify, paymentCheckoutKeys } from "@components";

export async function getChargePageProps(arg: {
  isMobile: boolean;
  token: string;
}) {
  const { isMobile, token } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  let paymentCheckout = null;

  try {
    const { data } = await queryClient.fetchQuery(
      paymentCheckoutKeys.list({ token }),
      async () =>
        getPaymentCheckoutVerify({
          fetch,
          query: { token },
        })
    );

    paymentCheckout = data;
  } catch (err) {
    error = err;
  }

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        paymentCheckoutKeys.list({ token }),
        async () =>
          await getPaymentCheckoutVerify({
            fetch,
            query: { token },
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
    data: paymentCheckout,
  };
}
