import {
  InfiniteTelemedicineDoctorsCache,
  useGetInfiniteTelemedicineDoctors,
  useGetMyLocation,
} from "@sehatq/components";

import { useRouter } from "next/router";
import React from "react";
import { TelemedicineHCPListPageDesktop } from "./telemedicine-hcp-list-page-desktop";
import { TelemedicineHCPListPageMobile } from "./telemedicine-hcp-list-page-mobile";

export type TelemedicineHCPListPageProps = {
  isMobile: boolean;
};

function selectSpecialities(cache: InfiniteTelemedicineDoctorsCache) {
  return cache.pages[cache.pages.length - 1].meta.filters.specialities;
}

export function TelemedicineHCPListPage(props: TelemedicineHCPListPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const {
    slugs = [],
    page,
    perPage,
    sort,
    lat,
    long,
    q,
    campaignSlug,
    city,
    doctorExperience,
    gender,
    price,
  } = router.query;

  const [specialitySlug] = slugs as string[];

  const { data: location } = useGetMyLocation();
  const params = {
    page: (page as string) ?? "1",
    perPage: (perPage as string) ?? "12",
    sortBy: sort as string,
    userLat: (lat as string) ?? location?.lat,
    userLong: (long as string) ?? location?.long,
    query: q as string,
    campaignSlug: campaignSlug as string,
    city: city as string,
    doctorExperience: doctorExperience as string,
    gender: gender as string,
    price: price as string,
    specialitySlug,
  };

  const { data: specialities } = useGetInfiniteTelemedicineDoctors(
    {
      page: params.page,
      perPage: params.perPage,
      sort: params.sortBy,
      userLat: params.userLat,
      userLon: params.userLong,
      search: params.query,
      campaignSlug: params.campaignSlug,
      city: params.city,
      doctorExperience: params.doctorExperience,
      gender: params.gender,
      price: params.price,
      specialityId: specialitySlug,
      hospitalId: "",
    },
    {
      select: selectSpecialities,
    }
  );

  let specialityName = undefined;
  if (specialitySlug && specialities) {
    const nonSpeciality = ["umum", "psikolog"];
    let spesialis = specialities?.find((f) => f.slug == specialitySlug)?.name;
    if (spesialis && !nonSpeciality.includes(specialitySlug)) {
      spesialis = `Spesialis ${spesialis}`;
    }
    specialityName = spesialis ?? "Spesialis Tidak Ditemukan";
  }
  const otherProps = {
    ...params,
    specialityName: specialityName ? `Dokter ${specialityName}` : "",
  };

  if (isMobile) return <TelemedicineHCPListPageMobile {...otherProps} />;

  return <TelemedicineHCPListPageDesktop {...otherProps} />;
}
