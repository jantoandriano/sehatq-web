import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  telemedicineDoctorsKeys,
  getTelemedicineDoctors,
} from "@sehatq/components";

export type TelemedicineHospitalQuery = {
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
  campaignSlug: string;
};

export type TelemedicineHospitalParams = {
  hospitalSlug: string;
  slugs: string[];
};

export async function getTelemedicineHospitalProps(
  arg: TelemedicineHospitalParams & {
    isMobile: boolean;
  } & TelemedicineHospitalQuery
) {
  const {
    isMobile,
    page = "1",
    perPage = "12",
    sort = "",
    lat = "",
    long = "",
    q = "",
    slugs,
    city = "",
    doctorExperience = "",
    gender = "",
    price = "",
    hospitalSlug = "",
    campaignSlug = "",
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
      campaignSlug: campaignSlug,
      city,
      doctorExperience,
      gender,
      price,
      specialityId: specialitySlug,
      hospitalId: hospitalSlug,
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
