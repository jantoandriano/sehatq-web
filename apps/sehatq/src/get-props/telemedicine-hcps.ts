import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  telemedicineDoctorsKeys,
  getTelemedicineDoctors,
} from "@sehatq/components";

export type TelemedHCPSQuery = {
  page: string;
  perPage: string;
  sort: string;
  q: string;
  lat: string;
  long: string;
  campaignSlug: string;
  city: string;
  doctorExperience: string;
  gender: string;
  price: string;
};

export type TelemedHCPSParams = {
  slugs: string[];
};

export async function getTelemedHCPSProps(
  arg: TelemedHCPSParams & { isMobile: boolean } & TelemedHCPSQuery
) {
  const {
    isMobile,
    slugs,
    page = "1",
    perPage = "12",
    sort = "",
    lat = "",
    long = "",
    q = "",
    campaignSlug = "",
    city = "",
    doctorExperience = "",
    gender = "",
    price = "",
  } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;
  const [specialitySlug] = slugs;

  try {
    const queryTelemedSpecialis = {
      page,
      perPage,
      sort,
      userLat: lat,
      userLon: long,
      search: q,
      campaignSlug,
      city,
      doctorExperience,
      gender,
      price,
      specialityId: specialitySlug ?? "",
      hospitalId: "",
    };

    if (sort != "nearby") {
      queryTelemedSpecialis.userLat = "";
      queryTelemedSpecialis.userLon = "";
    }

    const response = await queryClient.fetchInfiniteQuery(
      telemedicineDoctorsKeys.infiniteList(queryTelemedSpecialis),
      async () =>
        await getTelemedicineDoctors({
          fetch,
          query: queryTelemedSpecialis,
        })
    );

    if (!response?.pages[0].data.length) {
      error = true;
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
