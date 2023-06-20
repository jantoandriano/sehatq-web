import { dehydrate, QueryClient } from "react-query";
import {
  getArticles,
  articleKeys,
  getHCPList,
  hcpKeys,
  getProducts,
  productKeys,
  getTelemedicineDoctors,
  telemedicineDoctorsKeys,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type DiseasesQuery = {
  slugs: string[];
};

export async function getPediatricClinicProps(arg: { isMobile: boolean }) {
  const { isMobile } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  const articleQuery = {
    page: "1",
    perPage: "12",
    categoryId: "",
    categorySlug: "",
    tagSlug: "spesialis-anak",
  };
  const hcpQuery = {
    page: "1",
    perPage: "12",
    userLat: "",
    userLong: "",
    query: "",
    procedureId: "",
    scheduleDayId: "",
    citySlug: "",
    gender: "",
    specialitySlug: "anak",
    sortBy: "terdekat",
    hcfId: "",
  };
  const productsQuery = {
    page: "1",
    perPage: "12",
    sortBy: "bestseller",
    categorySlug: "ibu-bayi",
  };
  const telemdQuery = {
    page: "1",
    perPage: "12",
    sort: "",
    userLat: "",
    userLon: "",
    search: "",
    campaignSlug: "",
    city: "",
    doctorExperience: "",
    gender: "",
    price: "",
    specialityId: "anak",
    hospitalId: "",
  };

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        articleKeys.list(articleQuery),
        async () =>
          await getArticles({
            fetch,
            query: articleQuery,
          })
      ),
      queryClient.prefetchQuery(
        hcpKeys.list(hcpQuery),
        async () =>
          await getHCPList({
            fetch,
            query: hcpQuery,
          })
      ),
      queryClient.prefetchQuery(
        productKeys.list(productsQuery),
        async () =>
          await getProducts({
            fetch,
            query: productsQuery,
          })
      ),
      queryClient.prefetchQuery(
        telemedicineDoctorsKeys.list(telemdQuery),
        async () =>
          await getTelemedicineDoctors({
            fetch,
            query: telemdQuery,
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
