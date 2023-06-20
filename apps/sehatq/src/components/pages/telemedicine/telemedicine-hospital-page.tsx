import {
  InfiniteTelemedicineDoctorsCache,
  useGetInfiniteTelemedicineDoctors,
  useGetMyLocation,
} from "@sehatq/components";
import { useRouter } from "next/router";
import React from "react";
import { TelemedicineHospitalPageDesktop } from "./telemedicine-hospital-page-desktop";
import { TelemedicineHospitalPageMobile } from "./telemedicine-hospital-page-mobile";

export type TelemedicineHospitalPageProps = {
  isMobile: boolean;
};

function selectHospitalName(cache: InfiniteTelemedicineDoctorsCache) {
  const data = cache.pages[cache.pages.length - 1].data[0];
  return {
    hospitalName: data?.hospital.name,
    specialityName: data?.specialityName,
  };
}

export function TelemedicineHospitalPage(props: TelemedicineHospitalPageProps) {
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
    hospitalSlug,
    city,
    doctorExperience,
    gender,
    price,
  } = router.query;

  const { data: location } = useGetMyLocation();
  const [specialitySlug] = slugs as string[];

  const otherProps = {
    page: (page as string) ?? "1",
    perPage: (perPage as string) ?? "12",
    sortBy: sort as string,
    userLat: (lat as string) ?? location?.lat,
    userLong: (long as string) ?? location?.long,
    query: q as string,
    hospitalSlug: hospitalSlug as string,
    city: city as string,
    doctorExperience: doctorExperience as string,
    gender: gender as string,
    price: price as string,
    specialitySlug: specialitySlug,
    campaignSlug: campaignSlug as string,
  };

  const queryFilters = {
    page: otherProps.page,
    perPage: otherProps.perPage,
    sort: otherProps.sortBy,
    userLat: otherProps.userLat,
    userLon: otherProps.userLong,
    search: otherProps.query,
    campaignSlug: otherProps.campaignSlug,
    city: otherProps.city,
    doctorExperience: otherProps.doctorExperience,
    gender: otherProps.gender,
    price: otherProps.price,
    specialityId: otherProps.specialitySlug,
    hospitalId: otherProps.hospitalSlug,
  };

  if (otherProps.sortBy != "nearby") {
    queryFilters.userLat = "";
    queryFilters.userLon = "";
  }

  const { data, isLoading } = useGetInfiniteTelemedicineDoctors(queryFilters, {
    select: selectHospitalName,
  });

  let title = data?.hospitalName;

  if (isLoading) {
    title = "";
  }

  if (data?.hospitalName && specialitySlug) {
    title = `Dokter ${data?.specialityName} dari ${data?.hospitalName}`;
  }

  if (!data?.hospitalName) {
    title = "Dokter tidak ditemukan";
  }

  if (isMobile)
    return (
      <TelemedicineHospitalPageMobile {...otherProps} hospitalName={title} />
    );

  return (
    <TelemedicineHospitalPageDesktop
      {...otherProps}
      hospitalName={title}
      isLoading={isLoading}
    />
  );
}
