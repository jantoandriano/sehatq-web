import { dehydrate, QueryClient } from "react-query";
import { nullify } from "@sehatq/utils";
import { createNodeFetch, calculateGrandTotal } from "@utils";
import {
  paymentMethodKeys,
  getPaymentMethodList,
  getPaymentCheckoutVerify,
  paymentCheckoutKeys,
} from "@components";

export async function getPaymentProps(arg: {
  isMobile: boolean;
  token: string;
}) {
  const { isMobile, token } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  const queryVerify = { token };
  let domain = "";
  let productType = "";
  let orderAmount = 0;
  let backURL = "";
  let coNumber = "";

  try {
    const { data } = await queryClient.fetchQuery(
      paymentCheckoutKeys.list(queryVerify),
      async () =>
        getPaymentCheckoutVerify({
          fetch,
          query: queryVerify,
        })
    );
    domain = data?.data.orderLog.domain ?? "";
    productType = data?.data.orderLog.productType ?? "";
    orderAmount = calculateGrandTotal({
      totalDeliveryFee: data?.data.orderLog.totalDeliveryFee ?? 0,
      voucherValue: data?.data.orderLog.voucherValue ?? 0,
      totalShippingInsurance: data?.data.orderLog.totalShippingInsurance ?? 0,
      totalDonation: data?.data.orderLog.totalDonation ?? 0,
      voucherType: data?.data.orderLog.voucherType ?? "",
      totalProductInsurance: data?.data.orderLog.totalProductInsurance ?? 0,
      totalSellingAmount: data?.data.orderLog.totalSellingAmount ?? 0,
      adminFee: [],
    });
    backURL = data?.data.orderLog.backURL ?? "";
    coNumber = data?.data.coNumber ?? "";
  } catch (error) {
    error;
  }

  const query = {
    page: "",
    perPage: "",
    orderBy: "",
    sort: "",
    domain,
    productType,
    coNumber: coNumber,
    status: "active",
    orderAmount: orderAmount.toString(),
  };
  const queryNoSlug = { ...query, slug: "" };
  const querySlug = { ...query, slug: "split-bill" };

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        paymentMethodKeys.list(queryNoSlug),
        async () => await getPaymentMethodList({ fetch, query: queryNoSlug })
      ),
      queryClient.prefetchQuery(
        paymentMethodKeys.list(querySlug),
        async () => await getPaymentMethodList({ fetch, query: querySlug })
      ),
      queryClient.prefetchQuery(
        paymentCheckoutKeys.list(queryVerify),
        async () =>
          await getPaymentCheckoutVerify({
            fetch,
            query: queryVerify,
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
    backURL,
  };
}
