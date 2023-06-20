import { useMutation } from "react-query";
import { AwaitedReturn } from "@sehatq/utils";
import { createBrowserFetch, FetchError } from "@utils";
import { ENV } from "@constants";

export type ResponseCancel = {
  code: number;
  meta: MetaType;
  data: DataType;
};

type DataType = {
  coNumber: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
};

type MetaType = {
  message: string;
};

export type CancelBodyType = {
  coNumber: string;
  reason: string;
};

export async function cancelPurchase(body: CancelBodyType) {
  const fetch = createBrowserFetch();
  return await fetch.post<ResponseCancel>(
    `${ENV.API}/v1/order-service/cf/order/cancel`,
    { ...body },
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC_ORDER}` } }
  );
}
type CancelPurchaseReturn = AwaitedReturn<typeof cancelPurchase>;

export function useCancelPurchase() {
  return useMutation<CancelPurchaseReturn, FetchError, CancelBodyType>({
    mutationFn: cancelPurchase,
  });
}
