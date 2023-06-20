import { dehydrate, QueryClient } from "react-query";
import { getMerchantProducts, merchantProductKeys } from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type ProductDetailParams = {
  slug: string;
};

export type ProductDetailQuery = {
  merchantId: string;
};

export async function getProductDetailProps(
  arg: ProductDetailParams & Partial<ProductDetailQuery> & { isMobile: boolean }
) {
  const { slug, merchantId = "", isMobile } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  const merchantProductsQuery = {
    merchantId,
    productSlug: slug,
    perPage: "5",
    sortBy: "",
    page: "1",
    long: "",
    lat: "",
  };
  await queryClient.prefetchInfiniteQuery(
    merchantProductKeys.infiniteList(merchantProductsQuery),
    async () =>
      await getMerchantProducts({
        fetch,
        query: merchantProductsQuery,
      })
  );
  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
