import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  telemedicineDoctorsKeys,
  getTelemedicineDoctors,
  telemedCampaignKeys,
  getTelemedCampaign,
} from "@sehatq/components";

export type TelemedicineCampaignQuery = {
  page: string;
  perPage: string;
  sort: string;
  q: string;
  lat: string;
  long: string;
  city: string;
  doctorExperience: string;
  gender: string;
  price: string;
  specialitySlug: string;
};

export type TelemedicineCampaignParams = {
  slug: string;
};

export async function getTelemedicineCampaignProps(
  arg: TelemedicineCampaignParams & {
    isMobile: boolean;
  } & TelemedicineCampaignQuery
) {
  const {
    isMobile,
    page = "1",
    perPage = "12",
    sort = "",
    lat = "",
    long = "",
    q = "",
    slug = "",
    city = "",
    doctorExperience = "",
    gender = "",
    price = "",
    specialitySlug = "",
  } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  try {
    const queryTelemedSpecialis = {
      page,
      perPage,
      sort,
      userLat: lat,
      userLon: long,
      search: q,
      campaignSlug: slug,
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

    const response = await Promise.all([
      queryClient.fetchInfiniteQuery(
        telemedicineDoctorsKeys.infiniteList(queryTelemedSpecialis),
        async () =>
          await getTelemedicineDoctors({
            fetch,
            query: queryTelemedSpecialis,
          })
      ),
      queryClient.fetchQuery(
        telemedCampaignKeys.detail({ campaignSlug: slug }),
        async () =>
          await getTelemedCampaign({
            fetch,
            query: { campaignSlug: slug },
          })
      ),
    ]);

    const hcpListResponse = response[0];
    if (!hcpListResponse?.pages[0].data.length) {
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
